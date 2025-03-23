import { createSlice } from "@reduxjs/toolkit";


export const numberPurchaseSlice = createSlice({
    name : "numberPurchase",
    initialState : {
        value : 0,
    },
    reducers : {
        increament : (state)=>{
          state.value +=1;
        },
    }
})

export const {increament} = numberPurchaseSlice.actions
export default numberPurchaseSlice.reducer 