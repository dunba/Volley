import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ClipLoader from 'react-spinners/ClipLoader'
import firebase from './firebase'
import { useAuth } from './AuthContext'

import './feed.css'
import Nav2 from './Nav2'

import Video from './video'

import Picholder from './components/picholder'
import Sidebar from './components/sidebar'


//this main feed displays video & information from database
const VideoWatch = ({ match }) => {
    const history = useHistory();
    const currentUser = useAuth();

    const videoId = match.params.id;

    const [servervideos, setServerVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const videosRef = firebase.firestore().collection("videos");


    //this will fetch videos from the server
    const fetchDocs = () => {
        console.log(videosRef);
        setLoading(true);
        videosRef.onSnapshot(snapshot => {
            const items = [];
            snapshot.forEach(doc => {
                items.push(doc.data());
            });
            setServerVideos(items);
            setLoading(false);
        });
    };
    const currentvid = servervideos.filter(video => video.id == videoId)









    const usersRef = firebase.firestore().collection("users");


    //this runs to validate userdata everytime the page is visited. on the first time, it will prompt user to enter info.
    const fetchUserData = async (user) => {
        console.log('fetching user data')
        const userRef = usersRef.doc(`/${user.uid}`);
        const snapshot = await userRef.get()
        if (snapshot.exists) {
            console.log(`Welcome ${userRef.displayName}`)
        }
        else {

            console.log('Please Enter User Data')

        }
    }

    //this will run everytime the page loads to fetch user data
    useEffect(() => {
        fetchDocs();
        console.log(currentvid)
        fetchUserData(currentUser.currentUser);
    }, [])







    //this handles the playlist picture gallery, retrieves info from the DOM
    const clickHandler = (e) => {
        setLoading(true)
        console.log(e)
        //console.log(e.target.attributes[1].value)
        //setIdnumber(e.target.attributes[1].value)
        // setCurrentVid(goalvids[idnumber])
        setLoading(false)
    }



    const [likenum, setLikeNum] = useState(0)




    return (
        <div className='flexcontainer'>
            <Nav2 likenum={likenum} setLikeNum={setLikeNum} />
            {videoId}
            <hr />
            <button onClick={() => history.push('/')}>Back</button>

            <div className='mediacontainer'>
                <div className='picholder'> <Picholder servervideos={servervideos} currentvid={currentvid} clickHandler={clickHandler} /></div>
                <div className='videoholder'>
                    <Video servervideos={servervideos} currentvid={currentvid} />
                </div>
                {/*
                <div className='videosidebar'>
                    <Sidebar likenum={likenum} setLikeNum={setLikeNum} goalvids={goalvids} currentvid={currentvid} /> 
        </div>

*/}
            </div >


        </div >


    )
};
export default VideoWatch;
