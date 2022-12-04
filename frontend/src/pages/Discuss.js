import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import posts from '../data/mock_data';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import FavoriteIcon from '@mui/icons-material/Favorite';

function Post (props) {
    return (
    <Card className="post">
        <CardHeader 
            avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {props.data.User_name[0]}
            </Avatar>
            } 
        title={props.data.User_name}
        subheader={new Date(props.data.Created_date).toDateString()}
        />
        <CardContent>
            {props.data.Content}
        </CardContent>
        <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
      </CardActions>
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
    if (!user || !user.auth) return <Navigate to="/login" />;


    return (
        <>
            <h1>Current Field: {user.field}</h1>
            <div className='new-post'>
            
            </div>
            <div className='post-stream'>
                {posts.map((post, idx) => {
                    return <Post key={idx} data={post} />;
                })}
            </div>

        </>
    );
}

export default Discuss;