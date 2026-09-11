import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: { user:null ,suggestedUsers:[],userProfile:null,userFollowers:[],
        userFollowing:[],userStories:[]},selectedUser:null,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setSuggestedUsers:(state,action)=>{
            state.suggestedUsers=action.payload;
        },
        setUserProfile:(state,action)=>{
            state.userProfile=action.payload;
        },
        setUserFollowers:(state,action)=>{
            state.userFollowers=action.payload;
        },
        setUserFollowing:(state,action)=>{
            state.userFollowing=action.payload;
        },
        setUserStories:(state,action)=>{
            state.userStories=action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        }
    }
})
export const { setAuthUser,setSuggestedUsers,setUserProfile,setUserFollowers,
    setUserFollowing ,setUserStories,setSelectedUser} = authSlice.actions;
export default authSlice.reducer;