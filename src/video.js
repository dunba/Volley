import React from 'react'
import { useRef } from 'react'
import { useState } from 'react';
import './video.css'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';





const Video = ({ url }) => {
    const [playing, setPlaying] = useState(false)

    const videoRef = useRef(null)

    const onVidPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    }




    return (

        <div className='videocard'>
            <video loop src={url} type='video/mp4' onclick={onVidPress} ref={videoRef} >

            </video>

            <div className='vid_controls'>
                <FastRewindIcon fontSize='large' />
                {playing ? <PauseIcon onClick={onVidPress} fontSize='large' /> : <PlayArrowIcon onClick={onVidPress} fontSize='large' />}
                <FastForwardIcon fontSize='large' />

            </div>

        </div>
    )
}

export default Video
