import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import "./feed.css";

const Videosection = ({ servervideos, sectiontitle }) => {

  if (!servervideos) return <ClipLoader />

  else if (servervideos.length === 0) return (
    <>
      <div className="videosection">
        <h6>{sectiontitle}</h6>

        <span>No {sectiontitle} Videos </span>
      </div>
    </>
  )
  else if (sectiontitle === 'Liked') return (
    <div className="videosection">
      <h6>{sectiontitle}</h6>


      <div className="reelholder">
        {servervideos.map(pic => (
          <div className="vidposting">
            {servervideos.length} liked video in server
            {/* <Link to={`/watch/${pic.id}`}>
              <img
                key={pic.id}
                alt={pic.description}
                id="thumbnailonfeed"
                src={pic.thumbnail}
              />
            </Link> */}
            <div className="videodescription">{pic.description}</div>
          </div>
        ))}{" "}
      </div>



    </div>

  )

  return (
    <>
      <div className="videosection">
        <h6>{sectiontitle}</h6>


        <div className="reelholder">
          {servervideos.map(pic => (
            <div className="vidposting">
              <Link to={`/watch/${pic.id}`}>
                <img
                  key={pic.id}
                  alt={pic.description}
                  id="thumbnailonfeed"
                  src={pic.thumbnail}
                />
              </Link>
              <div className="videodescription">{pic.description}</div>
            </div>
          ))}{" "}
        </div>



      </div>
    </>
  );
};

export default Videosection;
