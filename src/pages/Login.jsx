import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setRefresh } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

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
        navigate("/");
      } else {
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

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card sx={{ p: 4, py: 2, maxWidth: "500px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 3, borderRadius: "10px" }}>
      <CardContent sx={{ m: 0 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ m: 0 }}>
          Login Here!
        </Typography>
      </CardContent>
      <TextField
        id="outlined-email"
        label="E-mail"
        variant="outlined"
        type="email"
        name="email"
        onChange={handleChange}
        value={user.email}
      />
      <TextField
        id="outlined-password"
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        name="password"
        onChange={handleChange}
        value={user.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button variant="contained" onClick={handleSubmit}>Login</Button>
      <ToastContainer />
    </Card>
  );
};

export default Login;

