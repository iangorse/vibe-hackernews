import { createTheme } from '@mui/material/styles';

const getTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#ff6600',
    },
    secondary: {
      main: '#333',
    },
    background: {
      default: mode === 'light' ? '#f6f6ef' : '#121212',
      paper: mode === 'light' ? '#fff' : '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#ff6600',
    },
  },
});

export default getTheme;
