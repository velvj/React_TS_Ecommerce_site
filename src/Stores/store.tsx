import { configureStore, createSlice } from "@reduxjs/toolkit";


const Store = configureStore({
    reducer:{
        usersData:createSlice
    }
})

export type  RootState= ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;