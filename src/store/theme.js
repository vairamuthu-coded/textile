import {createSlice} from '@reduxjs/toolkit'
const themeSlice=createSlice({
    name:"theme",
    initialState:{color:'red'},
    reducers:{
        changeColor(state,action)   {       
            state=action.payload  
        },
    }
});
export const {changeColor}= themeSlice.actions;
export default themeSlice.reducer;
//https://www.youtube.com/watch?v=P_C4TsFyJmg