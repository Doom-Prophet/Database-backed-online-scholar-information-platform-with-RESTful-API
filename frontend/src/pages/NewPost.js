import {Box, Input, Stack, Typography, Button, Autocomplete, TextField} from '@mui/material';
import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {Link, Navigate} from "react-router-dom";
import {papers} from '../data/mock_data';

function NewPost (props) {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');


  if (!user || !user.auth) return <Navigate to="/login" />;
 
  const handleSubmit = (e) => {

  }

  const handleContentChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  }

  return (
    <>
    <Box alignItems='center' sx={{
      width: 800, 
      mx: 'auto', 
      mt: 5, 
      backgroundColor: '#ede7f6', 
      padding: 5,
      borderRadius: 10
    }}>

      <Typography variant='h4' sx={{mb:3}} align='center'>Add your post</Typography>
      <from>
        <Typography variant='subtitle1'>Content:</Typography>
        <TextField
          multiline
          rows={10}
          defaultValue=""
          placeholder="Enter your thoughts on the paper..."
          onChange={handleContentChange}
          required
          fullWidth
          sx={{
            backgroundColor:'white',
            opacity: 0.9,
            mb: 3,
            '&:hover': {
              backgroundColor: 'white',
              opacity: 1
          }
          }}
        />
        <Typography variant='subtitle1'>Paper: </Typography>
        <Autocomplete
        freeSolo
        options={papers.map((option) => option.title)}
        renderInput={(params) => 
              <TextField {...params} placeholder="Enter Paper's Title..." required 
                onChange={(e)=>{setTitle(e.target.value)}}/>}
        sx={{
          backgroundColor:'white',
          opacity: 0.8,
          mb: 5,
          '&:hover': {
            backgroundColor: 'white',
            opacity: 1
        }
        }}
        />
        <Box sx={{ justifyContent: "center", display: "flex"}}>
          <Button variant='contained' onSubmit={handleSubmit} >Post</Button>
        </Box>
      </from>
      
    </Box>
    </>
  );
}

export default NewPost;