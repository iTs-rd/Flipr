import * as React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { publicRequest } from "../requestMethods";

export default function Registration(){
    const [username,setUserName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [err, setErr]= React.useState("");
    
    const Ruser ={
        username: username,
        email: email,
        password: password,
    }
    const regis =async (e)=>{
        e.preventDefault();
        setErr("check user name and/or email id.")
        const k = await publicRequest.post("api/signup/", Ruser);
        if(k.data.success){
            window.location.replace("/login");
        }
        
    }

    return (
        <Box sx={{textAlign:'center', margin:'40% 20%', borderStyle:'double', padding:'5%'}}>
            <Typography variant="h6" sx={{padding:'1% 4% 0 4%'}} gutterBottom>
                Register
            </Typography>
            <TextField id="standard-basic" label="UserName" variant="standard" type="User Name" onChange={(e)=>setUserName(e.target.value)} required />
            <br />
            <TextField id="standard-basic" label="Email ID" variant="standard" type="email" onChange={(e)=>setEmail(e.target.value)} required />
            <br />
            <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <br /><br />
            <p>{err}</p>
            <Button variant="contained" onClick={regis}>Register</Button>
        </Box>
    )
}