import React from 'react'
import './footer.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
const Footer = () => {
    return (
        <>
            <footer>
                <div className='copyright'>Volley</div>
                <div className='sectionholder'>
                    <div>
                        <p id='navleader'>Site Navigation</p>
                        <ul className='sitenav'>
                            <li>Home</li>
                            <li>Stats</li>
                            <li>Table</li>
                            <li>User Account</li>
                        </ul>
                    </div>

                    <div className='footerdivs'>
                        <p id='navleader'>Connect</p>
                        <ul className='sitenav2'>
                            <li><GitHubIcon /></li>
                            <li><LinkedInIcon /></li>
                            <li><LanguageIcon /></li>
                        </ul>
                    </div>
                </div>
                <div className='copyright'>© Copyright 2021 Dunba</div>
            </footer>
        </>
    )
}

export default Footer
