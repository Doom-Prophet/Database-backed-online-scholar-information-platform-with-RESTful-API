import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link} from "react-router-dom";

function Login (props) {
    const { user, login } = useContext(UserContext);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');       
    const [success, setSuccess] = useState(false);

    const handleLogin = (e) => {
        login(email, password);
        setSuccess(true);
    }

    return (
    <> { success ? 
        <div>
            <h1>Hi, {user.name}!</h1>
        </div> 
    :
        <div>
            <h1>Log In</h1>
            <form>
                <div>
                    <label>Email</label>
                    <input type="text" onChange={e => {setEmail(e.target.value)}}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" onChange={e => {setPassword(e.target.value)}}></input>
                </div>
                <button onClick={handleLogin}>Log in</button>
                <Link to='../signup'>Need an account? Sign up now </Link>
            </form>
        </div>
        
    }</>   
    );
}

export default Login;