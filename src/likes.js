import React, { useState, useEffect } from "react";
import './feed.css'
import Nav2 from './Nav2'
import firebase from "./firebase";
import { useAuth } from "./AuthContext";



const Likes = ({ likenum }) => {
    const usersRef = firebase.firestore().collection("users");

    const currentUser = useAuth();

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
            <div className='headercontainer'><Nav2 likenum={userLikes} /></div>

            <div>


                <div>
                    video goes here
                </div>




            </div>
        </div>
    )
}

export default Likes
