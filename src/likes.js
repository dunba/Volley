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
                {likedlist.forEach(element => {
                <ul>
                    <li>{element.scorer}</li>

                </ul>

            })};


            </div>
        </div>
    )
}

export default Likes
