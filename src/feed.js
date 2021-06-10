import React, { useState, useEffect } from "react";

import './feed.css'
import Nav2 from './Nav2'

import Video from './video'

import Picholder from './components/picholder'
import Sidebar from './components/sidebar'


//this main feed displays video & information from database
const Feed = ({ goalvids, likedlist, likenum, functiontester }) => {



  const [currentvid, setCurrentVid] = useState(goalvids[0])





  //this handles the playlist picture gallery, retrieves info from the DOM
  const clickHandler = (e) => {
    console.log(e)
  }

  return (
    <div className='flexcontainer'>
      <Nav2 likenum={likenum} />
      <div className='mediacontainer'>


        <div className='picholder'> <Picholder currentvid={currentvid} goalvids={goalvids} clickHandler={clickHandler} /></div>
        <div className='videoholder'>

          <Video currentvid={currentvid} /></div>
        <div className='videosidebar'>
          <Sidebar goalvids={goalvids} currentvid={currentvid} />
        </div>


      </div>

    </div>


  )
};
export default Feed;
