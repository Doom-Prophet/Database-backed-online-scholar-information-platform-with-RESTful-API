import {Box, Input, Stack, Typography, Button, Autocomplete, TextField, Alert} from '@mui/material';
import {useContext, useState, useEffect} from 'react';
import {UserContext} from '../context/UserContext';
import {useNavigate, Navigate} from "react-router-dom";
import {PostPost, GetPaperList} from '../data/API';


function NewPost (props) {
  const { user, addPost } = useContext(UserContext);
  const [content, setContent] = useState('');
  const [paper, setPapaer] = useState('');
  const [options, setOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    GetPaperList()
      .then((papers) => {
        setOptions(papers);
      })
      .catch((err) => console.error(err))
  }, []);

  if (!user) return <Navigate to="/login" />;
 
  // TODO: Some bugs here
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !paper) {
      setErrorMessage("Please enter the content and the paper");
    } else {
      console.log(paper)
      PostPost({
        User_id: user.id,
        User_name: user.name,
        Content: content,
        Paper: paper,
        Field: user.field
      }).then((res) => {
        console.log(res)
        addPost(res._id);
        navigate("/discuss");
      })
      .catch((err) => {setErrorMessage("Server Error.");}); 
    }
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

      <Typography variant='h4' sx={{mb:3}} align='center'>Add Your Post</Typography>

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
        options={options}
        getOptionLabel={(option) => option.title}
        onChange={(e, value)=>{
            e.preventDefault();
            setPapaer(value._id);
          }}
        renderInput={(params) => 
              <TextField {...params} placeholder="Enter Paper's Title..." required />}
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
          <Button variant='contained' onClick={handleSubmit} >Post</Button>
        </Box>
        { errorMessage ? <Alert severity="error">{errorMessage}</Alert> : false}
      
    </Box>
    </>
  );
}

export default NewPost;