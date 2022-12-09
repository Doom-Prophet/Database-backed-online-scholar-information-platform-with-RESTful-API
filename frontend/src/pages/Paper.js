import { useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {UserContext} from '../context/UserContext'
import PropTypes from 'prop-types';
import {Box, Stack, Typography, Button, IconButton} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {GetPaperDetail, PutUser} from '../data/API';
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
  const { user, user_fav_papers, addPaper } = useContext(UserContext);
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

  useEffect(() => {
    console.log(user, user_fav_papers)
    if (user && user_fav_papers && user_fav_papers.includes(id)) {
        setColor('orange');
    }
  }, [user, user_fav_papers]);


  const handleFavChange = (e) => {
    if (!user) {
      navigate('/login');
    }
    const curr_paper_list = user_fav_papers || [];
    if (color === 'grey') {
      PutUser({id: user.id , favorite_papers: [...curr_paper_list, id]})
        .then((user) => {
          addPaper(id)
        })
        .catch((err) => console.error(err));
      setColor('orange');
    } else {
      PutUser({id: user.id , user_fav_papers: curr_paper_list.filter((paperID) => id !== paperID)})
        .then((user) => addPaper(id))
        .catch((err) => console.error(err));
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
          {paper.paper_name}
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
      </Typography>x
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
