
import { Avatar } from '@mui/material'

import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import useGetSuggestedUser from '../hooks/useGetSuggestedUser'
import { Badge, Button } from 'react-bootstrap'
import { FiAtSign, FiMessageCircle } from "react-icons/fi";

import { Hearts } from 'react-loading-icons'
import { HiHeart } from 'react-icons/hi'
import styled from "styled-components"
import { MdCircle, MdOutlineAddShoppingCart, MdOutlineFavoriteBorder, MdOutlineSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios'
import { setUserProfile } from '../redux/authSlice'
import DataContext from '../context/CreateUserContext'
import SideBar from './SideBar'

 

const Info=styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container=styled.div`
   flex: 1;
  margin: 5px;
  // width: 100%;
   height: 150px;
 display: flex;
  align-items: center;
 justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle=styled.div`
  width: 50%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image=styled.img`
 height:100%; width:auto;
 z-index:2;
`;


const Icon=styled.div`
width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
   display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }

`;

const Profile = () => {
      const { urls,API_URL,defaultDetails } = useContext(DataContext);

            const { userProfile, userFollowers, userFollowing, user,selectedUser } = useSelector(store => store.auth);

const isLoggedProfile= defaultDetails.UserId === user.asptblinstauserid;
const isFollowing=false;

const[activeTab,setActiveTab]=useState('posts');

const handleTabChanged=(tab)=>{
  setActiveTab(tab)
}

const dispatch=useDispatch();
const navigate=useNavigate();
const displayedPost=activeTab==='posts' ? userProfile[0]?.posts : userProfile[0]?.bookmarks;


  return (
      <div className="container-fluid pt-2 " >     
       <div className="row" >   
        <div className='col-md-2' >
       <SideBar  urls={urls} user={user}/>
          </div> 
      {userProfile.map(item=>{ 
       return  <div className='col-md-6'   >
                  <div className='row'  >      
                   <div className='col-sm-3 col-md-2'  > 
                          <img src={item.profilePicture}  />   
                   </div>          
                     <div className='col-sm-3 col-md-3'  > 
                          <span>{item.username} {defaultDetails.UserId}</span>  
                   </div>     
                    
                   <div className='col-sm-3 col-md-7' >
                    <section  >   
                         
                            {isLoggedProfile===true ? (
                                <>
                          <Link className="col-sm-4 col-md-4  btn-info" to={'/EditProfile'} > <button  className="col-sm-6 col-md-12  btn-info" >add Profile</button></Link> 
                            <button  className="col-sm-4 col-md-4  btn-warning"> Archive</button>
                            <button  className="col-sm-4 col-md-4  btn-danger"> Tools</button>
                                </>
                            ) : (
                                isFollowing ? (
                                    <>
                                <span  className="col-sm-1 col-md-2 btn btn-danger">Un Follow</span>
                                <span  className="col-sm-1 col-md-2 btn btn-danger">Message</span>
                                </>
                                ) : (
                                <span className="col-sm-1 col-md-2 btn btn-danger">Follow</span>
                                )
                                )}   
                    </section>  
                       <div className='d-flex flex-row justify-content-evenly' >                         
                             <p>  <span className="col-sm-1 col-md-4 fw-semibold">{userProfile[0]?.posts.length}</span>Posts</p>
                            <p><span className="col-sm-1 col-md-4  fw-semibold "> {userProfile[0]?.followers.length} </span> Followers</p>
                            <p><span className="col-sm-1 col-md-4  fw-semibold ">{userProfile[0]?.following.length}</span>Following</p>                       
                        </div>
                       <div className='d-flex flex-column' style={{backgroundColor:"whitesmoke"}} >
                        <span className='fw-semibold '>{item.bio || 'User Bio'}</span>
                         <Badge className='object-fit-contain ' variant="secondary"><FiAtSign /> <span className='p-1'>{item.username  || 'User Bio'}</span></Badge>
                          <span>learn code with mernstack style</span>
                          <span>learn code with mernstack style</span>
                          <span>learn code with mernstack style</span>
                       </div>  
                    </div>
                          
                  </div>   
                  <div className='row'  >       
                  <div className='col-md-12' >
                    <hr></hr>
                    
                     <div className='d-flex flex-row justify-content-evenly'  >
                      <span className={activeTab ==='posts' ? "fw-semibold" : "fw-light"} onClick={()=>handleTabChanged('posts')}>POSTS</span>
                       <span className={activeTab ==='saved' ? "fw-semibold " : "fw-light"} onClick={()=>handleTabChanged('saved')}>SAVED</span>
                       <span className={activeTab ==='reels' ? "fw-semibold" : "fw-light"} onClick={()=>handleTabChanged('reels')}>REELS</span>
                       <span className={activeTab ==='tags' ? "fw-semibold" : "fw-light"} onClick={()=>handleTabChanged('tags')}>TAGS</span>
                       </div>
                      
                       <div className='container-fluid'>
                       <div className='row'>
                         <div className={activeTab === 'posts' ? "content active-content" : "content"} > 
                       <div className='col-md-12' style={{height:"300px", overflow:"auto"}}>
                        {                          
                          displayedPost.map((post,index)=>{ 
                            return( 
                            
                                 <Container key={post.asptblinstapostid} >
                              <Circle/>
                                  <Image src={post.profilePicture} style={{'z-index':'2'}} />                                    
                                    <Info>    
                                      <Icon ><span className='fw-bold'> {userProfile[0].likes}</span><HiHeart> </HiHeart></Icon>
                                      <Icon onClick={()=>navigate(`/Profile/${post.asptblinstapostid}`)}><FaEdit></FaEdit></Icon>
                                      <Icon><span className='fw-bold'> {userProfile[0].comments.length}</span><FiMessageCircle>      </FiMessageCircle></Icon>
                                    </Info>
                                   </Container>
                            ) 
                          })
                        
                        }
                        
                        </div>
                        </div>
                         <div className={activeTab === 'saved' ? "content active-content" : "content"} > 
                          <div className='col-md-4'>
                            saved
                            </div>
                            </div>
                             <div className={activeTab === 'reels' ? "content active-content" : "content"} > 
                              <div className='col-md-4'>
                                reels
                            </div>
                            </div>
                                 <div className={activeTab === 'tags' ? "content active-content" : "content"} > 
                              <div className='col-md-4'>
                                tags
                            </div>
                            </div>
                            </div>
                            </div>
                   </div>
                  </div>
          

      
   
    </div>
     })}  
      <div className='col-md-2' >right</div> 
    </div>
   </div>
       
  ) 
}

export default Profile
