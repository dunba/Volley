import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from './firebase'

const User = () => {
    const usersRef = firebase.firestore().collection("users");

    const { currentUser, logout } = useAuth();
    const [error, setError] = useState();
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to lougout");
            console.log("Failed to lougout");
        }
    }

    // //this runs to validate userdata everytime the page is visited. on the first time, it will prompt user to enter info.
    // const [userDisplayName, setUserDisplayName] = useState(null)
    // const fetchUserData = async user => {
    //     const userRef = usersRef.doc(`/${user.uid}`);
    //     const snapshot = await userRef.get();
    //     if (snapshot.exists) {
    //         // console.log(snapshot.data().displayName)
    //         setUserDisplayName(snapshot.data().displayName);
    //         //  history.push('/')
    //     } else {
    //     }
    // };
    // //this will run everytime the page loads to fetch user data
    // useEffect(() => {
    //     fetchUserData(currentUser.currentUser);
    // }, []);



    return (
        <div className='flexcontainer'>
            {error && ({ error })}
            <h2>WELCOME,{ }</h2>
            <h2>your name is {currentUser ? JSON.stringify(currentUser.displayName) : ''}</h2>
            <Link to="/update-profile">Update Profile</Link>


            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default User
