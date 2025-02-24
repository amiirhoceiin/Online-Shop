import { createContext, useReducer, useState } from "react";

export const themecontext = createContext();



export function ThemeProvider({children}){

    const [mode,setMode] = useState('light')
    const changeMode = (newmode)=>{
        setMode(newmode); 
    }
    // const themeReducer =(state,action)=>{
    //     switch(action.type){ 
    //         case 'CHANGE-MODE' : 
    //             return {...state,mode : action.payload}
    //         default : {
    //         return state
    //         }    
    //     }      
    // }
    // const [state,distpatch] = useReducer(themeReducer,{
    //     mode : 'light'}
    // )
    //  const changeMode = (mode)=>{
    //   distpatch({type:'CHANGE-MODE',payload : mode})
    //  }
     return(
        <themecontext.Provider value={{mode,changeMode}}>
        {children}
      </themecontext.Provider>
     );
}