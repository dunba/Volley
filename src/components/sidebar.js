import React, { useState, useEffect, useRef } from "react";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import { useAuth } from "../AuthContext";
import "../feed.css";
import { Card, Form, Button, Alert } from 'react-bootstrap'
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ClipLoader from 'react-spinners/ClipLoader'
import CloseIcon from '@material-ui/icons/Close';
import firebase from '../firebase'
import { useHistory } from 'react-router-dom'

const Sidebar = ({ currentvid, userDisplayName, videosRef, videoId }) => {
  const commentRef = useRef();
  const currentUser = useAuth();
  const history = useHistory()

  //this handles the visibility of the comments section
  const [iscommentvisible, setIscommentvisible] = useState(false);


  function consoleLogger(comment) {
    console.log(comment)
  }

  async function commentHandler() {
    if (iscommentvisible === false) {
      setIscommentvisible(true)

      consoleLogger("comments open")

    } else {
      setIscommentvisible(false)
      consoleLogger("comments closed")

    }
  };


  //This deals with showing who likes the video
  const [islikesvisible, setIslikesvisible] = useState(false);
  const showLikes = () => {
    if (islikesvisible === false) {
      setIslikesvisible(true);
      console.log("showing likes");
    } else {
      setIslikesvisible(false);
      console.log("hiding likes");
    }
  };

  //this section handles the like button on the side and top panel
  const [isliked, setIsLiked] = useState(false);


  // this function handles the state once the like button is pressed
  const likeHandler = () => {
    if (isliked) {
      setIsLiked(false);
      console.log("unliked")
      console.log(videoId);
      serverUnlike(currentUser.currentUser, videoId, currentvid)

    } else {
      setIsLiked(true);
      console.log("liked");
      console.log(videoId);
      serverLike(currentUser.currentUser, videoId, currentvid)

    }
  };
  const currentusermail = currentUser.currentUser.email
  const currentUserId = currentUser.currentUser.uid
  const usersRef = firebase.firestore().collection("users");


  // this function will create a document in firebase if a record of the user does not exist yet.
  const serverLike = async (user, videoId) => {
    if (!user) return;
    const userRef = usersRef.doc(`/${user.uid}`);
    const snapshot = await userRef.get()
    if (snapshot.exists) {
      try {
        userRef.update({
          userlikes: firebase.firestore.FieldValue.arrayUnion(videoId),
        })
        setSuccess('videoliked')
      } catch {
        setError('Error to Like video')
      }
    }

  }

  const serverUnlike = async (user, videoId) => {
    if (!user) return;
    const userRef = usersRef.doc(`/${user.uid}`);
    const snapshot = await userRef.get()
    if (snapshot.exists) {
      try {
        userRef.update({
          userlikes: firebase.firestore.FieldValue.arrayRemove(videoId),
        })
        setSuccess('videounliked')
      } catch {
        setError('Error to unLike video')
      }
    }

  }


  const fetchUserData = async user => {
    const userRef = usersRef.doc(`/${user.uid}`);
    const snapshot = await userRef.get();
    if (snapshot.exists) {
      if (snapshot.data().userlikes.includes(videoId)) {
        setIsLiked(true)
      }

    }
  };
  //this will run everytime the page loads to fetch user data
  useEffect(() => {
    fetchUserData(currentUser.currentUser);
  }, []);



















  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');

  const shareHandler = () => {
    let urlbase = 'localhost:300/watch/'
    let fullurl = urlbase + currentvid[0].id
    console.log('sharing video')
    console.log(fullurl)
    alert(fullurl)
  }


  // this function will post a comment in firebase in a video's comments section.
  const createLikeRecord = async (video, name, timeliked) => {
    if (!video) return;
    const likeRef = videosRef.doc(`/${videoId}`);
    const likerecord = await likeRef.get()
    if (likerecord.exists) {
      console.log(likerecord.data())

    }

  }
  //this function posts comments to the page
  const postComment = (e) => {
    e.preventDefault();
    console.log(`Comment by ${userDisplayName} reads: ${commentRef.current.value}`)
    console.log(currentvid[0].comments)
    console.log(videosRef)
    createLikeRecord(videoId, userDisplayName)
  }

  if (loading) return <ClipLoader />

  return (
    <div>
      {currentvid[0] ?
        <div>
          <div className="descriptionsection"> {currentvid[0] && (currentvid[0].description)}</div>
          <div>{currentUser.email}</div>
          <div>
            {" "}
            <h3>{currentvid[0].scorer}</h3>
            <h3>{currentvid[0].team}</h3>
            <p> {currentvid[0].views} Views</p>
            <p onClick={showLikes}>
              {" "}
              <strong>{currentvid[0].likes.length}</strong> Likes
            </p>
            {islikesvisible ? (
              <p>
                Liked by{" "}
                <strong>

                  {currentvid[0].likes[Math.floor(Math.random() * currentvid[0].likes.length)].user}
                </strong>{" "}
                and <strong>{currentvid[0].likes.length - 1}</strong> others{" "}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="sidebar_icons">
            <div className="social_controls">
              <div className='alerts'>  {error && <Alert variant='danger'>{error}</Alert>}
                {success && <Alert variant='success'>{success}</Alert>}</div>

              {isliked ? (
                <FavoriteIcon id="iconn" onClick={likeHandler} fontSize="large" />
              ) : (
                <FavoriteBorderIcon
                  onClick={likeHandler}
                  id="iconn"
                  fontSize="large"
                />
              )}
              <ShareIcon id="iconn" fontSize="large" onClick={shareHandler} />
              <CommentIcon id="iconn" fontSize="large" onClick={commentHandler} />

              <strong>{currentvid[0].comments.length}</strong> Comments
            </div>
            <div className="commentssection">
              {iscommentvisible ? (
                <p>
                  <h1>Comments</h1><CloseIcon fontSize='large' onClick={() => setIscommentvisible(false)} />
                  {currentvid[0].comments.length == 0 ? '0 Comments' : 'Comments'}

                  {currentvid[0].comments.map(comment => (
                    <div className="comments">
                      <p>
                        <strong>{comment.name}. </strong>
                        {comment.posting}
                        <hr />{" "}
                      </p>
                    </div>
                  ))}{" "}
                  <div>
                    Add Commment...
                    <input ref={commentRef} type="text"></input>
                    <button onClick={postComment}>Post</button>
                  </div>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div> : <ClipLoader />}
    </div>
  );
};

export default Sidebar;
