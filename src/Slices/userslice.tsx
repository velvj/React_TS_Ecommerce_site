import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {Iusers,IuserState} from '../Components/Interfaces';

// interface Iusers {
//     firstName:string ;
//     lastName:string ;
//     email:string ;
//     Password:string; 
//     confirmPassword:string; 
//     phone:number;
// }

// interface IuserState{
//     users:Iusers[]
// }

let initialState:IuserState = {
  users :[{firstName:'',
    lastName:'',
email:'',
Password:'',
confirmPassword:'',
phone:0}] 
}




// const initialState={users:[]}

const CreateSlices =  createSlice({
    name:'sliceFIRST',
    initialState:initialState,
    reducers:{
        setUserData:(state,action:PayloadAction<Iusers>)=>{
state.users =   [...state.users,action.payload]
        },
        clearUserData:(state)=>{
            return initialState
        }
    }

})


export const {setUserData}=CreateSlices.actions;

export default CreateSlices.reducer;