import React, { useState, useEffect } from "react";
import './nav.css'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "./AuthContext";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import * as ReactBootstrap from 'react-bootstrap'
import { OndemandVideo } from "@material-ui/icons";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

const Nav = ({ likenum }) => {

    const { logout } = useAuth();
    const [error, setError] = useState(null);
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to logout");
            ReactBootstrap.Alert('Failed To Log Out')
            console.log("Failed to logout");
        }
    }

    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const expandNav = () => {
        setIsNavExpanded(true);
    }
    const closeNav = () => {
        setTimeout(() => setIsNavExpanded(false), 4000)
    }

    useEffect(() => {
        setIsNavExpanded(false);
    }, [])

    const humanicon = document.getElementById('iconlistener')



    return (


        <>{error && ({ error })}
            {/* <ReactBootstrap.Navbar className='bootnav' bg="default" expand="lg">
                <ReactBootstrap.Navbar.Brand ><h1 className='premlogo'>Volley</h1></ReactBootstrap.Navbar.Brand>
                <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                    <ReactBootstrap.Nav className="ml-auto  rightsidenav">
                        <ReactBootstrap.Nav.Link href="#"><NavLink className='linkstyle' exact to="/"><OndemandVideo /> </NavLink></ReactBootstrap.Nav.Link>
                        <ReactBootstrap.Nav.Link href="#"> <NavLink className='linkstyle' to="/stats"><FormatListNumberedIcon /> </NavLink></ReactBootstrap.Nav.Link>
                        <ReactBootstrap.Nav.Link href="#"> <NavLink className='linkstyle' to="/table"><TrendingUpIcon /> </NavLink></ReactBootstrap.Nav.Link>
                   
                        <ReactBootstrap.NavDropdown title={usericon} id="basic-nav-dropdown" >
                            <ReactBootstrap.NavDropdown.Item href="#action/3.1"><NavLink to="/update-profile">Update Info</NavLink></ReactBootstrap.NavDropdown.Item>
                            <ReactBootstrap.NavDropdown.Item href="#action/3.3"><ReactBootstrap.Button variant="primary" onClick={handleLogout}>Log Out</ReactBootstrap.Button></ReactBootstrap.NavDropdown.Item>
                            <ReactBootstrap.NavDropdown.Divider />
                        </ReactBootstrap.NavDropdown>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar.Collapse>
            </ReactBootstrap.Navbar> */}
            <nav>
                <div className='navholder'>


                    <div className='linkstyle'><NavLink className='linkstyle' exact to="/">Volley </NavLink></div>
                    <div className='headercontainer'>
                        <div className='secondlinkstyle'><NavLink exact to="/"><HomeIcon fontSize='large' /></NavLink></div>
                        <div className='secondlinkstyle'> <NavLink exact to="/likes"><FavoriteBorderIcon fontSize='large' /></NavLink><p id='likenumber'>{likenum}</p></div>
                        <div className='secondlinkstyle'><NavLink fontSize='large' exact to='/search'><SearchIcon /></NavLink></div>

                    </div>
                    <div className='navdiv'>
                        <ul className='navlist'>    <li><NavLink className='linkstyle' exact to="/"><OndemandVideo /> </NavLink></li>
                            <li><NavLink className='linkstyle' to="/stats"><FormatListNumberedIcon /> </NavLink></li>
                            <li><NavLink className='linkstyle' to="/table"><TrendingUpIcon /> </NavLink></li>
                            <li className='linkstyle'><PersonIcon id='iconlistener' onMouseOver={expandNav} onMouseOut={closeNav} /></li>
                        </ul>

                    </div>

                </div>
                {isNavExpanded ? <div className='account'>
                    <ul >
                        <li  ><NavLink exact to="/update-profile" >Account</NavLink></li>
                        <li onClick={handleLogout}><a href='#'>Sign Out</a></li>
                    </ul>

                </div> : ''}


            </nav>
        </ >
    )
}

export default Nav