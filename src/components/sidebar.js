import React, { useState, useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../feed.css'



const Sidebar = ({ currentvid, onFastforward, goalvids }) => {

    console.log(currentvid.liked)
    console.log(currentvid)
    //this section handles the like button on the side and top panel
    const [isliked, setIsLiked] = useState(false);
    // this function handles the state once the like button is pressed
    const likeHandler = (e) => {

        if (isliked) {
            setIsLiked(false);
            console.log('unliked')
        } else {
            setIsLiked(true);
            console.log(e)
            console.log('liked')
        }
        if (currentvid.liked === false) {
            currentvid.liked = true;
        } else {
            currentvid.liked = false;
        }

    }

    useEffect(() => {
        console.log('hey!')
    }, [isliked])
    return (
        <div>
            <div>
                <p>{currentvid.description}</p>

                <div className='sidebar_icons'>

                    <div className='social_controls'>
                        {isliked ? <FavoriteIcon secretdata={currentvid.id} id='iconn' onClick={likeHandler} fontSize='large' /> : <FavoriteBorderIcon secretdata={currentvid.id} onClick={likeHandler} id='iconn' fontSize='large' />}

                        <ShareIcon id='iconn' fontSize='large' />
                        <CommentIcon id='iconn' fontSize='large' />
                        <ExpandMoreIcon id='iconn' onClick={onFastforward} fontSize='large' />
                    </div>
                    <div>
                        <h2>{currentvid.scorer}</h2>
                        <h2>{currentvid.team}</h2>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Sidebar
