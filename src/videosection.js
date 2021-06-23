import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader'
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import './feed.css'



const Videosection = ({ servervideos }) => {
    return (
        <>

            <div className='videosection'>

                <div className='reelholder'>
                    {servervideos.map(pic => (
                        <div className='vidposting'>
                            <Link to={`/watch/${pic.id}`}><img key={pic.id} alt={pic.description} id='thumbnailonfeed' src={pic.thumbnail} /></Link>
                            <div className='videodescription' >
                                <div>{pic.description}</div>
                                <div >
                                    <VisibilityIcon />{pic.views.length}
                                    <FavoriteBorderIcon />{pic.likes.length}
                                    <ChatIcon />{pic.comments.length}
                                </div>
                            </div>
                        </div>

                    ))} </div>
            </div>

        </>
    )
}

export default Videosection
