import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Playerdata = ({ match }) => {
  console.log(match);
  console.log(match.params.id);
  const playerid = match.params.id;
  const [player, setPlayer] = useState("");
  const playerinfo = {
    method: "GET",
    url: "https://v3.football.api-sports.io/players",
    params: { id: playerid, season: "2020" },
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_SECRET_KEY,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
  };

  useEffect(() => {
    axios
      .request(playerinfo)
      .then(response => {
        setPlayer(response.data.response[0].player);
        console.log(response.data.response[0].player);
      })
      .catch(err => console.error(err));
  }, []);
  const history = useHistory();
  return (
    <div>
      {player && (
        <div>
          <img alt={`${player.name} portrait`} src={player.photo} />
          <h1>
            {player.firstname} {player.lastname}
          </h1>
          <h2>{player.nationality}</h2>
          <h2>{player.weight}</h2>
        </div>
      )}

      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
};

export default Playerdata;
