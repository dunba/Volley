import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import "./stats.css";
import PremTable from "./table";
import Scorers from "./scorers";

const Stats = () => {
  const [topscorers, setTopscorers] = useState(null);

  const options2 = {
    method: "GET",
    url: "https://v3.football.api-sports.io/players/topscorers?league=39&season=2020",

    headers: {
      "x-rapidapi-key": process.env.REACT_APP_SECRET_KEY,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
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
  const [renderedState, setRenderedState] = useState("scorers");

  return (
    <div className="flexcontainer">
      <div className="statsheader">
        Headers
        <button onClick={() => setRenderedState("table")}>Table</button>
        <button onClick={() => setRenderedState("scorers")}>Scorers</button>
      </div>
      <div className="displayedstats">
        {renderedState === "table" && <PremTable />}

        {renderedState === "scorers" && <Scorers />}
      </div>
    </div>
  );
};

export default Stats;
