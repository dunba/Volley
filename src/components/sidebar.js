import React, { useState, useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';

import '../feed.css'



const Sidebar = ({ currentvid, onFastforward, goalvids }) => {

    console.log(currentvid.liked)
    console.log(currentvid)

    return (
        <div>
            <div>
                <div className='descriptionsection'>{currentvid.description}</div>

                <div className='sidebar_icons'>

                    <div className='social_controls'>

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
