import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Login } from './Components/Login/login';
import SignUpData from './Components/SignUp/SignUpData';
import { Products } from './Components/Pages/products';
import { CreateProductPage } from './Components/Pages/CreatePage';
import EditProduct from './Components/Pages/EditPage';


function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <Routes> 
    <Route path='/' element={<SignUpData/>}/>   
    <Route path='/login' element={ <Login/>}/>   
    <Route path='/products' element={<Products/>}/>
    <Route path='/create' element={<CreateProductPage/>}/>
    <Route path='/products/edit/:id' element={<EditProduct/>}/>
    
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
