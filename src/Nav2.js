import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

import { NavLink } from 'react-router-dom';
import './feed.css'
import { useAuth } from './AuthContext'





const Nav2 = ({ loggedInUser, likenum }) => {


    const currentUser = useAuth();

    return (
        <div className='headercontainer'>
            <div className='secondlinkstyle'><NavLink exact to="/"><HomeIcon fontSize='large' /></NavLink></div>
            <div className='secondlinkstyle'> <NavLink exact to="/likes"><FavoriteBorderIcon fontSize='large' /></NavLink><p id='likenumber'>{likenum}</p></div>
            <div className='secondlinkstyle'><NavLink fontSize='large' exact to='/search'><SearchIcon /></NavLink></div>

        </div>
    )
}

export default Nav2
