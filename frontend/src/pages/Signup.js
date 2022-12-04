import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {Link, Navigate} from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const FIELDs = ["Algorithms and Theory", "Data Management", "Data Mining and Modeling"];


function Signup (props) {
    const { user, signup } = useContext(UserContext);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');       
    const [name, setName] = useState('');
    const [field, setField] = useState('');
    const [success, setSuccess] = useState(false);

    if (user && user.auth) return <Navigate to="/profile" />;

    const handleSignup = (e) => {
        signup(email, password, name, field);
        if (user.auth) 
            setSuccess(true);
    }

    return (
    <> { success ? 
            <div>
                <h1>Hi, {name}!</h1>
            </div> 
        :
        <div>
            <h1>Sign Up</h1>
            <form>
                <div>
                    <label>Email</label>
                    <input type="text" onChange={e => {setEmail(e.target.value)}}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" onChange={e => {setPassword(e.target.value)}}></input>
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" onChange={e => {setName(e.target.value)}}></input>
                </div>
                <div>
                    <label>Interested Field</label>
                    <input type="text" onChange={e => {setField(e.target.value)}}></input>
                </div>
                <button onClick={handleSignup}>Sign Up</button>
                <Link to='../login'>Have an account? Log in here </Link>

            </form>
        </div>
        }
    </>
    );
}

export default Signup;