import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    email:null,
    token:null,
    role: null
};
const userSlice =createSlice({
name:'user',
initialState,
reducers:{
    setUser(state, action){
        state.email = action.payload.email,
        // localStorage.setItem("token",action.payload.token)
        state.token = action.payload.token,
        state.role = action.payload.role
    },
    removeUser(state){
        state.email = null,
        //localStorage.removeItem("token")
        state.token = null,
        state.role = null
    },
}
})
export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;