import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function FavoritePaperList(props) {
    return (<div id="fav-papers">
        User's favorite paper list
    </div>);
}

function MyPosts (props) {
    return (<div id="my-posts">
        my posts
    </div>)
}


/* User Profile page 
- On the top is the user's information 
- A tab bar with options "Paper List" & "Posts"
    - (default) if tab === paper list, show user's favorite paper list 
        - can click paper to the paper's detail
    - else show posts
*/
function UserProfile (props) {
    const { user } = useContext(UserContext);
    const [value, setValue] = useState(0);

    if (!user || !user.auth) return <Navigate to="/login" />;

    const handleChange = (e, newvalue) => {
        setValue(newvalue);
    };

    return (
        <>
            <h1>Hi, {user.name}</h1>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Paper List" />
                <Tab label="My Posts" />
            </Tabs>
            { value === 0 ? <FavoritePaperList /> : <MyPosts />}
            </Box>
            
            
        </>
    );
}

export default UserProfile;