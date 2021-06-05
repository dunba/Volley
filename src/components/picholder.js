import React from 'react'

const picholder = () => {
    return (
        <div>
            <div className='picholder'>
                Playlist<div className='sidepanelholder'>
                    {goalvids.map(pic => (<div className='sidepanel'><img onClick={clickHandler} mycustomattribute={pic.id} id='thumbnail' src={pic.img} />
                        <div class="overlay">
                            <div class="text">{pic.scorer}</div>
                        </div></div>

                    ))}

                </div>
            </div>
        </div>
    )
}

export default picholder
