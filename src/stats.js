import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap'
import './stats.css'

const Stats = () => {
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

    return (
        <div className='flexcontainer'>
            {topscorers && (
                <div className='tablecontainer'>
                    <div>Select League</div>
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

                                    <tr key={index2}>
                                        <td><Link to={`/stats/${scorer.player.id}`}>{scorer.player.name}</Link >
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


            )}
        </div >
    )
}

export default Stats