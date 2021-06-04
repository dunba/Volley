import "./App.css";
import PremTable from "./table";
import Stats from "./stats";
import Feed from './feed'
import Nav from './Nav'
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

function App() {

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
                            <PrivateRoute exact path='/' component={Feed} />
                            <PrivateRoute exact path='/user' component={user} />
                            <PrivateRoute path='/update-profile' component={UpdateProfile} />
                            <Route exact path='/table'>
                                <PremTable />
                            </Route>
                            <Route exact path='/stats'>
                                <Stats />
                            </Route>
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