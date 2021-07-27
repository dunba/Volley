import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap'
import './stats.css'
import PremTable from "./table";
import { Modal, Button } from 'react-bootstrap';
import ClearIcon from '@material-ui/icons/Clear';
import { motion, AnimatePresence } from 'framer-motion'

const Scorers = () => {
    const [topscorers, setTopscorers] = useState(null)


    const options2 = {

        method: 'GET',
        url: 'https://v3.football.api-sports.io/players/topscorers?league=39&season=2020',

        headers: {
            'x-rapidapi-key': process.env.REACT_APP_SECRET_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    };


    useEffect(() => {
        axios
            .request(options2)
            .then(response => {
                setTopscorers(response.data.response);

                console.log(response.data.response);
            })
            .catch(err => console.error(err));
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal, setShowModal] = useState(false);
    const [srcnum, setSrcNum] = useState(0)
    const modalHandler = (e) => {
        console.log(e)
        setShowModal(true)



    }

    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }
    return (
        <div className='flexcontainer'>
            {topscorers && (
                <div className='tablecontainer'>
                    <div>Select League</div>
                    <AnimatePresence exitBeforeEnter>

                        {showModal && (<motion.div variants={backdrop} exit={{ opacity: 0 }} initial='hidden' animate='visible' className='playermodal'>{topscorers[srcnum].player.name}
                            <img src={topscorers[srcnum].player.photo} /><ClearIcon onClick={() => setShowModal(false)} /></motion.div>)}
                    </AnimatePresence>
                    <ReactBootStrap.Table className='innertable'>
                        <thead>
                            <tr colSpan='4'><th>------- League Top Scorers</th></tr>
                            <tr>
                                <th>Player</th>
                                <th>Goals</th>
                                <th>Assists</th>
                                <th> G+A</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                topscorers.map((scorer, index2) => (
                                    // <Link to={`/stats/${scorer.player.id}`}>
                                    <tr key={index2}>
                                        <td><a href='#' onClick={() => { setSrcNum(topscorers.indexOf(scorer)); setShowModal(true) }}>{scorer.player.name}</a>
                                        </td>
                                        <td> {scorer.statistics[0].goals.total ?? (0)}
                                        </td>
                                        <td>{scorer.statistics[0].goals.assists ?? (0)}

                                        </td>
                                        <td>{scorer.statistics[0].goals.assists + scorer.statistics[0].goals.total ?? (0)}
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </ReactBootStrap.Table>
                </div>


            )
            }
        </div >
    )
}

export default Scorers