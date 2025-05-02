import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BannerComponent from "./component/BannerComponent"
import FormComponent from "./component/FormComponent"
import SideBar from "./component/SideBar"
import Test from "./component/Test.JSX"
import LoginComponent from './component/LoginComponent';




function App() {

  
  return (
    <Router>
      <Routes>
       {/* <Route path='/' element= {<BannerComponent/>}/> */}
         <Route path='/registration' element={<FormComponent/> } />
           <Route path='/test' element= {<Test/>}/>
           <Route path='/test1' element= { <SideBar/>}/>
           <Route path='/login' element= { <LoginComponent/>}/>
    
      </Routes>
   
  
    

  
   
    </Router>
  )
}

export default App