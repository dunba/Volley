import React, { useState, useEffect, Button } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import "./feed.css";
import Carousel, { consts } from "react-elastic-carousel"
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const Likedvideos = ({ type, servervideos, sectiontitle, serverpics }) => {
    const { ref, inView } = useInView({ threshold: 0.3 });
    const animation = useAnimation();
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
            animation.start({ opacity: 0.5 })
        }
    }, [inView])

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 5 },
        { width: 1800, itemsToShow: 6 },
        { width: 3000, itemsToShow: 8 },

    ]
    const transition = { duration: .6, ease: [0.43, .13, -.13, .96] }


    if (servervideos.length == 0) {
        return (<div >
            <div className="videosection" ref={ref}>
                <h6>{sectiontitle}</h6>
                No Liked Videos.


            </div>

        </div>)
    }


    return (
        <div >
            <div className="videosection" ref={ref}>
                <h6>{sectiontitle}</h6>
                <motion.div className="reelholder" animate={animation} >

                    <Carousel breakPoints={breakPoints} itemsToScroll={3} >
                        {servervideos ?
                            servervideos.map(pic => (
                                <div className="vidposting"  >
                                    <Link to={`/watch/${pic.data[0].id}`}>
                                        <motion.img whileHover={{ scale: 1.1 }} transition={transition}
                                            key={pic.data[0].id}
                                            alt={pic.data[0].description}
                                            id="thumbnailonfeed"
                                            src={pic.data[0].thumbnail}
                                        />
                                    </Link>
                                    <div className="videodescription">{pic.data[0].description}</div>
                                </div>
                            )) : <ClipLoader />}

                    </Carousel>


                </motion.div>


            </div>

        </div >
    )
}

export default Likedvideos
