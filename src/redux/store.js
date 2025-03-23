import { configureStore } from '@reduxjs/toolkit'
import themeSliceReducer from './themeSlice'
import numberPurchaseReducer from './numberPurchaseSlice'

export const store = configureStore({
  reducer: {
    numberPurchase : numberPurchaseReducer,
    theme: themeSliceReducer
  },
})