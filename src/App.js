import React, {createContext,useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreatePost from "./pages/CreatePost"
import Navbar from "./components/Navbar"
import {Container} from '@mui/material'
import UpdatePost from "./pages/UpdatePost"

export const AuthContext = createContext();

const App=()=>{
  const [refresh, setRefresh] = useState(false)
  const[auth, setAuth] = useState(null);

  return(
    <AuthContext.Provider value={{auth,setAuth,refresh,setRefresh}}>
        <BrowserRouter>
        <Navbar/>

        <Container sx={{p:1,mt:12}}>

          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/create' element={<CreatePost/>}/>
              <Route path='/update/:id' element={<UpdatePost/>}/>
          </Routes>

        </Container>

        </BrowserRouter>
    </AuthContext.Provider>
  )
}
export default App

