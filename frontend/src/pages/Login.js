import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, useNavigate} from "react-router-dom";
import {Box, Stack, Button, TextField, Alert, Typography} from '@mui/material';
import {signInWithFirebase} from '../firebase';
import {GetUser} from '../data/API';


function Login (props) {
    const navigate = useNavigate();
    const { user, login } = useContext(UserContext);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');       
    const [errorMessage, setError] = useState('');
    
    if (user) {
        try {
            navigate(-1);
        } 
        catch {
            navigate('/profile')
        }
        
    };

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithFirebase(email, password)
        .then((results) => {
            GetUser(email)
                .then((user) => {
                    login(user);
                })
                .catch((error) => {
                    setError('Server error');
                })            
        })
        .catch((error) => {
            console.log(error);
            setError('Invalid Email or Password');
        });
    }

    return (
    <> 
        <Box sx={{width: 300,
            height: 'auto',
            mx: 'auto',
            borderRadius: '5%',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            padding: '20px 50px',
            mt: 10
            }}>
            <Typography variant="h4" className="centered">Log In</Typography>
            <Stack spacing={2} sx={{ width: 300, mt: 3 }}>
            <TextField className="inputText" variant="standard" label="Email" 
                onChange={e => {setEmail(e.target.value)}} 
                required/>
            <TextField className="inputText" variant="standard" label="Password" type='password'
                onChange={e => {setPassword(e.target.value)}} 
                required/>
            <Button variant="contained" onClick={handleLogin}>Log in</Button>
            <Link className="centered" to='../signup'>Need an account? Sign up now </Link>
            { errorMessage ? <Alert severity="error">{errorMessage}</Alert> : false}
            </Stack>
        </Box>
    </>   
    );
}

export default Login;