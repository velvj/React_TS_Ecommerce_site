import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Login } from './Components/Login/login';
import SignUpData from './Components/SignUp/SignUpData';
import { Products } from './Components/Pages/products';
import { CreateProductPage } from './Components/Pages/CreatePage';
import EditProduct from './Components/Pages/EditPage';
import Store from './Stores/store';


function App() {
  return (
    <Provider store={Store}>
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
    </Provider>
  );
}

export default App;
