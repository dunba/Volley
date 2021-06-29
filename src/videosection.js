import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import "./feed.css";
import Carousel from "react-elastic-carousel"
import { motion } from "framer-motion";

const Videosection = ({ type, servervideos, sectiontitle, serverpics }) => {


  if (type == 'Recommended') return (<>
    <h6>{type}</h6>


    <div className="videosection2">
      {servervideos.map(pic => (
        <div className="vidposting2">
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



  </>)

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

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },

  ]

  return (
    <>
      <div className="videosection">
        <h6>{sectiontitle}</h6>
        <div className="reelholder">

          <Carousel breakPoints={breakPoints}>
            {servervideos.map(pic => (
              // className = "vidposting"
              <motion.div whileHover={{ scale: 1.2 }}>
                <Link to={`/watch/${pic.id}`}>
                  <img
                    key={pic.id}
                    alt={pic.description}
                    id="thumbnailonfeed"
                    src={pic.thumbnail}
                  />
                </Link>
                <div className="videodescription">{pic.description}</div>
              </motion.div>
            ))}

          </Carousel>


        </div>


      </div>

    </>
  );
};

export default Videosection;
