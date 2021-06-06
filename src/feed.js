import React, { useState, useEffect } from "react";

import './feed.css'
import Nav2 from './Nav2'

import Video from './video'

import Picholder from './components/picholder'
import Sidebar from './components/sidebar'


//this main feed displays video & information from database
const Feed = ({ goalvids, likedlist, likenum }) => {



  const [idnumber, setIdnumber] = useState(0);
  const [currentvid, setCurrentVid] = useState(goalvids[idnumber])





  //this handles the playlist picture gallery, retrieves info from the DOM
  const clickHandler = (e) => {

    console.log(e)
    console.log(e.target.attributes[1].value)
    setIdnumber(e.target.attributes[1].value)
    // console.log(currentvid)
    setCurrentVid(goalvids[idnumber])
  }

  return (
    <div className='flexcontainer'>
      <Nav2 likenum={likenum} />
      <div className='mediacontainer'>


        <div className='picholder'> <Picholder goalvids={goalvids} clickHandler={clickHandler} /></div>
        <div className='videoholder'>

          <Video team={currentvid.team} url={currentvid.url} scorer={currentvid.scorer} /></div>
        <div className='videosidebar'>
          <Sidebar currentvid={currentvid} />
        </div>


      </div>

    </div>


  )
};
export default Feed;
