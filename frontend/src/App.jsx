import './App.css'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import {LoginPage, SignupPage, Home, CreateProduct, MyProducts  , Cart, ProductDetails,Profile} from './Routes/route.js';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/product" element={<CreateProduct/>}/>
      <Route path="/product/:id" element={<CreateProduct/>}/>
        <Route path="/myProduct" element={<MyProducts/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/productDetails' element={<ProductDetails/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/CreateAdress' element={<Profile/>}/>
      <Route path='/selectAdresses' element={<Profile/>}/>
      <Route path='/orderConfirmation' element={<Profile/>}/>
      <Route path='/myOrder' element={<Profile/>}/>

    </Routes>
    </BrowserRouter>  
  )
}

export default App;