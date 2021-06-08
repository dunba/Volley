import React, { useState, useEffect, useRef } from 'react'
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';

import '../feed.css'



const Sidebar = ({ currentvid, onFastforward, goalvids }) => {

    const commentRef = useRef()


    const [iscommentvisible, setIscommentvisible] = useState(false)
    const commentHandler = () => {
        if (iscommentvisible === false) {
            setIscommentvisible(true);
            console.log('comments open')
            console.table(currentvid.comments)
        } else {
            setIscommentvisible(false);
            console.log('comments closed');
        }

    }
    const functiontester = (e) => {
        e.preventDefault();
        console.log(e)
        goalvids[0].comments.push({ name: 'dan', posting: commentRef.current.value })
        console.log(commentRef.current.value)
        console.log(goalvids[0].comments)
    }

    const [islikesvisible, setIslikesvisible] = useState(false);
    const showLikes = () => {
        if (islikesvisible === false) {
            setIslikesvisible(true)
            console.log('showing likes')

        } else {
            setIslikesvisible(false)
            console.log('hiding likes')
        }
    }

    return (
        <div>
            <div>
                <div className='descriptionsection'>{currentvid.description}</div>
                <div>                        <h3>{currentvid.scorer}</h3>
                    <h3>{currentvid.team}</h3>
                    <p>250 Views</p>
                    <p onClick={showLikes}> <strong>{currentvid.likes.likedby.length}</strong> Likes</p>
                    {islikesvisible ? <p>Liked by <strong>{currentvid.likes.likedby[Math.floor(Math.random() * 8)]}</strong> and <strong>{currentvid.likes.likedby.length}</strong> others </p> : ''}
                </div>

                <div className='sidebar_icons'>

                    <div className='social_controls'>

                        <ShareIcon id='iconn' fontSize='large' />
                        <CommentIcon id='iconn' fontSize='large' onClick={commentHandler} />
                    </div>
                    <div className='commentssection'>
                        <strong>{currentvid.comments.length}</strong> Comments
                        {iscommentvisible ? <p>{currentvid.comments.map(comment => (<p><strong>{comment.name}.      </strong>{comment.posting}<hr />                         </p>

                        ))} <div>Add Commment...
                            <input ref={commentRef} type='text'></input>
                                <button onClick={functiontester}>Post</button>

                            </div>
                        </p> : ''}





                    </div>

                </div>


            </div>
        </div>
    )
}

export default Sidebar
