
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RightSideBar from './RightSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Suggesstion = ({user,suggestedUsers}) => {

    const [seeSuggestions, setSeeSuggestions] = useState(0);
        const [suggestions, setSuggestions] = useState(suggestedUsers);



    const handleFollow =async(asptblinstapostid,username,fol) => {  
      const listdata= suggestions.map(user => user.asptblinstapostid === asptblinstapostid ? { ...user, follow: fol === "Following" ? "Follow" : "Following" } : user);
      setSuggestions(listdata);  
    };

  return (
    <>
    <RightSideBar user={user} />
      <div className='row navbar-nav-scroll'  >
         <div className='d-flex flex-row'  >
        <div  className='col-8'>Suggestions for you</div>
         <p className='col-4' onClick={() => setSeeSuggestions(!seeSuggestions)}>See All</p>
      </div>
    
   { seeSuggestions ? <div className='spinner-border text-primary' role='status'>Loading..</div>:
      <div className='d-flex flex-column   mt-2 '>
            {suggestions.map((user) => {
          return (  
          
             <div key={user.asptblinstapostid} className='d-flex flex-row justify-content-evently p-2' >
              <Link to={`/profile/${user.asptblinstapostid}`} style={{textDecoration:"none"}}> <Avatar src={`${user.profilePicture}`} alt={user.username} className='rounded-circle' style={{ width: "20px", height: "20px" }} /></Link> 
               <div  className='col-7 ps-2' >
                 <Link to={`/profile/${user.asptblinstapostid}`} style={{textDecoration:"none"}}> <strong className='text-bg-light'>{user.username}</strong></Link>
                 </div>
                  <div  className='col-2' >
                      <a name='follow' className='text-bg-light' style={{textDecoration:"none"}}   onClick={() => handleFollow(user.asptblinstapostid,user.username,user.follow)} >{user.follow}</a>
                  </div>
              </div>
              
            )
           })}
      </div>
    }
      </div>
      </>    
  )
}

export default Suggesstion