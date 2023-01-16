import * as React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";

export default function Login(){
    const [userName, setUserName]=React.useState('');
    const [password, setPassword]=React.useState('');
    const [err, setErr]= React.useState("");
    React.useEffect(() => {
      const id = JSON.parse(localStorage.getItem('authorized'));
      if(id){
        window.location.replace("/");
      }
    }, []);
    const Ruser ={
        username: userName,
        password: password,
    }
    
    const login =async (e)=>{
        e.preventDefault();
        setErr("check user name and/or Password.")
        const k = await publicRequest.post("auth/", Ruser);
        if(k.data){
            localStorage.setItem('authorized', JSON.stringify(k.data.token));
            window.location.replace("/");
        }
    }
    return (
        <Box sx={{textAlign:'center', margin:'18% 20%', borderStyle:'double', padding:'5%'}}>
            <Typography variant="h6" sx={{padding:'1% 4% 0 4%'}} gutterBottom>
                Login
            </Typography>
            <TextField id="standard-basic" label="User Name" variant="standard" type="text" required onChange={(e)=>setUserName(e.target.value)}/>
            <br />
            <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                required
                onChange={(e)=>setPassword(e.target.value)}
            />
            <br /><br />
            <p>{err}</p>
            <Button variant="contained" onClick={login}>Login</Button>
            <Link to={'/register'}>Register Instead</Link>
        </Box>
    )
}