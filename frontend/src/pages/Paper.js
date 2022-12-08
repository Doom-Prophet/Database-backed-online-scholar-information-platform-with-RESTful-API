import { useState, useEffect, useContext} from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import {UserContext} from '../context/UserContext'
import PropTypes from 'prop-types';
import {Box, Stack, Typography, Button, IconButton} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {GetPaperDetail} from '../data/API';
import NoMatch from "./NoMatch";

/*
Paper detail page
- paper info 
- like button to mark the paper as favorite
- go back to previous page
*/
const Paper = (props) => {
  let {id} = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [color, setColor] = useState('grey');
  const { user } = useContext(UserContext);
  const [isMatch, setIsMatch] = useState(true);

  useEffect( () => {
    GetPaperDetail(id)
    .then(paper => {
      setPaper(paper);
    })
    .catch((err)=> {
      setIsMatch(false);
    })
  }, [id])

  // if (!user || !user.auth) 
  //     return <Navigate to="/login" />;  
  // TODO 
  const handleFavChange = (e) => {
    if (color === 'grey') {
        setColor('orange');
    } else {
        setColor('grey');
    }
  }

  if (!isMatch) {
    return <NoMatch />;
  }
  if (!paper) {
    return <></>;
  }
  return (
    <> 
    <Box sx= {{
      pt: 5,
      px: 20
    }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton aria-label="add to favorites" onClick={handleFavChange}>
          <StarIcon sx={{color: color}}/>
        </IconButton>
        <Typography variant="h3" color="text.primary">
          {paper.title}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{mt:1}}>
          <Typography variant="subtitle1" color="text.secondary" sx={{fontStyle: 'italic'}}>
          {paper.authors.join(', ')}
          </Typography>
          <Typography variant="subtitle1" color="secondary">
          Cited by {paper.citations}
          </Typography>
      </Stack>
      <Typography variant="subtitle2" color="text.secondary" sx={{fontWeight: 'bold', mt:1}}>
          {paper.venue + ' ' + paper.year}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph={true} sx={{mt:3}}>
          {paper.abstract}
      </Typography>
    </Box>
    <Box sx={{ justifyContent: "center", display: "flex"}}>
      <Stack direction="row" spacing={2}>
        <Button variant='contained' onClick={() => navigate(-1)} >Go back</Button>
        <Button variant='contained' onClick={() => navigate('/post')} >Add Post</Button>
      </Stack>
    </Box>
    </>
    
  );
};

Paper.propTypes = {
  id: PropTypes.number
};

export default Paper;
