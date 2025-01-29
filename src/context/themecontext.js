import { createContext, useReducer } from "react";

export const themecontext = createContext();



export function ThemeProvider({children}){
    const themeReducer =(state,action)=>{
        switch(action.type){ 
            case 'CHANGE-MODE' : 
                return {...state,mode : action.payload}
            default : {
            return state
            }    
        }
    }
    
    const [state,distpatch] = useReducer(themeReducer,{
        mode : 'light'}
    )
     const changeMode = (mode)=>{
      distpatch({type:'CHANGE-MODE',payload : mode})
     }
     return(
        <themecontext.Provider value={{...state,changeMode}}>
        {children}
      </themecontext.Provider>
     );
}