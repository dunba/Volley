import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react';
import './video.css'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';

import ClipLoader from 'react-spinners/ClipLoader'




const Video = ({ currentvid }) => {

    const [ismuted, setIsmuted] = useState(false)
    const onVolumePress = () => {
        if (ismuted) {
            videoRef.current.muted = false;
            setIsmuted(false)
            console.log('unmuted!')

        } else {
            videoRef.current.muted = true;
            setIsmuted(true)

            console.log('muted!')
        }
    }

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
            <video loop src={currentvid.url} type='video/mp4' onclick={onVidPress} ref={videoRef} />


            <div className='vid_controls'>

                {playing ? <PauseIcon id='iconn' onClick={onVidPress} fontSize='large' /> : <PlayArrowIcon id='iconn' onClick={onVidPress} fontSize='large' />}
                {ismuted ? <VolumeMuteIcon onClick={onVolumePress} id='iconn' fontSize='large' /> : <VolumeUpIcon onClick={onVolumePress} id='iconn' fontSize='large' />}
            </div>

        </div>
    )
}

export default Video
