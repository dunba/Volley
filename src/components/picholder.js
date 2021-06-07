import React, { useState, useEffect } from 'react'
import '../feed.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const Picholder = ({ goalvids, clickHandler }) => {
    //this section handles the like button on the side and top panel
    const [isliked, setIsLiked] = useState(false);
    // this function handles the state once the like button is pressed
    const likeHandler = (e) => {

        if (isliked) {
            setIsLiked(false);
            console.log('hey')
        } else {
            setIsLiked(true);
            console.log(e)
            console.log('hey')
        }
    }



    return (
        <div>

            Playlist<div className='sidepanelholder'>
                {goalvids.map(pic => (<div className='sidepanel'><img alt={pic.description} onClick={clickHandler} mycustomattribute={pic.id} id='thumbnail' src={pic.img} />
                    <div class="overlay">
                        <div class="text">{pic.scorer}</div>
                        {pic.liked ? <FavoriteIcon id='iconn' onClick={likeHandler} fontSize='large' /> : <FavoriteBorderIcon onClick={likeHandler} id='iconn' fontSize='large' />}
                    </div></div>

                ))}

            </div>
        </div>
    )
}

export default Picholder
