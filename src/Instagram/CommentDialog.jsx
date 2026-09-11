import { Avatar, Dialog, DialogContent } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { HiDotsHorizontal } from "react-icons/hi";
import { useRenderQueue } from '@react-pdf-viewer/core';
import { Bs0Circle, BsThreeDots } from 'react-icons/bs';

import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts,setSelectedPost} from '../redux/postSlice';
import axios from 'axios';
import DataContext from '../context/CreateUserContext';
import { toast } from 'react-toastify';
const  CommentDialog = ({open,setOpen,post}) => {

      const { API_URL, colorValue } = useContext(DataContext);
      const insert = API_URL+"/InstaPosts";
            const instaComments = API_URL+"/InstaComments";
   const {selectedPost,posts}=useSelector(store=>store.post) 
  const {user}=useSelector(store=>store.auth) 
 
    const [showChild,setShowChild]=useState(false)
      const handleChildClose = () => setShowChild(false);
      const handleChildShow = (() =>{setShowChild(true); });
      const dispatch=useDispatch();
      const [comment,setComment]=useState([])
  const [msgText,setMsgText]=useState();
  const ChangeEventHandle=(e)=>{
    const {name,value}=e.target;   
    if(value != ""){
        setMsgText(value)
    }
    else{
        setMsgText("")
    }
    
  }

  useEffect(()=>{
          //   const res = axios.get(`${instaComments}`);
          // if (res.data !== "") {
          //   res.data.map((c)=>{
          //   const updatedCommentData = [
          //     ...comment,
          //     { user: c.username, comment: c.comments },
          //   ];
          //   setComment(updatedCommentData);
          //   const updatedPostData = posts.filter(p => 
          //     p.asptblinstapostid === res.data.posts
          //       ? { ...p, comments: updatedCommentData }
          //       : p
          //   );           
          //   dispatch(setPosts([updatedPostData]));      
           
          //   })
          // }

    if(selectedPost){
      setComment(selectedPost.comments)
    }
  },[selectedPost])

  const sendMessageHandle=async(sendid)=>{      
      try{

  const formdata = {
    asptblinstacommentid:0,
    username:user.username,
    id: user.asptblinstauserid,
    comments: msgText,
    author: user.username,
    posts: sendid,
    eventname:'comments',      
      
      };         
     
         const res=  await axios.post(`${instaComments}`,formdata); 
         if(res.data.asptblinstacommentid>0)
         {   
            // const updatedCommentData=[...{user:user.username, comment:msgText}] ;
              // setComment(updatedCommentData);               
                 const updatedPostData=posts.map(p=>p.asptblinstapostid===res.data.posts ? 
                  {...p, comments:[...p.comments,{user:res.data.username, comment:res.data.comments}]}  : p)  
                      dispatch(setPosts(updatedPostData)) 
               setMsgText('')
            toast.success("Comments Added  : " + post.asptblinstapostid);
         }

      }
      catch(ex){


      }finally{

      }
    
   
  }



  return (

      <Modal key={post.asptblinstapostid} show={open} onHide={()=>setOpen(false)}>
         <Modal.Header closeButton>
                          <Modal.Title>Comments {post.asptblinstapostid}</Modal.Title>
       </Modal.Header>
     <div className='d-flex flex-column align-content-between w-100  p-2 ' >      
        <div className='d-flex flex-row align-content-between w-100  pe-2' >      
        <div className='d-flex flex-column  w-25'>          
              <img src={post.images} />  
        </div>                        
        <div className='d-flex flex-column  w-75 ' style={{height:"250px",overflow:"auto"}}>
                <div className='d-flex flex-row align-content-between w-100 '>    
                   
                    <Link ><Avatar src={user.profilePicture}></Avatar></Link>
                    <div className=' pe-3 '>
                       <span  className=''>{post.user?.username}</span>
                    </div>      
                    <div className="ms-auto p-2"  onClick={()=>setShowChild(true)}> <BsThreeDots  />  </div>             
                </div>   
                      <div className='d-flex flex-column p-2' >
        {            
           post?.comments.map((comment)=> <Comment key={comment.asptblinstapostid}  comment={comment}/>)
        }
        </div>
         </div>
        </div>    
       
          
        <div className='d-flex w-100 h-25 overflow-auto' >              
                 <Modal show={showChild} onHide={()=>setShowChild(setShowChild)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                         <Modal.Body className='d-flex flex-column align-items-center  '>
                              <Button variant='ghost' className='strong'>   UnFollow          </Button>
                              <Button variant='ghost' className='strong'>   Add Favourites    </Button>
                              <Button variant='ghost' className='strong'>   Delete            </Button>
                                    
                         </Modal.Body>
                </Modal>
        </div>
        
       
        <div className='p-4' >
            <div className='d-flex align-items-center gap-2'>
                <input type='text' name='msgtext' value={msgText} onChange={ChangeEventHandle} placeholder='add comments..' style={{color:"gray"}}  className='w-100 p-1'></input>
                    <Button disabled={!msgText ? true : false} onClick={()=>sendMessageHandle(post.asptblinstapostid)} >Send</Button>
            </div>
        </div>
  
        </div>
      </Modal>
      
  )
}

export default CommentDialog