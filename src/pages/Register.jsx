import React ,{useState} from 'react';
import {Card, CardContent, Typography,TextField,Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Register=()=>{

 const [user, setUser] = useState({name:"",email:"",password:""})
 

 const navigator = useNavigate()
 
 const handleChange=(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        setUser({...user, [name]: value})
 }



 const handleSubmit=async()=>{

    console.log(user);
    const res = await fetch("https://shashikant-blog-api2.onrender.com/api/user/register",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    if(res.ok){
        alert("Successfully Registered, Now Login to write your story")
        navigator("/login")
    }
    
    else{
        console.log(data);
    }
  
 }





  return(
    <Card sx={{p:4,py:2,maxWidth:"500px", margin:"50px auto",display:"flex",flexDirection:"column",gap:3,borderRadius:"10px"}}>
        <CardContent sx={{m:0}}>
            <Typography gutterBottom variant="h5" component="div" sx={{m:0}}>
                    Register Here!
            </Typography>

        </CardContent>
        <TextField id="outlined-basic" label="Name" variant="outlined" type={"text"} name={"name"} onChange={handleChange} value={user.name}/>
        <TextField id="outlined-basic" label="E-mail" variant="outlined" type={"email"} name={"email"} onChange={handleChange} value={user.email} />
        <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"} name={"password"} onChange={handleChange} value={user.password}/>

        <Button variant='contained' onClick={handleSubmit}>Register</Button>
    </Card>
  )
}
export default Register
