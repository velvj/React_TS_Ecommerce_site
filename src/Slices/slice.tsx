import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Iusers{
    firstName:string ;
    lastName:string ;
    email:string ;
    Password:string; 
    confirmPassword:string; 
    phone:number;
}

interface IuserState{
    users:Iusers[]
}


const initialState:IuserState={users:[]}

const CreateSlices =  createSlice({
    name:'sliceFIRST',
    initialState:initialState,
    reducers:{
        setUserData:(state,action:PayloadAction<Iusers>)=>{
state.users=[...state.users,action.payload]
        }
    }

})


export const {setUserData}=CreateSlices.actions;

export default CreateSlices.reducer;