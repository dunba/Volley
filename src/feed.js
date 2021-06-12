import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

import './feed.css'
import Nav2 from './Nav2'

import Video from './video'

import Picholder from './components/picholder'
import Sidebar from './components/sidebar'


//this main feed displays video & information from database
const Feed = ({ goalvids, likedlist, functiontester }) => {



  const [currentvid, setCurrentVid] = useState(goalvids[0])





  //this handles the playlist picture gallery, retrieves info from the DOM
  const clickHandler = (e) => {
    console.log(e)
  }
  const currentUser = useAuth();
  //const loggedInUser = { email: currentUser.currentUser.email, likedvids: [] };

  return (
    <div className='flexcontainer'>
      <Nav2 />
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
