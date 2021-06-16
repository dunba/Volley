import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import ClipLoader from 'react-spinners/ClipLoader'
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import './feed.css'
import Nav2 from './Nav2'
import Video from './video'
import Picholder from './components/picholder'
import Sidebar from './components/sidebar'
import firebase from './firebase'

//this main feed displays video & information from database
const Feed = ({ goalvids, likedlist, functiontester, servervideos }) => {

  const filteredvid = servervideos.filter(video => video.active)

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

  const usersRef = firebase.firestore().collection("users");
  const [userinfo, setUserInfo] = useState(null)

  //this runs to validate userdata everytime the page is visited. on the first time, it will prompt user to enter info.
  const [userDisplayName, setUserDisplayName] = useState('')

  const fetchUserData = async (user) => {
    console.log('fetching user data')
    const userRef = usersRef.doc(`/${user.uid}`);
    const snapshot = await userRef.get()
    if (snapshot.exists) {
      console.log(snapshot.data().displayName)
      setUserDisplayName(snapshot.data().displayName)
      //  history.push('/')
    }
    else {


    }
  }
  //this will run everytime the page loads to fetch user data
  useEffect(() => {
    fetchUserData(currentUser.currentUser);
  }, [])












  return (
    <div>
      <Nav2 likenum={likenum} setLikeNum={setLikeNum} />

      <div>
        WELCOME {userDisplayName}
        {servervideos.map(pic => (<div>
          <Link to={`/watch/${pic.id}`}><img key={pic.id} alt={pic.description} id='thumbnail' src={pic.thumbnail} /></Link>
          <div>
            <div>{pic.description}</div>
            <div>
              <VisibilityIcon />{pic.views.length}
              <FavoriteBorderIcon />{pic.likes.length}
              <ChatIcon />{pic.comments.length}</div>

          </div></div>

        ))}
      </div>

    </div>


  )
};
export default Feed;
