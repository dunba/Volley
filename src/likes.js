import React from 'react'
import './feed.css'
import Nav2 from './Nav2'

const Likes = ({ likenum, likedlist, isliked }) => {
    console.log(likedlist)
    return (
        <div className='flexcontainer'>
            <div className='headercontainer'><Nav2 likenum={likenum} /></div>

            <div>
                {JSON.stringify(likedlist)}
                {likedlist.map(vid => {
                    <div>
                        <video loop src={vid.url} type='video/mp4'>Browser cannot render video</video>
                    </div>
                })}



            </div>
        </div>
    )
}

export default Likes
