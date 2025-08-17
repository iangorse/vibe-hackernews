import { createTheme } from '@mui/material/styles';

const classicLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff914d',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4b5d67',
      contrastText: '#fff',
    },
    background: {
      default: '#f4f7fa',
      paper: '#fdf6f0',
    },
    text: {
      primary: '#222',
      secondary: '#6c757d',
    },
    action: {
      hover: '#f5e9e0',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#ff914d',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

const freshLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4fc3f7', // soft blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#81c784', // soft green
      contrastText: '#fff',
    },
    background: {
      default: '#e3f2fd', // very light blue
      paper: '#f1f8e9', // very light green
    },
    text: {
      primary: '#1a237e',
      secondary: '#388e3c',
    },
    action: {
      hover: '#bbdefb',
    },
    divider: '#bdbdbd',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#4fc3f7',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffb86b',
      contrastText: '#222',
    },
    secondary: {
      main: '#8fa1b3',
      contrastText: '#222',
    },
    background: {
      default: '#181a20',
      paper: '#23263a',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b8c1',
    },
    action: {
      hover: '#23263a',
    },
    divider: '#333',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#ffb86b',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export { classicLight, freshLight, darkTheme };
