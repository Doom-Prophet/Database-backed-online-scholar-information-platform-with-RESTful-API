import {Box, Stack, Typography} from '@mui/material';
import {GetPaperDetail} from '../data/API';
import {useState, useEffect} from 'react';


function PaperItem (props) {
  const [paper, setPaper] = useState(null);

  useEffect( () => {
    console.log("props.id:"+props.id);
    GetPaperDetail(props.id)
    .then(paper => {
      setPaper(paper);
    })
    .catch((err)=> {
      console.log(err);
    })
  }, [props.id]);

  return (
    <Box sx= {{
      padding: 2,
      backgroundColor: '#ede7f6',
      opacity: 0.8,
      '&:hover': {
          backgroundColor: 'secondary.light',
          opacity: 1
      }
      }}>
      {!paper ? false :
      <>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="text.primary">
          {paper.paper_name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
          {paper.venue + ' ' + paper.year}
          </Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary">
          {paper.abstract.slice(0, Math.min(paper.abstract.length, 100)) + '...'}
      </Typography>
      </>
      }     
      </Box>
  )
}

export default PaperItem;