import React, { useState, useEffect } from "react";
import './feed.css'
import firebase from "./firebase";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const transition = { duration: .6, ease: [0.43, .13, -.13, .96] }



const Likes = ({ likenum }) => {
    const usersRef = firebase.firestore().collection("users");

    const currentUser = useAuth();

    const [userLikes, setUserLikes] = useState(null);

    const fetchUserData = async user => {
        const userRef = usersRef.doc(`/${user.uid}`);
        const snapshot = await userRef.get();
        if (snapshot.exists) {
            // console.log(snapshot.data().displayName)
            setUserLikes(snapshot.data().userlikes);
            //  history.push('/')
        } else {
        }
    };
    //this will run everytime the page loads to fetch user data
    useEffect(() => {
        fetchUserData(currentUser.currentUser);
    }, []);

    console.log(userLikes)
    return (
        <div className='likedcontainer'>

            <div><div className='likedheading'>Liked Videos</div>
                {userLikes && (
                    userLikes.map(userlike => (
                        <div className='likedlisting'> <Link to={`/watch/${userlike.data[0].id}`}><img id='likedimg' src={userlike.data[0].thumbnail} />
                            <div>{userlike.data[0].description}</div></Link></div>
                    ))
                )}


            </div>


        </div>
    )
}

export default Likes
