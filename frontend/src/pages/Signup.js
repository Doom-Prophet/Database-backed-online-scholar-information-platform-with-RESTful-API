import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {Link, Navigate} from "react-router-dom";
import {Box, Stack, Button, TextField, Alert, Typography, Autocomplete} from '@mui/material';
import {signOutWithFirebase} from '../firebase'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const FIELDs =  [ "testField","testField2"];

function Signup (props) {
    const { user, signup } = useContext(UserContext);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');       
    const [name, setName] = useState('');
    const [field, setField] = useState('');
    const [error, setError] = useState('');

    if (user && user.auth) return <Navigate to="/profile" />;

    const handleSignup = (e) => {

        if (!USER_REGEX.test(name)) {
            setError('Please enter a valid username');
        }  else if (!EMAIL_REGEX.test(email)) {
            setError('Please enter a valid email address');
        }  else if (!PWD_REGEX.test(password)) {
            setError('Please enter a stronger password!');
        }  else if (!field) {
            setError('Empty Field');
        }
        else {
            signOutWithFirebase(email, password)
            .then((res) => {
                console.log(res);
                signup({email: email, name: name, field: field});
                setError('');
            })
            .catch((error) => {
                setError('User Exists!');
            });
        }
    }


    return (
    <> 
        <Box sx={{width: 300,
            height: 'auto',
            margin: '50px auto',
            borderRadius: '5%',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            padding: '30px 50px'
            }}>
            <Typography variant="h4" className="centered">Sign Up</Typography>
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
                        type="password"
                    />
                    <Autocomplete
                        disablePortal
                        options={FIELDs}
                        renderInput={(params) => <TextField {...params} label="Research Field" />}
                        required
                        onChange={(e, newValue) => {
                            setField(newValue);
                        }}
                    />
                    <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
                    <Link className="centered" to='../login'>Have an account? Log in here </Link>
                    { error  ? <Alert severity="error">{error}</Alert> : false}
                </Stack>
                </form>
                
        </Box>
    </>
    );
}

export default Signup;