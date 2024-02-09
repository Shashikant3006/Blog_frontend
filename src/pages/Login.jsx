import React ,{useContext,useState} from 'react';
import {Card, CardContent, Typography,TextField,Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../App'
// import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login=()=>{
    const [user, setUser] = useState({email:"",password:""})
    // const [email, password] = useState();

    const navigator = useNavigate()

    const {setRefresh}=useContext(AuthContext);
 
 
 const handleChange=(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        setUser({...user, [name]: value})
 }



    const handleSubmit = async () => {
        console.log(user);
        try {
            const res = await fetch("https://shashikant-blog-api2.onrender.com/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                setRefresh(true);
                navigator("/");
            } 
            else {
                if (data.error === "invalid_credentials") {
                    toast.error("Invalid email or password. Please check your credentials.");
                } else {
                    toast.error("Login failed. Please try again later.");
                }
            }
        } catch (error) {
            console.error("Error occurred:", error);
            toast.error("Invalid email or password");
        }
    };

  return(
    <Card sx={{p:4,py:2,maxWidth:"500px", margin:"50px auto",display:"flex",flexDirection:"column",gap:3,borderRadius:"10px"}}>
        <CardContent sx={{m:0}}>
            <Typography gutterBottom variant="h5" component="div" sx={{m:0}}>
                    Login Here!
            </Typography>

        </CardContent>
        <TextField id="outlined-basic" label="E-mail" variant="outlined" type={"email"} name={"email"} onChange={handleChange} value={user.email} />
        <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"} name={"password"} onChange={handleChange} value={user.password}/>

        <Button variant='contained' onClick={handleSubmit}>Login</Button>
        <ToastContainer />
    </Card>
  )
}
export default Login
