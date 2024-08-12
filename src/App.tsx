import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Login } from './Components/Login/login';
import SignUpData from './Components/SignUp/SignUpData';
import { Products } from './Components/Pages/products';


function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <Routes> 
    <Route path='/' element={<SignUpData/>}/>   
    <Route path='/login' element={ <Login/>}/>   
    <Route path='/products' element={<Products/>}/>
    
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
