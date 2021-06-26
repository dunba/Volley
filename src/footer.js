import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <>
            <footer>
                <div className='sectionholder'>
                    <section>
                        <h5>Site Navigation</h5>
                        <ul className='sitenav'>
                            <li>Home</li>
                            <li>Stats</li>
                            <li>Table</li>
                            <li>User Account</li>
                        </ul>
                    </section>

                    <section>
                        <h5>Connect</h5>
                        <ul className='sitenav'>
                            <li>github</li>
                            <li>linkedin</li>
                            <li>website</li>
                            <li>email</li>
                        </ul>
                    </section>
                </div>
                <div className='copyright'>copyright 2021 dunba</div>
            </footer>
        </>
    )
}

export default Footer
