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
import {GetPosts, PutPost} from '../data/API';


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
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        // console.log(props.data)
        const users = props.data.like_users;
        setLikes(users.length);
        if (users && users.includes(user.id)) {
            setColor('red')
        } else {
            setColor('grey')
        }
    }, [props.data.like_users])

    const handleFavChange = (e) => {
        if (color === 'grey') {
            const users =  props.data.like_users || [];
            PutPost({id: props.data._id , like_users: [...users, user.id]})
            .then((post) => {
                setLikes(likes + 1);
                // console.log('like successfully', post)
            })
            .catch((err) => console.error(err));
            setColor('red');
        } else {
            const users =  props.data.like_users || [];
            PutPost({id: props.data._id , like_users: users.filter(u => u !== user.id)})
            .then((post) => {
                setLikes(likes - 1);
                // console.log('unlike successfully', post)
            })
            .catch((err) => console.error(err));
            setColor('grey');
        }
    }



    return (
    <Card sx={{width:700}}>
        <CardHeader 
            sx={{paddingRight: 3}}
            avatar={
            <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
            {props.data.user_name[0]}
            </Avatar>
            } 
            action={
                <Stack direction="row" alignItems="center">
                <IconButton aria-label="like" onClick={handleFavChange}>
                    <FavoriteIcon sx={{color: color}}/> 
                </IconButton>
                <Typography variant="body1" color="text.secondary">
                    {likes}
                </Typography>
                </Stack>
              }
            title={props.data.user_name}
            subheader={new Date(props.data.created_date).toDateString()}
        />
        <CardContent>
            <Typography variant="body1" color="text.primary">
                {props.data.content}
            </Typography>
        </CardContent>
        <Link className='nonstyLink' to={`../paper/${props.data.referred_paper_id}`}>
            <PaperItem id={props.data.referred_paper_id} />
        </Link>
    </Card>)
}

const sortFunc = (key) => {
    if (key === 'like')
        return (a, b) => {
            if (a.like_users.length > b.like_users.length) return -1;
            else return 1;
        }
    return (a, b) => {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1; 
      return 0;
    }
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
      posts.sort(sortFunc(newKey));
      setPosts(posts);
    };

    return (
        <>
        <Toolbar sx= {{mb: 3}}>
            <Typography variant="h6" noWrap component="div" color="primary.dark">
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
                <ToggleButton value="created_date">Most Recent</ToggleButton>
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