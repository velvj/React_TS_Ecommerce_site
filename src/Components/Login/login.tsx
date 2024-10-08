import React, { useEffect, useReducer } from "react";
import { Container, TextField, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../Services/AxiosInstance";
import { useSelector } from "react-redux";
import {RootState} from "../../Stores/store";

type StateType = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: StateType = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean }
  | { type: "RESET" };

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Login:React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {users} = useSelector((state:RootState)=>state.usersData)
  console.log(">>>userData:",users)

  const navigate = useNavigate();

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({ type: "setIsButtonDisabled", payload: false });
    } else {
      dispatch({ type: "setIsButtonDisabled", payload: true });
    }
  }, [state.username, state.password]);

  //get user details
   const getUserList=async(email:string,password:string)=>{
    const response= await AxiosInstance.get('/UsersList')
    console.log('response data>>>login',response.data)
   let userDataAuth= response.data.find((ele:any)=>{
    if(ele.email === email && ele.Password === password){
      return true
    }else{
      console.log("user name doesn't exist")
      return false
    }
   })
   return userDataAuth;
 
   }

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };
  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    let userAuth=await getUserList(state.username,state.password)

    if (userAuth) {
      dispatch({
        type: "loginSuccess",
        payload: "login Successfully",
      });

      alert("login successfully");
      navigate("/products");
    } else {
      dispatch({
        type: "loginFailed",
        payload: "Incorrect Username or Password",
      });
      alert("Incorrect Username or Password");
    }
    console.log("username:", state.username, "password:", state.password);
    dispatch({ type: "RESET" });
  };
  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={state.isError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="user name"
              name="username"
              autoFocus
              value={state.username}
              onChange={handleUsernameChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="password"
              value={state.password}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              // onClick={}
              disabled={state.isButtonDisabled}
            >
              Sign In{" "}
            </Button>
          </Box>
        </Box>
      </Container>
      <div className="d-flext">
        {users?.map((ele,index)=>{
          return (
            <div key={index}>
   <ul className="list-inline mx-auto justify-content-center"> 
        <li className="list-inline-item">{ele.firstName}</li>
        <li className="list-inline-item">{ele.lastName}</li>
        <li className="list-inline-item">{ele.email}</li>
        <li className="list-inline-item">{ele.Password}</li>
        <li className="list-inline-item">{ele.confirmPassword}</li>
        <li className="list-inline-item">{ele.phone}</li>
        </ul>
            </div>
          )
        })}
     
      </div>
    </>
  );
};

export { Login };
