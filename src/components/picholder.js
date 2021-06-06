import React from 'react'
import '../feed.css'


const Picholder = ({ goalvids, clickHandler }) => {
    return (
        <div>

            Playlist<div className='sidepanelholder'>
                {goalvids.map(pic => (<div className='sidepanel'><img alt={pic.description} onClick={clickHandler} mycustomattribute={pic.id} id='thumbnail' src={pic.img} />
                    <div class="overlay">
                        <div class="text">{pic.scorer}</div>
                    </div></div>

                ))}

            </div>
        </div>
    )
}

export default Picholder
