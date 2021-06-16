import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from './firebase'

const User = () => {
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
    const usersRef = firebase.firestore().collection("users");

    //this runs to validate userdata everytime the page is visited. on the first time, it will prompt user to enter info.
    const [userDisplayName, setUserDisplayName] = useState('')

    const fetchUserData = async (user) => {
        console.log('fetching user data')
        const userRef = usersRef.doc(`/${user.uid}`);
        const snapshot = await userRef.get()
        if (snapshot.exists) {
            console.log(snapshot.data().displayName)
            setUserDisplayName(snapshot.data().displayName)
            setError(`Welcome ${userDisplayName}`)
            history.push('/')
        }
        else {

            setError('Please Enter User Data')

        }
    }
    //this will run everytime the page loads to fetch user data
    useEffect(() => {
        fetchUserData(currentUser.currentUser);
    }, [])


    return (
        <div>
            {error && ({ error })}
            <h2>WELCOME,{JSON.stringify(currentUser.email)}</h2>
            <h2>your name is {JSON.stringify(currentUser.displayName)}</h2>

            <button onClick={handleLogout}>Log Out</button>
            <Link to="/update-profile">Update Profile</Link>
        </div>
    )
}

export default User
