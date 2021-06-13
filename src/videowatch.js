import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ClipLoader from 'react-spinners/ClipLoader'

import './feed.css'
import Nav2 from './Nav2'

import Video from './video'

import Picholder from './components/picholder'
import Sidebar from './components/sidebar'


//this main feed displays video & information from database
const VideoWatch = ({ match, servervideos }) => {
    const history = useHistory();

    console.log(match);
    console.log(servervideos)
    const videoId = match.params.id;

    // const currentvid = servervideos.filter(video => video.id === { videoId })







    //this handles the playlist picture gallery, retrieves info from the DOM
    const clickHandler = (e) => {
        setLoading(true)
        console.log(e)
        //console.log(e.target.attributes[1].value)
        //setIdnumber(e.target.attributes[1].value)
        // setCurrentVid(goalvids[idnumber])
        setLoading(false)
    }
    const [loading, setLoading] = useState(false)



    const [likenum, setLikeNum] = useState(0)




    return (
        <div className='flexcontainer'>
            <Nav2 likenum={likenum} setLikeNum={setLikeNum} />
            {videoId}
            <button onClick={() => history.goBack()}>Back</button>

            {/* <div className='mediacontainer'>
                <div className='picholder'> <Picholder servervideos={servervideos} currentvid={currentvid} goalvids={goalvids} clickHandler={clickHandler} /></div>
                <div className='videoholder'>
                    <Video servervideos={servervideos} currentvid={currentvid} />
                </div>
                <div className='videosidebar'>
                    <Sidebar likenum={likenum} setLikeNum={setLikeNum} goalvids={goalvids} currentvid={currentvid} /> 
        </div>


            </div >
*/}

        </div >


    )
};
export default VideoWatch;
