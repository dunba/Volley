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
const Feed = ({ goalvids, likedlist, functiontester, servervideos, serverpics }) => {
  const filteredvid = servervideos.filter(video => video.active);

  const [currentvid, setCurrentVid] = useState(filteredvid[0]);

  const [idnumber, setIdnumber] = useState(0);

  const [userLikedVideos, setUserLikedVideos] = useState([]);
  const clubVideos = servervideos.filter(videos => videos.club);
  const internationalVideos = servervideos.filter(
    videos => videos.international
  );
  const interviewVideos = servervideos.filter(videos => videos.interview);

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
  const [userLikes, setUserLikes] = useState(null);

  const fetchUserData = async user => {
    const userRef = usersRef.doc(`/${user.uid}`);
    const snapshot = await userRef.get();
    if (snapshot.exists) {
      // console.log(snapshot.data().displayName)
      setUserDisplayName(snapshot.data().displayName);
      setUserLikes(snapshot.data().userlikes.length);
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
  console.log(serverpics)
  const [numholder, setNumHolder] = useState(0);


  return (
    <>

      <header className='feedheader'>
        <p style={{ color: 'white' }}>{userDisplayName ? `HELLO ${userDisplayName}` : <ClipLoader />}</p>

      </header>

      <main>

        <div className='headerholder'>
          <Nav2 likenum={userLikes} setLikeNum={setLikeNum} />

          {serverpics[0] ?
            <div>{serverpics[0].headline}  <Link to={`/watch/${serverpics[0].id}`}><button>Watch Now</button></Link></div>
            : ''}
        </div>
        <section>
          <Videosection
            servervideos={servervideos}
            sectiontitle={"Latest"}
          />
        </section>



        <section>
          <Videosection servervideos={clubVideos} sectiontitle={"Club"} />
        </section>

        <section>
          <Videosection
            sectiontitle={"International"}
            servervideos={internationalVideos}
          />
        </section>

        <section>
          <Videosection
            sectiontitle={"Interviews"}
            servervideos={interviewVideos}
          />
        </section>
        <section>
          <Videosection sectiontitle={"Liked"} servervideos={userLikedVideos} />
        </section>
      </main>


    </>
  );
};
export default Feed;
