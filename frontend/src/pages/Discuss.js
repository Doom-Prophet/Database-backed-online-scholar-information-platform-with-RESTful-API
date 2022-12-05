import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import { Toolbar, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {posts} from '../data/mock_data';
import PaperItem from '../components/PaperItem'


/* Post Item
- User Avatar
- User name
- content 
- link to paper 
- likes
*/
function Post (props) {
    const { user } = useContext(UserContext);
    const [color, setColor] = useState('grey');

    const handleFavChange = (e) => {
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
        <Link className='nonstyLink' to={`../paper/${props.data.Paper.id}`}>
            <PaperItem data={props.data.Paper} />
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

    if (!user || !user.auth) return <Navigate to="/login" />;
    
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
            <h1></h1>
            <div className='new-post'>
            
            </div>
            <Box sx={{ justifyContent: "center", display: "flex"}}>
                <Stack spacing={2}>
                {posts.map((post, idx) => {
                    return <Post key={idx} data={post} />;
                })}
                </Stack>
            </Box>
            
        </>
    );
}

export default Discuss;