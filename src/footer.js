import React from 'react'
import './footer.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer>
                <div className='copyright'>Volley</div>
                <div className='sectionholder'>
                    <div>
                        <p id='navleader'>Site Navigation</p>
                        <ul className='sitenav'>
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink exact to="/stats">Stats</NavLink></li>
                            <li><NavLink exact to="/table">Table</NavLink></li>
                            <li><NavLink exact to="/user">User Account</NavLink></li>
                        </ul>
                    </div>

                    <div className='footerdivs'>
                        <p id='navleader'>Connect</p>
                        <ul className='sitenav2'>
                            <li><a target='_blank' href='https://github.com/dunba/volley'><GitHubIcon /></a></li>
                            <li><a target='_blank' href='https://linkedin.com/in/dunba'><LinkedInIcon /></a></li>
                            <li><a target='_blank' href='https://www.dunba.world'><LanguageIcon /></a></li>
                        </ul>
                    </div>
                </div>
                <div className='copyright'>© Copyright 2021 Dunba</div>
            </footer>
        </>
    )
}

export default Footer
