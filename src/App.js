import "./App.css";
import PremTable from "./table";
import Stats from "./stats";
import Feed from './feed'
import Nav from './Nav'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Playerdata from './playerdata'
import Teamdata from './teamdata'
import SignUp from './SignUp'
import { AuthProvider } from './AuthContext';
import Login from './LoginPage'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import user from './user'
import Likes from './likes'
function App() {
    const rudigergoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Antonio%20Rudiger%20gives%20Chelsea%20crucial%20lead%20over%20Leicester%20City%20%20Premier%20League%20%20NBC%20Sports.mp4?alt=media&token=e3f810e0-0e31-4fd9-badc-4a4750fe639a'
    const cavanigoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Edinson%20Cavani%20gives%20Manchester%20United%20lead%20v%20Fulham%20in%20style%20%20Premier%20League%20%20NBC%20Sports.mp4?alt=media&token=6b5c4466-be28-42cc-b33f-9830c8b84002'
    const torresgoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Ferran%20Torres%20scorpion%20kick%20puts%20Manchester%20City%20ahead%20of%20Newcastle%20%20Premier%20League%20%20NBC%20Sports.mp4?alt=media&token=67e40cbd-71ae-4d38-b2e1-329bdaeab913'
    const bergwigngoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Steven%20Bergwijn%20slams%20Spurs%20into%20the%20lead%20v%20Aston%20Villa%20%20Premier%20League%20%20NBC%20Sports_720p.mp4?alt=media&token=02e67788-6afa-4100-8307-876fbfe631de'

    const bamfordgoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Patrick%20Bamford%20breaks%20deadlock%20for%20Leeds%20United%20v%20Southampton%20%20Premier%20League%20%20NBC%20Sports.mp4?alt=media&token=dd615309-4fcc-474a-89da-a2e14284a3f1'
    const pepegoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Nicolas%20Pepe%20bags%20brace%20in%20Arsenal%20win%20over%20Crystal%20Palace%20%20Premier%20League%20%20NBC%20Sports_720p.mp4?alt=media&token=99137465-448b-4a01-b323-720bae602cda'
    const goalvids = [{ liked: true, description: 'Antonio Rudiger gives Chelsea crucial lead over Leicester City ', id: 0, active: 'true', team: 'Chelsea', url: rudigergoal, scorer: 'Antonio Rudiger', img: 'https://via.placeholder.com/300.png/09f/fff', comments: ['first comment', 'second comment', 'third comment'] }, { liked: true, description: 'Edinson Cavani gives Manchester United lead v Fulham in style ', id: 1, active: 'false', team: 'Manchester United', url: cavanigoal, scorer: 'Edinson Cavani', img: 'https://via.placeholder.com/300/12ds5a/808080' }, { liked: false, description: 'Ferran Torres scorpion kick puts Manchester City ahead of Newcastle', id: 2, active: 'false', team: 'Manchester City', url: torresgoal, scorer: 'Ferran Torres', img: 'https://via.placeholder.com/300.png/0s06dsf/fff' }, { liked: false, description: 'Steven Bergwijn slams Spurs into the lead v Aston Villa', id: 3, active: 'false', team: 'Tottenham', url: bergwigngoal, scorer: 'Steven Bergwign', img: 'https://via.placeholder.com/300/2200gg/808080' }, { liked: false, description: 'Patrick Bamford breaks deadlock for Leeds United v Southampton', id: 4, active: 'false', team: 'Leeds', url: bamfordgoal, scorer: 'Patrick Bamford', img: 'https://via.placeholder.com/300/fkh544/808080' }, { liked: true, description: 'Nicolas Pepe bags brace in Arsenal win over Crystal Palace', id: 5, active: 'false', team: 'Arsenal', url: pepegoal, scorer: 'Nicolas Pepe', img: 'https://via.placeholder.com/300/ffffff/808080' }]


    const [likenum, setLikenum] = useState(null);

    //this loops through an array of videos, and returns the one who's like property = true

    let likedlist = goalvids.filter(item => (item.liked))

    //this gives a notification of the number of likes = true based on the database
    useEffect(() => {
        setLikenum(likedlist.length)
    }, [likedlist])





    return (

        <Router>
            <AuthProvider>
                <div className="App">
                    <Switch>
                        <Route exact component={ForgotPassword} path='/forgot-password' />
                        <Route exact path='/signup'>
                            <SignUp />
                        </Route>
                        <Route exact path='/login'>
                            <Login />
                        </Route>
                        {/* this separate div prevents the nav bar from showing up on the login / logout pages */}



                        <div>

                            <Nav />

                            <PrivateRoute exact path='/'><Feed goalvids={goalvids} likenum={likenum} /></PrivateRoute>
                            <PrivateRoute exact path='/user' component={user} />
                            <PrivateRoute path='/update-profile' component={UpdateProfile} />
                            <Route exact path='/table'>
                                <PremTable />
                            </Route>
                            <Route exact path='/stats'>
                                <Stats />
                            </Route>
                            <Route exact path='/likes'><Likes likedlist={likedlist} /></Route>
                            <Route path='/stats/:id' component={Playerdata} />
                            <Route path='/table/:id' component={Teamdata} />
                        </div>
                    </Switch>
                </div>
            </AuthProvider>
        </Router>

    );
}

export default App;