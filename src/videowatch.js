import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ClipLoader from 'react-spinners/ClipLoader'

import './feed.css'
import Nav2 from './Nav2'

import Video from './video'

import Picholder from './components/picholder'
import Sidebar from './components/sidebar'


//this main feed displays video & information from database
const VideoWatch = ({ match }) => {
    const history = useHistory();

    console.log(match);
    const videoId = match.params.id;

    return (
        <div className='flexcontainer'>
            test

            <button onClick={() => history.goBack()}>Back</button>
        </div>


    )
};
export default VideoWatch;
