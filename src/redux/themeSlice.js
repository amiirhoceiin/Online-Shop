import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  };

export const themeSlice = createSlice({
    name : "theme",
    initialState : {
        mode :getInitialTheme(),
    },
    reducers : {
        changeMode: (state, action) => {
            state.mode = action.payload; 
            localStorage.setItem('theme', action.payload); 
            document.body.className = action.payload; 
    }}

})

export const {changeMode} = themeSlice.actions

export default themeSlice.reducer