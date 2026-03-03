import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import DataContext from '../context/CreateUserContext';
import { useDispatch } from 'react-redux';
import { setPosts } from '../redux/postSlice';
import { toast } from 'react-toastify';

const useGetAllPost = (url) => {
  const dispatch = useDispatch(); 

 useEffect(() => {
   const fetchAllPost = async () => {
      try {
       const res= await axios.get(`${url}`);     
       if(res.statusText=="OK" && res.data !== null && res.data.length>0) {
        
          const posts = res.data.map(post => ({

            ...post,asptblinstapostid: post.asptblinstapostid,
              id: post.id,
              caption: post.caption,               
              images: post.profilePicture,           
              user: { userid: post.id, username: post.username, profilePicture: post.profilePicture },
              likes: post.likes,
              posts: [{ asptblinstapostid: post.asptblinstapostid, username: post.username, post: post.comments }],
              comments: [{ user: post.username, comment: post.comments  }]
             
          }));
          dispatch(setPosts(posts));
        } 
      } catch (error) {
       
      }
    };
    fetchAllPost();
  }, []);
};
export default useGetAllPost;

            //      "post": post.post
            //  }],
            // comments: post.comments [   
            //      {
            //         "user": post.user.username,
            //         "comment": post.comments || ""  
            //       }
                  
            // ]
         
    



