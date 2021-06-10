import React, { useState, useEffect } from 'react'
import '../feed.css'


const Picholder = ({ goalvids, clickHandler, currentvid }) => {

    return (
        <div>

            Playlist<div className='sidepanelholder'>
                <img alt={currentvid.description} onClick={clickHandler} mycustomattribute={currentvid.id} id='thumbnail' src={currentvid.thumbnail} />
                <div class="overlay">
                    <div class="text">{currentvid.scorer}</div>

                </div>

            </div>
        </div>
    )
}

export default Picholder
