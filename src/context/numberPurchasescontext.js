import { Children, createContext,useState } from "react";

export const numberPurchasecontext = createContext();

export function NumberPurchaseProvider ({children}){
  
   const [numberPurchase,setNumberPurchase] = useState(0);
   const changeNumberPurchase = ()=>{
    setNumberPurchase(numberPurchase+1);
   }


    return(
        <numberPurchasecontext.Provider value={{numberPurchase,changeNumberPurchase}}>
            {children}
        </numberPurchasecontext.Provider>
    )
}