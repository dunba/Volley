import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useRef } from "react";
import './feed.css'

import Video from './video'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';


//this main feed displays video & information from database
const Feed = () => {



  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();
  const history = useHistory();

  const rudigergoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Antonio%20Rudiger%20gives%20Chelsea%20crucial%20lead%20over%20Leicester%20City%20%20Premier%20League%20%20NBC%20Sports.mp4?alt=media&token=e3f810e0-0e31-4fd9-badc-4a4750fe639a'
  const cavanigoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Edinson%20Cavani%20gives%20Manchester%20United%20lead%20v%20Fulham%20in%20style%20%20Premier%20League%20%20NBC%20Sports.mp4?alt=media&token=6b5c4466-be28-42cc-b33f-9830c8b84002'
  const torresgoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Ferran%20Torres%20scorpion%20kick%20puts%20Manchester%20City%20ahead%20of%20Newcastle%20%20Premier%20League%20%20NBC%20Sports.mp4?alt=media&token=67e40cbd-71ae-4d38-b2e1-329bdaeab913'
  const bergwigngoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Steven%20Bergwijn%20slams%20Spurs%20into%20the%20lead%20v%20Aston%20Villa%20%20Premier%20League%20%20NBC%20Sports_720p.mp4?alt=media&token=02e67788-6afa-4100-8307-876fbfe631de'

  const bamfordgoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Patrick%20Bamford%20breaks%20deadlock%20for%20Leeds%20United%20v%20Southampton%20%20Premier%20League%20%20NBC%20Sports.mp4?alt=media&token=dd615309-4fcc-474a-89da-a2e14284a3f1'
  const pepegoal = 'https://firebasestorage.googleapis.com/v0/b/premier-league-809fb.appspot.com/o/Nicolas%20Pepe%20bags%20brace%20in%20Arsenal%20win%20over%20Crystal%20Palace%20%20Premier%20League%20%20NBC%20Sports_720p.mp4?alt=media&token=99137465-448b-4a01-b323-720bae602cda'
  const goals = [rudigergoal, cavanigoal]
  const goalvids = [{ liked:true, description: 'Antonio Rudiger gives Chelsea crucial lead over Leicester City ', id: 0, active: 'true', team: 'Chelsea', url: rudigergoal, scorer: 'Antonio Rudiger', img: 'https://via.placeholder.com/300.png/09f/fff' }, {liked:true, description: 'Edinson Cavani gives Manchester United lead v Fulham in style ', id: 1, active: 'false', team: 'Manchester United', url: cavanigoal, scorer: 'Edinson Cavani', img: 'https://via.placeholder.com/300/12ds5a/808080' }, { liked:false, description: 'Ferran Torres scorpion kick puts Manchester City ahead of Newcastle', id: 2, active: 'false', team: 'Manchester City', url: torresgoal, scorer: 'Ferran Torres', img: 'https://via.placeholder.com/300.png/0s06dsf/fff' }, {liked:false, description: 'Steven Bergwijn slams Spurs into the lead v Aston Villa', id: 3, active: 'false', team: 'Tottenham', url: bergwigngoal, scorer: 'Steven Bergwign', img: 'https://via.placeholder.com/300/2200gg/808080' }, { liked:true, description: 'Patrick Bamford breaks deadlock for Leeds United v Southampton', id: 4, active: 'false', team: 'Leeds', url: bamfordgoal, scorer: 'Patrick Bamford', img: 'https://via.placeholder.com/300/fkh544/808080' }, {liked:false, description: 'Nicolas Pepe bags brace in Arsenal win over Crystal Palace', id: 5, active: 'false', team: 'Arsenal', url: pepegoal, scorer: 'Nicolas Pepe', img: 'https://via.placeholder.com/300/ffffff/808080' }]


  const [videos, setVideos] = useState(goalvids)
  const pointeroption = { cursor: 'pointer' }


  const [idnumber, setIdnumber] = useState(0);
  const [currentvid, setCurrentVid] = useState(goalvids[idnumber])

  const onFastforward = () => {
    setIdnumber(idnumber + 1)
    console.log('hey!')
  }

//this handles the playlist picture gallery, retrieves info from the DOM
  const clickHandler = (e) => {
    console.log(e)
    console.log(videos)
    console.log(e.target.attributes[0].value)
    setIdnumber(e.target.attributes[0].value)
    // console.log(currentvid)
    setCurrentVid(goalvids[idnumber])
  }

   
  
  //this section handles the like button on the side and top panel
  const [isliked, setIsLiked] = useState(false);
  const totallikes=[];
  const [likenum,setLikenum]=useState(0);
  const [likedvids,setLikedVids]=useState(null)

// this function handles the state once the like button is pressed
  const likeHandler = () => {
    if (isliked) {
      setIsLiked(false);
      console.log('unliked')
    } else {
      setIsLiked(true);
      console.log('liked')
      totallikes.push('1 like')      
      console.log(totallikes)
    }
  }
//this loops through an array of videos, and returns the one who's like property = true
  const likedlist=goalvids.filter(item=>(item.liked))
  console.log(likedlist);

useEffect(() => {
setLikenum(likedlist.length)
}, [likedlist])












  //this secion controls the state of the home page and liked videos.
  const [ishome,setIshome]=useState(true);
  const[isonlike,setIsonlike]=useState(false)


  //this function is to set the state of the timeline. between liked and home feed
  const TimelineSwitch =()=>{
    if(ishome){
      setIsonlike(false);
    }else{
    setIsonlike(true);
    setIshome(false);
  }}


  return (
    <div className='flexcontainer'>
      <div className='headercontainer'><h1><HomeIcon fontSize='large' /> <FavoriteBorderIcon fontSize='large' /></h1>{likenum?<p id='likenumber'>{likenum}</p>:''} </div>
    
      <div className='mediacontainer'>
        <div className='picholder'>
          Playlist<div className='sidepanelholder'>
            {goalvids.map(pic => (<div className='sidepanel'><img onClick={clickHandler} mycustomattribute={pic.id} id='thumbnail' src={pic.img} />
              <div class="overlay">
                <div class="text">{pic.scorer}</div>
              </div></div>

            ))}

          </div>
        </div>

        <div className='videoholder'>

          <div>
            <Video team={currentvid.team} url={currentvid.url} scorer={currentvid.scorer} /></div>
        </div>
        <div className='videosidebar'>
          <div>
            <p>{currentvid.description}</p>

            <div className='sidebar_icons'>

              <div className='social_controls'>
                {isliked ? <FavoriteIcon id='iconn' onClick={likeHandler} fontSize='large' /> : <FavoriteBorderIcon onClick={likeHandler} id='iconn' fontSize='large' />}

                <ShareIcon id='iconn' fontSize='large' />
                <CommentIcon id='iconn' fontSize='large' />
                <ExpandMoreIcon id='iconn' onClick={onFastforward} fontSize='large' />
              </div>
            <div>
           <h2>{currentvid.scorer}</h2>
            <h2>{currentvid.team}</h2>
            </div>

            </div>


          </div>
        </div>
      
      </div>
      
    </div>



  )
};
export default Feed;
