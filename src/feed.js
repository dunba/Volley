import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import "./feed.css";
import Nav2 from "./Nav2";
import Video from "./video";
import Picholder from "./components/picholder";
import Sidebar from "./components/sidebar";
import firebase from "./firebase";
import Videosection from "./videosection";

//this main feed displays video & information from database
const Feed = ({ goalvids, likedlist, functiontester, servervideos }) => {
  const filteredvid = servervideos.filter(video => video.active);

  const [currentvid, setCurrentVid] = useState(filteredvid[0]);

  const [idnumber, setIdnumber] = useState(0);

  const [userLikedVideos, setUserLikedVideos] = useState([]);

  //this handles the playlist picture gallery, retrieves info from the DOM
  const clickHandler = e => {
    setLoading(true);
    console.log(e);
    //console.log(e.target.attributes[1].value)
    //setIdnumber(e.target.attributes[1].value)
    // setCurrentVid(goalvids[idnumber])
    setLoading(false);
  };
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);
  const [likenum, setLikeNum] = useState(0);

  const usersRef = firebase.firestore().collection("users");
  const [userinfo, setUserInfo] = useState(null);

  //this runs to validate userdata everytime the page is visited. on the first time, it will prompt user to enter info.
  const [userDisplayName, setUserDisplayName] = useState("");

  const fetchUserData = async user => {
    const userRef = usersRef.doc(`/${user.uid}`);
    const snapshot = await userRef.get();
    if (snapshot.exists) {
      // console.log(snapshot.data().displayName)
      setUserDisplayName(snapshot.data().displayName);
      //  history.push('/')
    } else {
    }
  };
  //this will run everytime the page loads to fetch user data
  useEffect(() => {
    fetchUserData(currentUser.currentUser);
  }, []);

  const date = new Date();
  const todaysTimeHours = date.getHours();
  const todaysDate = date.getMonth();

  console.log(todaysDate);
  return (
    <>
      <Nav2 likenum={likenum} setLikeNum={setLikeNum} />

      <main>
        <p>{userDisplayName ? `Welcome ${userDisplayName}` : <ClipLoader />}</p>
        <section>
          <Videosection
            servervideos={servervideos}
            sectiontitle={"Recommended"}
          />
        </section>

        <section>
          <Videosection servervideos={servervideos} sectiontitle={"Club"} />
        </section>

        <section>
          <Videosection
            sectiontitle={"International"}
            servervideos={servervideos}
          />
        </section>

        <section>
          <Videosection
            sectiontitle={"Interviews"}
            servervideos={servervideos}
          />
        </section>
        <section>
          <Videosection sectiontitle={"Liked"} servervideos={userLikedVideos} />
        </section>
      </main>

      <footer>
        <section>
          <h2>Site Navigation</h2>
          <ul>
            <li>Home</li>
            <li>Stats</li>
            <li>Table</li>
            <li>User Account</li>
          </ul>
        </section>
      </footer>
    </>
  );
};
export default Feed;
