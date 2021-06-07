import React, { useState, useEffect, useRef } from 'react'
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';

import '../feed.css'



const Sidebar = ({ currentvid, onFastforward, goalvids }) => {

    const commentRef = useRef()

    console.log(currentvid.liked)
    console.log(currentvid)

    const [iscommentvisible, setIscommentvisible] = useState(false)
    const commentHandler = () => {
        if (iscommentvisible === false) {
            setIscommentvisible(true);
        } else {
            setIscommentvisible(false);
        }

    }
    const functiontester = (e) => {
        e.preventDefault();
        console.log(e)
        goalvids[0].comments.push({ name: 'dan', posting: commentRef.current.value })
        console.log(commentRef.current.value)
        console.log(goalvids[0].comments)
    }

    return (
        <div>
            <div>
                <div className='descriptionsection'>{currentvid.description}</div>
                <div>                        <h3>{currentvid.scorer}</h3>
                    <h3>{currentvid.team}</h3>
                    <p>250 Views</p>
                    <p>250 Likes</p>
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
