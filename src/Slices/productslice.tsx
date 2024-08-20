import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Iproduct,IproductState} from '../Components/Interfaces';



const initialState:IproductState={
    products:[{
        productName:'',
        category:'',
        price:0,
        qty:1,
        createdAt:0,
        imageFileName:''
    }]
}

const ProductSlice = createSlice({
    name:'products',
    initialState:initialState,
    reducers:{
        setProductData:(state,action:PayloadAction<Iproduct>)=>{
            state.products=[...state.products,action.payload]
        }
    }
    
})

export const {setProductData}= ProductSlice.actions;
export default ProductSlice.reducer;