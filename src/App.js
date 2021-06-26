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
import user from "./user";
import Watch from "./watch"
import VideoWatch from './videowatch'
import Video from "./video";
import Footer from './footer'

function App() {


  const [likenum, setLikenum] = useState(null);



  //this gives a notification of the number of likes = true based on the database
  //   useEffect(() => {
  //     setLikenum(likedlist.length);
  //   }, [likedlist]);

  const [servervideos, setServerVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const videosRef = firebase.firestore().collection("videos");

  const fetchDocs = () => {
    console.log(videosRef);
    setLoading(true);
    videosRef.onSnapshot(snapshot => {
      const items = [];
      snapshot.forEach(doc => {
        items.push(doc.data());
      });
      setServerVideos(items);
      setLoading(false);
      console.log(servervideos)
    });
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

            <div>
              <Nav />
              <PrivateRoute servervideos={servervideos} exact path="/watch">
                <Watch servervideos={servervideos} likenum={likenum} />
              </PrivateRoute>
              <PrivateRoute exact path="/Setuserinfo">
                <Setuserinfo />
              </PrivateRoute>
              <PrivateRoute exact path="/">
                <Feed servervideos={servervideos} likenum={likenum} />
              </PrivateRoute>
              <PrivateRoute exact path="/user" component={user} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route exact path="/table">
                <PremTable />
              </Route>
              <Route exact path="/stats">
                <Stats />
              </Route>
              <Route exact path="/likes">
                <Likes likenum={likenum} />
              </Route>
              <Route path="/stats/:id" component={Playerdata} />
              <Route path="/table/:id" component={Teamdata} />
              <Route servervideos={servervideos} path='/watch/:id' component={VideoWatch} />
              <Footer />
            </div>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
