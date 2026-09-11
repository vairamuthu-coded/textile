import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";
import width from "../hooks/useWindowSize";
const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  // const [posts,setPosts]=useState([])
  // const [search,setSearch]=useState('');
  // const [searchresult,setSearchResult]=useState([]);
  // const [postTitle,setPostTitle]=useState('');
  // const [postBody,setPostBody]=useState('');
  // const [editBody,setEditBody]=useState('');
  // const [editTitle,setEditTitle]=useState('');
  // const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:3001/Post1');
  // useEffect(()=>{
  //   setPosts(data);
  // },[data])

  // useEffect(()=>{
  //   const filterResult=posts.filter((post)=>((post.body).toLowerCase().includes(search.toLowerCase()))
  //   || ((post.title).toLowerCase()).includes(search.toLowerCase()))
  //   setSearchResult(filterResult.reverse());
  // },[posts,search]);

  // const handleSubmit= async (e)=>{
  //   e.preventDefault();
  //   const id=posts.length ? posts[posts.length-1].id +1: 1;
  //   const datetime=format(new Date(),'MMMM dd, yyyy pp');
  //   const newPost={id,title:postTitle,datetime, body:postBody};
  //   try{
  //     const response=await api.post('/Post1',newPost);
  //       const allPosts=[...posts,response.data];
  //       setPosts(allPosts);
  //       setPostBody('');
  //       setPostTitle('');navigate('/');
  //   }
  //   catch(err){
  //     if(err.response){
  //       console.log(`Error ${err.message}`);
  //     }
  //   }
  // }

  // const handleEdit =async(id)=>{
  //   try{
  //     const datetime=format(new Date(),'MMMM dd, yyyy pp');
  //     const updatepost={id,title:editTitle,datetime, body:editBody};
  //     const response=await api.put(`/Post1/${id}`,updatepost);
  //       setPosts(posts.map(post=>post.id===id ? {...response.data} : post));
  //       setEditBody('');
  //       setEditTitle('');
  //       navigate('/');
  //   }
  //   catch(err){
  //     if(err.response){
  //       console.log(`Error ${err.message}`);
  //     }
  //   }
  // }

  // const handleDelete= async (id)=>{
  //   try{
  //       await api.delete(`/Post1/${id}`)
  //       const deletepost= posts.filter(post=>post.id!==id);
  //       setPosts(deletepost);
  //       navigate('/');
  //   }
  //   catch(err){
  //     if(err.response){
  //       console.log(`Error ${err.message}`);
  //     }
  //   }
  // }
  return (
    <DataContext.Provider
      value={
        {
          // width,search,setSearch,searchresult,fetchError,isLoading,
          // handleSubmit, postTitle,setPostTitle,postBody,setPostBody,
          // posts,handleDelete,
          // editTitle,setEditTitle,editBody,setEditBody,handleEdit
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
