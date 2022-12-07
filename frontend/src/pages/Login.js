import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import {Box, Stack, Button, TextField, Alert, Typography} from '@mui/material';
import {signInWithFirebase} from '../firebase';

function Login (props) {
    const { user, login } = useContext(UserContext);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');       
    const [error, setError] = useState('');

    if (user && user.auth) return <Navigate to="/profile" />;

    const handleLogin = (e) => {
        signInWithFirebase(email, password)
        .then((results) => {
            login({email: email});
            setError('');
        })
        .catch((error) => {
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
            <Typography variant="h1" className="centered">Log In</Typography>
            <form>
                <Stack spacing={1} sx={{ width: 300 }}>
                <TextField className="inputText" variant="standard" label="Email" 
                    onChange={e => {setEmail(e.target.value)}} 
                    required/>
                <TextField className="inputText" variant="standard" label="Password" type='password'
                    onChange={e => {setPassword(e.target.value)}} 
                    required/>
                <Button variant="contained" onClick={handleLogin}>Log in</Button>
                <Link className="centered" to='../signup'>Need an account? Sign up now </Link>
                { error ? <Alert severity="error">{error}</Alert> : false}
                </Stack>
            </form>
        </Box>
    </>   
    );
}

export default Login;