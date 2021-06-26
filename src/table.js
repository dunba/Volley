import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import './table.css'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import * as ReactBootStrap from 'react-bootstrap'


const PremTable = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const options = {
    method: "GET",
    url: 'https://v3.football.api-sports.io/standings?league=39&season=2020',
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_SECRET_KEY,
      "x-rapidapi-host":
        'v3.football.api-sports.io',
    },
  };
  const [table, setTable] = useState(null);

  useEffect(() => {
    axios
      .request(options)
      .then(response => {
        setTable(response.data.response[0].league.standings[0]);
        console.log(response.data.response[0].league.standings[0]);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <div className='flexcontainer' >

      <div className='premtable' >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {table && (
          <ReactBootStrap.Table className='innertable'>
            <thead>
              <tr colSpan="6"><th>Premier League Table</th></tr>
              <tr>
                <th></th>
                <th>Teams</th>
                <th>Played</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {table.map((club, index) => (
                <tr key={index}>
                  <td>{club.rank}.  </td>
                  <td><Link to={`/table/${club.team.id}`}><Button variant="primary" onClick={handleShow}>
                    {club.team.name}
                  </Button></Link></td>
                  <td>{club.all.played}</td>
                  <td>{club.all.win}</td>
                  <td>{club.all.lose}</td>
                  <td>{club.points}</td>
                </tr>
              ))
              }
            </tbody>
          </ReactBootStrap.Table>
        )}
      </div>
    </div>
  );
};

export default PremTable;
