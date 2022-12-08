import {useContext, useState, useEffect} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import {
    Box,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    IconButton,
    Typography, 
    Toolbar, 
    Stack, 
    ToggleButton, 
    ToggleButtonGroup
  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaperItem from '../components/PaperItem';
import {GetPosts} from '../data/API';


/* Post Item
- User Avatar
- User name
- content 
- link to paper 
- likes
*/
function Post (props) {
    // const { user } = useContext(UserContext);
    const [color, setColor] = useState('grey');

    const handleFavChange = (e) => {
        // TODO 
        if (color === 'grey') {
            setColor('red');
        } else {
            setColor('grey');
        }
    }

    return (
    <Card sx={{width:700}}>
        <CardHeader 
            avatar={
            <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
            {props.data.User_name[0]}
            </Avatar>
            } 
            action={
                <IconButton aria-label="like" onClick={handleFavChange}>
                    <FavoriteIcon sx={{color: color}}/>
                </IconButton>
              }
            title={props.data.User_name}
            subheader={new Date(props.data.Created_date).toDateString()}
        />
        <CardContent>
            <Typography variant="body1" color="text.primary">
                {props.data.Content}
            </Typography>
        </CardContent>
        <Link className='nonstyLink' to={`../paper/${props.data.Paper}`}>
            <PaperItem id={props.data.Paper} />
        </Link>
    </Card>)
}


/* Discuss page
- need login status
- list of posts in user's research field
- for each post 
    - can fav & unfav
    - can link to the paper
*/
function Discuss (props) {
    const { user } = useContext(UserContext);
    const [sortKey, setSortKey] = useState('date');
    const [posts, setPosts] = useState([]);

    // TODO: update periodically
    useEffect( () => {
        if (user && user.field) {
            GetPosts(user.field)
            .then(posts => {
                setPosts(posts);
            })
            .catch((err)=> {
            console.log(err);
            })
         }
      }, [user]);

    if (!user) return <Navigate to="/login" />;

    const handleSortKeyChange = (event, newKey) => {
      setSortKey(newKey);
    };

    return (
        <>
        <Toolbar>
            <Typography variant="h6" noWrap component="div">
                Research Field: {user.field}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box >
            <ToggleButtonGroup
                color="primary"
                value={sortKey}
                exclusive
                onChange={handleSortKeyChange}
                aria-label="sort key"
                >
                <ToggleButton value="date">Most Recent</ToggleButton>
                <ToggleButton value="like">Most Likes</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Toolbar>
            {!posts ? false :
            <Box sx={{ justifyContent: "center", display: "flex"}}>
                <Stack spacing={2}>
                {posts.map((post, idx) => {
                    return <Post key={idx} data={post} />;
                })}
                </Stack>
            </Box>
            }
        </>
    );
}

export default Discuss;