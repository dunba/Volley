import React, { useState, useEffect } from 'react'
import '../feed.css'


const Picholder = ({ goalvids, clickHandler, servervideos }) => {

    return (
        <div>

            Playlist<div className='sidepanelholder'>
                {servervideos.map(pic => (<div className='sidepanel'><img alt={pic.description} onClick={clickHandler} mycustomattribute={pic.id} id='thumbnail' src={pic.thumbnail} />
                    <div class="overlay">
                        <div class="text">{pic.scorer}</div>

                    </div></div>

                ))}

            </div>
        </div>
    )
}

export default Picholder
