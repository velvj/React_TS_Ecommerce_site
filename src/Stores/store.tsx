import { configureStore } from "@reduxjs/toolkit";
import CreateSlice from "../Slices/userslice";


const Store = configureStore({
    reducer:{
        usersData:CreateSlice,
    }
})

export type  RootState= ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;