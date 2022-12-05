import {Box, Stack, Typography} from '@mui/material';


function PaperItem (props) {
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
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="text.primary">
          {props.data.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
          {props.data.venue + ' ' + props.data.year}
          </Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary">
          {props.data.abstract.slice(0, Math.min(props.data.abstract.length, 100)) + '...'}
      </Typography>
                      
      </Box>
  )
}

export default PaperItem;