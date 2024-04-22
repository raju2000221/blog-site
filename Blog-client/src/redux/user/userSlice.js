import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
            signSuccess: (state, action) =>{
                state.currentUser = action.payload;
            },

    }

})

export const {signSuccess} = userSlice.actions;
export default userSlice.reducer;