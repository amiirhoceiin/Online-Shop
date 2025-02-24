import { useContext } from "react";
import { numberPurchasecontext } from "../context/numberPurchasescontext";

export function useNumberPurchase (){
    const numberPurchase =  useContext(numberPurchasecontext)
    if(numberPurchase === undefined) {
        throw new Error('eror to usecontext')
    }
    return numberPurchase;
}