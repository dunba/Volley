import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';
import './feed.css'
import { useAuth } from './AuthContext'






const Nav2 = ({ loggedInUser, likenum, setLikeNum }) => {

    const currentUser = useAuth();

    return (
        <div className='headercontainer'>
            <NavLink className='secondlinkstyle' exact to="/watch"><h1><HomeIcon fontSize='large' /></h1> </NavLink>
            <h1><NavLink className='secondlinkstyle' exact to="/likes"><FavoriteBorderIcon fontSize='large' /></NavLink></h1><p id='likenumber'>{likenum}</p>
        </div>
    )
}

export default Nav2
