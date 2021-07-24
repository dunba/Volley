import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import "./feed.css";
import Nav2 from "./Nav2";
import firebase from "./firebase";
import Videosection from "./videosection";
import Likedvideos from "./likedvideos";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";


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



  console.log(userLikedVideos)
  const likedplaylist = servervideos.filter(video => video.id.includes(userLikedVideos))


  const like2 = servervideos.some(video => video.id.includes(userLikedVideos))


  const [numholder, setNumHolder] = useState(0);

  const transition2 = { duration: 2, ease: [0.43, .13, -.13, .96] }

  const d = new Date();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }


  return (
    <motion.div variants={container} exit={{ opacity: 0 }}
      initial="hidden"
      animate="show">

      <motion.header className='feedheader' >


        <Carousel fade slideshowSpeed={2000}>
          {serverpics[0] && (
            <Carousel.Item>
              <img
                id='gradientoverlay'
                className="d-block w-100"
                src={serverpics[0].header}
                alt="First slide"
              />
              <Carousel.Caption >
                <h3>FEATURED</h3>
                <h5>{serverpics[0].headline}</h5>
                <Link to={`/watch/${serverpics[0].id}`}><a>WATCH NOW</a></Link>
              </Carousel.Caption>
            </Carousel.Item >
          )}
          {serverpics[1] && (

            <Carousel.Item >
              <img
                id='gradientoverlay'
                className="d-block w-100"
                src={serverpics[1].header}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>FEATURED</h3>
                <h5>{serverpics[1].headline}</h5>
                <Link to={`/watch/${serverpics[1].id}`}><a>WATCH NOW</a></Link>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {serverpics[2] && (
            <Carousel.Item>
              <img
                id='gradientoverlay'
                className="d-block w-100"
                src={serverpics[2].header}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>FEATURED</h3>
                <h5>{serverpics[2].headline}</h5>
                <Link to={`/watch/${serverpics[2].id}`}><a>WATCH NOW</a></Link>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {serverpics[3] && (
            <Carousel.Item>
              <img
                id='gradientoverlay'
                className="d-block w-100"
                src={serverpics[3].header}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>FEATURED</h3>
                <h5>{serverpics[3].headline}</h5>
                <Link to={`/watch/${serverpics[3].id}`}><a>WATCH NOW</a></Link>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {serverpics[4] && (
            <Carousel.Item >
              <img
                id='gradientoverlay'
                className="d-block w-100"
                src={serverpics[4].header}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>FEATURED</h3>
                <h5>{serverpics[4].headline}</h5>
                <Link to={`/watch/${serverpics[4].id}`}><a>WATCH NOW</a></Link>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>

      </motion.header>

      <main>
        <Nav2 likenum={userLikes} />
        <p style={{ color: 'black' }}>{userDisplayName ? `HELLO ${userDisplayName}` : <ClipLoader />}</p>


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
          <Likedvideos serverpics={serverpics} sectiontitle={"Likes"} servervideos={userLikedVideos} />
        </section>
      </main>


    </motion.div>
  );
};
export default Feed;
