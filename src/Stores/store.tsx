import { configureStore } from "@reduxjs/toolkit";
import CreateSlice from "../Slices/userslice";
import productslice from "../Slices/productslice";

const Store = configureStore({
    reducer:{
        usersData:CreateSlice,
        productsData:productslice
    }
})

export type  RootState= ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;