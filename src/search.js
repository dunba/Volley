import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Nav2 from "./Nav2";
import { useAuth } from "./AuthContext";
import firebase from "./firebase";



const Search = () => {
    const history = useHistory();
    const currentUser = useAuth();
    const usersRef = firebase.firestore().collection("users");


    const [userLikes, setUserLikes] = useState(null);

    const fetchUserData = async user => {
        const userRef = usersRef.doc(`/${user.uid}`);
        const snapshot = await userRef.get();
        if (snapshot.exists) {
            // console.log(snapshot.data().displayName)
            setUserLikes(snapshot.data().userlikes.length);
            //  history.push('/')
        } else {
        }
    };
    //this will run everytime the page loads to fetch user data
    useEffect(() => {
        fetchUserData(currentUser.currentUser);
    }, []);

    return (
        <div className='flexcontainer'>

            <div onClick={() => history.push('/')} className='backbutton'> <ArrowBackIcon />BACK</div>
            <hr />

            <input />
            search
        </div>
    )
}

export default Search
