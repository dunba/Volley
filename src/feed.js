import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import ClipLoader from 'react-spinners/ClipLoader'

import './feed.css'
import Nav2 from './Nav2'

import Video from './video'

import Picholder from './components/picholder'
import Sidebar from './components/sidebar'


//this main feed displays video & information from database
const Feed = ({ goalvids, likedlist, functiontester, servervideos }) => {


  const filteredvid = servervideos.filter(video => video.active)
  console.log(filteredvid)
  const [currentvid, setCurrentVid] = useState(filteredvid[0])

  const [idnumber, setIdnumber] = useState(0);




  //this handles the playlist picture gallery, retrieves info from the DOM
  const clickHandler = (e) => {
    setLoading(true)
    console.log(e)
    //console.log(e.target.attributes[1].value)
    //setIdnumber(e.target.attributes[1].value)
    // setCurrentVid(goalvids[idnumber])
    setLoading(false)
  }
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false)



  const [likenum, setLikeNum] = useState(0)


  return (
    <div className='flexcontainer'>
      <Nav2 likenum={likenum} setLikeNum={setLikeNum} />

      <div className='mediacontainer'>
        <div className='picholder'> <Picholder servervideos={servervideos} currentvid={currentvid} goalvids={goalvids} clickHandler={clickHandler} /></div>
        <div className='videoholder'>
          <Video servervideos={servervideos} currentvid={currentvid} />
        </div>
        <div className='videosidebar'>
          <Sidebar likenum={likenum} setLikeNum={setLikeNum} goalvids={goalvids} currentvid={currentvid} />
        </div>


      </div>

    </div>


  )
};
export default Feed;
