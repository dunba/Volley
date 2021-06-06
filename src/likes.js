import React from 'react'
import './feed.css'
import Nav2 from './Nav2'

const Likes = ({ likenum, likedlist, isliked }) => {
    console.log(likedlist)
    return (
        <div className='flexcontainer'>
            <div className='headercontainer'><Nav2 likenum={likenum} /></div>

            <div>
                test
                {likedlist[0].scorer}


            </div>
        </div>
    )
}

export default Likes
