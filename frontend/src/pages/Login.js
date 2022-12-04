import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        <div>
            <h1>Log In</h1>
            <form>
                <TextField variant="standard" label="Email" onChange={e => {setEmail(e.target.value)}}/>
                <TextField variant="standard" label="Password" onChange={e => {setPassword(e.target.value)}}/>
                <Button variant="contained" onClick={handleLogin}>Log in</Button>
                <Link to='../signup'>Need an account? Sign up now </Link>
            </form>
            { status === 'error' ? <span>Invalid email or password</span> : false}
        </div>
        
    }</>   
    );
}

export default Login;