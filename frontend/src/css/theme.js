import * as React from 'react';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, orange, pink } from '@mui/material/colors';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: orange[500],
    },
    background: {
      main: deepPurple[50]
    },
    like: pink[600]
  },
});

export default theme;