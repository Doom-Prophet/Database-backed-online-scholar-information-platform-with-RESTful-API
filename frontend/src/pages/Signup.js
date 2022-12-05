import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {Link, Navigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const FIELDs = [{value: "testField", label: "testField"},{value: "testField2", label: "testField2"}];


function Signup (props) {
    const { user, signup, error } = useContext(UserContext);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');       
    const [name, setName] = useState('');
    const [field, setField] = useState('');
    const [status, setStatus] = useState(false);

    if (user && user.auth) return <Navigate to="/profile" />;

    const handleSignup = (e) => {

        if (!USER_REGEX.test(name) || !EMAIL_REGEX.test(email) || !PWD_REGEX.test(password) || !field) 
            setStatus('error');
        else {
            signup(email, password, name, field);
            if (error)  setStatus('error');
            else setStatus('success');
        }
    }

    return (
    <> { status === 'success' ? 
            <div>
                <h1>Hi, {name}!</h1>
            </div> 
        :
        <div className="login_box">
            <h1 className="centered">Sign Up</h1>
            <form>
                <Stack spacing={1} sx={{ width: 300 }}>
                    <TextField className="inputText" variant="standard" label="Username" 
                        onChange={e => {setName(e.target.value)}} 
                        required
                    />
                    <TextField className="inputText" variant="standard" label="Email" 
                        onChange={e => {setEmail(e.target.value)}} 
                        required
                    />
                    <TextField className="inputText" variant="standard" label="Password" 
                        onChange={e => {setPassword(e.target.value)}} 
                        required
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={FIELDs}
                        renderInput={(params) => <TextField {...params} label="Research Field" />}
                        onChange={e => {setField(e.target.value)}} 
                        required
                    />
                    <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
                    <Link className="centered" to='../login'>Have an account? Log in here </Link>
                    { status === 'error' ? <Alert severity="error">Invalid Sign Up</Alert> : false}
                </Stack>
                </form>
                
        </div>
        }
    </>
    );
}

export default Signup;