import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import "./feed.css";
import Carousel from "react-elastic-carousel"
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

const Videosection = ({ type, servervideos, sectiontitle, serverpics }) => {

  const { ref, inView } = useInView({ threshold: 0.5 });
  const animation = useAnimation();
  // if (type == 'Recommended') return (<>
  //   <h6>{type}</h6>
  //   <div className="videosection2">
  //     {servervideos.map(pic => (
  //       <div className="vidposting2">
  //         <Link to={`/watch/${pic.id}`}>
  //           <img
  //             key={pic.id}
  //             alt={pic.description}
  //             id="thumbnailonfeed"
  //             src={pic.thumbnail}
  //           />
  //         </Link>
  //         <div className="videodescription">{pic.description}</div>
  //       </div>
  //     ))}{" "}
  //   </div>



  // </>)

  // if (!servervideos) return <ClipLoader />

  // else if (servervideos.length === 0) return (
  //   <>
  //     <div className="videosection">
  //       <h6>{sectiontitle}</h6>

  //       <span>No {sectiontitle} Videos </span>
  //     </div>
  //   </>
  // )
  // else if (sectiontitle === 'Liked') return (
  //   <div className="videosection">
  //     <h6>{sectiontitle}</h6>


  //     <div className="reelholder">
  //       {servervideos.map(pic => (
  //         <div className="vidposting">
  //           {servervideos.length} liked video in server
  //           {/* <Link to={`/watch/${pic.id}`}>
  //             <img
  //               key={pic.id}
  //               alt={pic.description}
  //               id="thumbnailonfeed"
  //               src={pic.thumbnail}
  //             />
  //           </Link> */}
  //           <div className="videodescription">{pic.description}</div>
  //         </div>
  //       ))}{" "}
  //     </div>



  //   </div>


  // )
  useEffect(() => {
    console.log('use effect hook, inView=', inView);
    if (inView) {
      animation.start({
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring', duration: 1, bounce: 0.3
        }
      })
    }
    if (!inView) {
      animation.start({ opacity: 0.3 })
    }
  }, [inView])

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },

  ]



  return (
    <>
      <div className="videosection" ref={ref}>
        <h6>{sectiontitle}</h6>
        <motion.div className="reelholder" animate={animation} >

          <Carousel breakPoints={breakPoints} >
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
            ))}

          </Carousel>


        </motion.div>


      </div>

    </>
  );
};

export default Videosection;
