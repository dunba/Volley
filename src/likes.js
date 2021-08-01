import React, { useState, useEffect } from "react";
import './feed.css'
import firebase from "./firebase";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav2 from "./Nav2";
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


    return (
        <div className='flexcontainer'>


            <div>
                {userLikes && (
                    <div className='likedheading'><Nav2 likenum={userLikes.length} />Liked Videos</div>)}
                {userLikes && (userLikes.length == 0 ? <div style={{ color: 'white' }}><strong>No</strong> Liked Videos</div> : '')}
                {userLikes && (

                    userLikes.map(userlike => (
                        <div className='likedlisting'> <Link to={`/watch/${userlike.data[0].id}`}><motion.img whileHover={{ scale: 1.1 }} transition={transition} id='likedimg' src={userlike.data[0].thumbnail} />
                        </Link><div style={{ color: 'white' }}>{userlike.data[0].description}</div></div>
                    ))
                )}


            </div>


        </div>
    )
}

export default Likes
