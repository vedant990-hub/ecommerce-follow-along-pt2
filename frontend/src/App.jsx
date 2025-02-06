import './App.css'

import React from 'react';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import {SignupPage} from './Routes/routes.js';
import {Home, LoginPage} from "./Routes/routes.js";
import {CreateProduct,MyProducts} from "./Routes/routes.js";

const App=()=> {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/product' element={<CreateProduct/>}/>
      <Route path='/myproducts' element={<MyProducts/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App