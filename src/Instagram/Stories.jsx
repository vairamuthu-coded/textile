import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import DataContext from '../context/CreateUserContext';
import axios from 'axios';

const Stories = () => {
   const { userStories } = useSelector(store => store.auth);


   let tot=0;
   const navigate = useNavigate();

  return ( 
    <div className="container-fluid">
      <div className="d-flex flex-row" >
       <div className='text-primary d-none' ></div>
        {userStories.length >=1 && userStories.map(story => (    
          <div key={story.asptblinstapostid} className="d-flex flex-column justify-content-center align-items-center" > 
            <div className="gradient-border m-2" onClick={() => navigate(`/ViewStory/${story.asptblinstapostid}/${tot}`)}>            
              <Avatar  src={story.user.profilePicture} alt={story.user.username} className="object-fit-cover "  > U </Avatar>
              <p className="text-truncate" style={{ maxWidth: '50px' }}>{story.user.username}</p>       
          </div>   
          </div>          
       ))}          
    </div> 
  </div>  
  );
}
  
export default Stories

//https://www.google.com/search?sca_esv=5165f524d4a2def2&sxsrf=AE3TifPJrqGmtYLt6EKuvLpu5QfexggY4g:1751451469273&udm=7&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeoJTKjrFjVxydQWqI2NcOha3O1YqG67F0QIhAOFN_ob1qe64vywgsVdIjTT28-5UDOHpI7IJbq8O03gE15S7dm98EqwwZSq_XfC3NU25aWo3wOrO5AWiSALHMUhGq3-9z6duanA7cRWfzjGDm8F1G_x_5_K8neK7XNDHezBaIFJQ7e803g&q=react+js+instagram&sa=X&ved=2ahUKEwjhjKuV-Z2OAxUVxTgGHc9zIUgQtKgLegQIFBAB&biw=1264&bih=543&dpr=1#fpstate=ive&vld=cid:c953a49c,vid:2702kd5aSRQ,st:0