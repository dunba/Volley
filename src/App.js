import "./App.css";
import PremTable from "./table";
import Stats from "./stats";
import Feed from "./feed";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Playerdata from "./playerdata";
import Teamdata from "./teamdata";
import SignUp from "./SignUp";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Likes from "./likes";
import Setuserinfo from "./setuserinfo";
import firebase from "./firebase";
import User from "./user";
import Watch from "./watch"
import VideoWatch from './videowatch'
import Video from "./video";
import Footer from './footer'
import Search from './search'

function App() {
  const currentUser = useAuth();
  const usersRef = firebase.firestore().collection("users");
  const [userLikedVideos, setUserLikedVideos] = useState([]);
  const [userLikes, setUserLikes] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState("");

  const [likenum, setLikenum] = useState(null);



  //this gives a notification of the number of likes = true based on the database
  //   useEffect(() => {
  //     setLikenum(likedlist.length);
  //   }, [likedlist]);

  const [servervideos, setServerVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const videosRef = firebase.firestore().collection("videos");

  const fetchDocs = () => {
    setLoading(true);
    videosRef.onSnapshot(snapshot => {
      const items = [];
      snapshot.forEach(doc => {
        items.push(doc.data());
      });
      setServerVideos(items);
      setLoading(false);
    });
  };
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

  // const fetchDocs2 = () => {
  //   setLoading(true);
  //   videosRef.get().then(item => {
  //     const items = items.docs.map(doc => doc.data());
  //     console.log(items);
  //     setVids(items);
  //     setLoading(false);
  //   });
  // };

  useEffect(() => {
    fetchDocs();


  }, []);

  const serverpics = servervideos.filter(video => video.headline)

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route exact component={ForgotPassword} path="/forgot-password" />
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            {/* this separate div prevents the nav bar from showing up on the login / logout pages */}
            <PrivateRoute exact path="/Setuserinfo">
              <Setuserinfo />
            </PrivateRoute>

            <div>
              <Nav likenum={userLikes} />
              <PrivateRoute servervideos={servervideos} exact path="/watch">
                <Watch servervideos={servervideos} />
              </PrivateRoute>

              <PrivateRoute exact path="/">
                <Feed servervideos={servervideos} serverpics={serverpics} />
              </PrivateRoute>
              <PrivateRoute exact path="/user" ><User /></PrivateRoute>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route exact path="/table">
                <PremTable />
              </Route>
              <Route exact path="/stats">
                <Stats />
              </Route>
              <Route exact path="/likes">
                <Likes />
              </Route>
              <Route path="/stats/:id" component={Playerdata} />
              <Route path="/table/:id" component={Teamdata} />
              <Route servervideos={servervideos} path='/watch/:id' component={VideoWatch} />
              <Route exact path='/search' component={Search} />
              <Footer />
            </div>
          </Switch>
        </div>
      </AuthProvider>
    </Router >
  );
}

export default App;
