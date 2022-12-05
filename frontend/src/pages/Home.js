import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const Home = () => {

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            <Link className='nonstyLink' to="discuss">Scholar Plus</Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Link className='nonstyLink' to="discuss"><Diversity3Icon /></Link>
            </IconButton>
          </Box>
          <Box >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Link className='nonstyLink' to="search" ><SearchIcon /></Link>
            </IconButton>
          </Box>
          <Box >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Link className='nonstyLink' to="profile"><AccountCircle /></Link>
            </IconButton>
          </Box>
        </Toolbar>
        </AppBar>
    </Box>


      <Outlet />      
    </>
  )
};

export default Home;
