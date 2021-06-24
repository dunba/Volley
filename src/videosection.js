import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import "./feed.css";

const Videosection = ({ servervideos, sectiontitle }) => {
  return (
    <>
      <div className="videosection">
        <h6>{sectiontitle}</h6>

        {servervideos ? (
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
        ) : (
          <ClipLoader />
        )}
      </div>
    </>
  );
};

export default Videosection;
