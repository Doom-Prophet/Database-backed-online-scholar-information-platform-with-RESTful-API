import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {Link} from "react-router-dom";

function Signup (props) {
    const { signup } = useContext(UserContext);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');       
    const [name, setName] = useState('');
    const [field, setField] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignup = (e) => {
        signup(email, password, name, field);
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