import './App.css'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import {LoginPage,SignupPage} from './Routes/routes.js';
import{Home} from "./Routes/routes.js";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>}></Route>
    </Routes>
    </BrowserRouter>  
  )
}

export default App;