import React, { useState, useEffect, useRef } from "react";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import { useAuth } from "../AuthContext";
import "../feed.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ClipLoader from 'react-spinners/ClipLoader'

const Sidebar = ({ currentvid, onFastforward, goalvids, loggedInUser, setLikeNum, likenum }) => {
  const commentRef = useRef();
  const currentUser = useAuth();

  const [iscommentvisible, setIscommentvisible] = useState(false);
  const commentHandler = () => {
    if (iscommentvisible === false) {
      setIscommentvisible(true);
      console.log("comments open");
      console.table(currentvid.comments);
    } else {
      setIscommentvisible(false);
      console.log("comments closed");
    }
  };

  const functiontester = e => {
    e.preventDefault();
    console.log(e);
    goalvids[0].comments.push({
      name: "test",
      posting: commentRef.current.value,
    });
    console.log(commentRef.current.value);
    console.log(goalvids[0].comments);
  };

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
      console.log("unliked");
      setLikeNum(likenum - 1)

    } else {
      setIsLiked(true);
      console.log("liked");
      setLikeNum(likenum + 1)
    }
  };

  const [loading, setLoading] = useState(false);


  if (loading) return <ClipLoader />

  return (
    <div>
      {currentvid ?
        <div>
          <div className="descriptionsection">{currentvid.description}</div>
          <div>{currentUser.email}</div>
          <div>
            {" "}
            <h3>{currentvid.scorer}</h3>
            <h3>{currentvid.team}</h3>
            <p>{currentvid.views.length} Views</p>
            <p onClick={showLikes}>
              {" "}
              <strong>{currentvid.likes.length}</strong> Likes
            </p>
            {islikesvisible ? (
              <p>
                Liked by{" "}
                <strong>
                  {currentvid.likes[Math.floor(Math.random() * currentvid.likes.length)].user}
                </strong>{" "}
                and <strong>{currentvid.likes.length - 1}</strong> others{" "}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="sidebar_icons">
            <div className="social_controls">
              {isliked ? (
                <FavoriteIcon id="iconn" onClick={likeHandler} fontSize="large" />
              ) : (
                <FavoriteBorderIcon
                  onClick={likeHandler}
                  id="iconn"
                  fontSize="large"
                />
              )}
              <ShareIcon id="iconn" fontSize="large" />
              <CommentIcon id="iconn" fontSize="large" onClick={commentHandler} />
            </div>
            <div className="commentssection">
              <strong>{currentvid.comments.length}</strong> Comments
              {iscommentvisible ? (
                <p>
                  {currentvid.comments.map(comment => (
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
                    <button onClick={functiontester}>Post</button>
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
