import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Teamdata = ({ match }) => {
  const history = useHistory();
  console.log(match);
  const teamid = match.params.id;

  const teaminfo = {
    method: "GET",
    url: "https://v3.football.api-sports.io/teams/statistics",
    params: { league: "39", season: "2020", team: teamid },
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_SECRET_KEY,
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const [teamlist, setTeamlist] = useState(null);

  useEffect(() => {
    axios
      .request(teaminfo)
      .then(response => {
        setTeamlist(response.data.response);
        console.log(response.data.response);
      })
      .catch(err => console.error(err));
  }, []);

  return (

    <div>
      {teamlist && (
        <div>
          <h1>hey</h1>
          <h2>{teamid}</h2>
          <h3>{teamlist.form}</h3>
          <h1>{teamlist.team.name}</h1>
          <img alt={`A logo of ${teamlist.team.name}`} src={teamlist.team.logo} />

        </div>
      )}
    </div>
  );
};

export default Teamdata;
