import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    accessToken : null,
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
            accessToken: (state, action) =>{
                state.accessToken = action.payload;
            },
            signSuccess: (state, action) =>{
                state.currentUser = action.payload;
            },
            updateSuccess: (state, action) =>{
                state.currentUser = action.payload;
            },
            deleteSuccess: (state, action) =>{
                state.currentUser = action.payload;
            },
            signOutSuccess: (state, action) =>{
                state.currentUser = null;
            }

    }

})

export const {signSuccess,updateSuccess,deleteSuccess,signOutSuccess,accessToken} = userSlice.actions;
export default userSlice.reducer;