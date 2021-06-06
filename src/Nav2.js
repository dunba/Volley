import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';
import './feed.css'







const Nav2 = ({ likenum }) => {

    return (
        <div className='headercontainer'>
            <NavLink exact to="/"><h1><HomeIcon fontSize='large' /></h1> </NavLink>
            <h1><NavLink exact to="/likes"><FavoriteBorderIcon fontSize='large' /></NavLink></h1>{likenum ? <p id='likenumber'>{likenum}</p> : ''}
        </div>
    )
}

export default Nav2
