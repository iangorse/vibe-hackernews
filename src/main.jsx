import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme';
import { useState } from 'react';

function Main() {
  const [mode, setMode] = useState('light');
  return (
    <StrictMode>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <App mode={mode} setMode={setMode} />
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
