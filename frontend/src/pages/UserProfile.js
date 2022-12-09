import {useContext, useState, useEffect} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import {Stack, Typography, Box, Tabs, Tab, Button, IconButton} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaperItem from '../components/PaperItem';
import {GetPosts} from '../data/API';

function FavPaperItem(props) {
    const [color, setColor] = useState('orange');
    const { user } = useContext(UserContext);

    if (!user) 
        return <Navigate to="/login" />;  

    const handleFavChange = (e) => {
        // TODO
        if (color === 'grey') {
            setColor('orange');
        } else {
            setColor('grey');
        }
    }
    return (
        <Stack direction="row" alignItems="center" sx={{width: 800}}>
            <IconButton aria-label="add to favorites" onClick={handleFavChange}>
            <StarIcon sx={{color: color}}/>
            </IconButton>
            <Box sx={{width: 800}}>
                <Link className='nonstyLink' to={`../paper/${props.id}`}>
                <PaperItem id={props.id} />
            </Link>
            </Box>
            
        </Stack>
        
    )
}

function FavoritePaperList(props) {
    if(!props || !props.papers) return <></>
    return (<Stack>
        {props.papers.map((paper, i)=>{return <FavPaperItem key={i} id={paper} />})}
    </Stack>);
}


function PostItem(props) {
    if(!props || !props.papers) return <></>
    return (
        <Box sx= {{
            width: 800,
            padding: 2,
            backgroundColor: '#ede7f6',
            opacity: 0.8,
            '&:hover': {
                backgroundColor: 'secondary.light',
                opacity: 1
            }
        }}>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="text.primary">
            {new Date(props.data.Created_date).toDateString()}
            </Typography>
            <Typography variant="body1" color="text.secondary">
            <FavoriteIcon /> {props.data.Like_users.length}
            </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary">
            {props.data.Content}
        </Typography>
                        
        </Box>
    )
}

function MyPosts (props) {
    const [data, setData] = useState([]);
    // console.log(props.posts)
    useEffect(() => {
        GetPosts(null, props.posts)
            .then( res => {
                // console.log(res)
                setData(res);
            })
            .catch( err => { console.log(err);})
    }, [props.posts]);

    if (!props.posts || !data)
        return <></>;
    return (<Stack>
        {data.map((post, i)=>{return <PostItem key={i} data={post} />})}
    </Stack>);
}


/* User Profile page 
- On the top is the user's information 
- A tab bar with options "Paper List" & "Posts"
    - (default) if tab === paper list, show user's favorite paper list 
        - can click paper to the paper's detail
    - else show posts
*/
function UserProfile (props) {
    const { user, user_posts, user_fav_papers, logout } = useContext(UserContext);
    const [value, setValue] = useState(0);

    if (!user) return <Navigate to="/login" />;

    
    const handleChange = (e, newvalue) => {
        setValue(newvalue);
    };

    return (
        <>
            <Stack sx={{bgcolor: 'background.paper', margin: 5}} spacing={1} 
                display="flex" 
                alignItems="space-between"
                justifyContent="center">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" color="text.primary">
                    Hi, {user.name}
                </Typography>
                <Button variant='outlined' onClick={logout} sx={{width:100}}>Log out</Button>
                </Stack>
                
                <Typography variant="subtitle2" color="text.secondary">
                    Email: {user.email} 
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    Research Field: {user.field}
                </Typography>
            </Stack>
            
            <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 5}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Paper List" />
                    <Tab label="My Posts" />
                </Tabs>
            </Box>
            <Box sx={{ justifyContent: "center", display: "flex", width: '100%'}}>
                { value === 0 ? <FavoritePaperList papers={user_fav_papers}/> 
                    : <MyPosts posts={user_posts}/>}
            </Box> 
        </>
    );
}

export default UserProfile;