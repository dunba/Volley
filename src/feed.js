import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import "./feed.css";
import Nav2 from "./Nav2";
import firebase from "./firebase";
import Videosection from "./videosection";
import Likedvideos from "./likedvideos";


//this main feed displays video & information from database
const Feed = ({ functiontester, servervideos, serverpics }) => {
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
    //console.log(e.target.attributes[1].value)
    //setIdnumber(e.target.attributes[1].value)
    // setCurrentVid(goalvids[idnumber])
    setLoading(false);
  };
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);

  const usersRef = firebase.firestore().collection("users");

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
      setUserLikedVideos(snapshot.data().userlikes)
      //  history.push('/')
    } else {
    }
  };
  //this will run everytime the page loads to fetch user data
  useEffect(() => {
    fetchUserData(currentUser.currentUser);
  }, []);



  // console.log(todaysDate);
  // console.log(servervideos)
  // console.log(userLikedVideos)
  const likedplaylist = servervideos.filter(video => video.id.includes(userLikedVideos))


  const like2 = servervideos.some(video => video.id.includes(userLikedVideos))
  const like3 = []
  servervideos.forEach(video => {
    if (userLikedVideos.includes(video.id)) {
      like3.push(video.id)
    }
  })
  console.log(like3)

  const [numholder, setNumHolder] = useState(0);

  // console.log(serverpics)
  const headerstyle = {}
  return (
    <>

      <header className='feedheader' >
        <p style={{ color: 'white' }}>{userDisplayName ? `HELLO ${userDisplayName}` : <ClipLoader />}</p>
        <Nav2 likenum={userLikes} />



      </header>

      <main>


        <section>
          <Videosection serverpics={serverpics}
            servervideos={servervideos}
            sectiontitle={"Latest"}
          />
        </section>



        <section>
          <Videosection serverpics={serverpics} servervideos={clubVideos} sectiontitle={"Club"} />
        </section>

        <section>
          <Videosection serverpics={serverpics}
            sectiontitle={"International"}
            servervideos={internationalVideos}
          />
        </section>

        <section>
          <Videosection serverpics={serverpics}
            sectiontitle={"Interviews"}
            servervideos={interviewVideos}
          />
        </section>
        <section>
          <Likedvideos serverpics={serverpics} sectiontitle={"Likes"} servervideos={like3} />
        </section>
      </main>


    </>
  );
};
export default Feed;
