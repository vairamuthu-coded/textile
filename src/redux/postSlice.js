import { createSlice } from "@reduxjs/toolkit";
const postSlice=createSlice({
    name:'post',
    initialState:{posts:[],selectedPost:null},
    reducers:{
        setPosts:(state,action)=>{
            state.posts=action.payload;
        },
        setSelectedPost:(state,action)=>{
            state.selectedPost=action.payload;
        },      
         setCommand:(state,action)=>{
            state.command=action.payload;
        },    

    }
});
export const {setPosts,setSelectedPost,setCommand}=postSlice.actions;
export default postSlice.reducer;