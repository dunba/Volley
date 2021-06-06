import React, { useState } from "react";
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

const usericon = <FontAwesomeIcon icon={faUser} />

const Nav = () => {

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
    return (


        <>{error && ({ error })}
            <ReactBootstrap.Navbar className='bootnav' bg="default" expand="lg">
                <ReactBootstrap.Navbar.Brand href="#home"><h1 className='premlogo'>Clips</h1></ReactBootstrap.Navbar.Brand>
                <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                    <ReactBootstrap.Nav className="ml-auto  rightsidenav">
                        <ReactBootstrap.Nav.Link href="#"><NavLink className='linkstyle' exact to="/"><OndemandVideo /> </NavLink></ReactBootstrap.Nav.Link>
                        <ReactBootstrap.Nav.Link href="#"> <NavLink className='linkstyle' to="/stats"><FormatListNumberedIcon /> </NavLink></ReactBootstrap.Nav.Link>
                        <ReactBootstrap.Nav.Link href="#"> <NavLink className='linkstyle' to="/table"><TrendingUpIcon /> </NavLink></ReactBootstrap.Nav.Link>
                        {/* this is where the dropdown selection starts */}
                        <ReactBootstrap.NavDropdown title={usericon} id="basic-nav-dropdown" >
                            <ReactBootstrap.NavDropdown.Item href="#action/3.1"><NavLink to="/update-profile">Update Info</NavLink></ReactBootstrap.NavDropdown.Item>
                            <ReactBootstrap.NavDropdown.Item href="#action/3.3"><ReactBootstrap.Button variant="primary" onClick={handleLogout}>Log Out</ReactBootstrap.Button></ReactBootstrap.NavDropdown.Item>
                            <ReactBootstrap.NavDropdown.Divider />
                        </ReactBootstrap.NavDropdown>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar.Collapse>
            </ReactBootstrap.Navbar>

        </ >
    )
}

export default Nav