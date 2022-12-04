import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function Login (props) {
    const { user, login, error } = useContext(UserContext);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');       
    const [status, setStatus] = useState('');

    if (user && user.auth) return <Navigate to="/profile" />;

    const handleLogin = (e) => {
        login(email, password);
        if (error) setStatus('error');
    }

    return (
    <> { status === 'success' ? 
        <div>
            <h1>Hi, {user.name}!</h1>
        </div> 
    :
        <div className="login_box">
            <h1 className="centered">Log In</h1>
            <form>
                <Stack spacing={1} sx={{ width: 300 }}>
                <TextField className="inputText" variant="standard" label="Email" 
                    onChange={e => {setEmail(e.target.value)}} 
                    required/>
                <TextField className="inputText" variant="standard" label="Password" 
                    onChange={e => {setPassword(e.target.value)}} 
                    required/>
                <Button variant="contained" onClick={handleLogin}>Log in</Button>
                <Link className="centered" to='../signup'>Need an account? Sign up now </Link>
                { status === 'error' ? <Alert severity="error">Invalid Log In</Alert> : false}
                </Stack>
            </form>
        </div>
        
    }</>   
    );
}

export default Login;