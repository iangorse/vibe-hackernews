import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6600', // Hacker News orange
    },
    secondary: {
      main: '#333',
    },
    background: {
      default: '#f6f6ef',
      paper: '#fff',
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

export default theme;
