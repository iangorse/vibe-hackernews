import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme';
import { useState } from 'react';

function Main() {
  const getInitialMode = () => {
    const saved = window.localStorage.getItem('themeMode');
    return saved === 'dark' ? 'dark' : 'light';
  };
  const [mode, setMode] = useState(getInitialMode);

  const handleSetMode = (newMode) => {
    setMode(newMode);
    window.localStorage.setItem('themeMode', newMode);
  };

  return (
    <StrictMode>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <App mode={mode} setMode={handleSetMode} />
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
