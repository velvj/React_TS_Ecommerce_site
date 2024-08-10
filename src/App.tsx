import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Login } from './Components/login';
import SignUpData from './Components/SignUp/SignUpData';


function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <Routes> 
    <Route path='/' element={<SignUpData/>}/>   
    <Route path='/login' element={ <Login/>}/>   
    
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
