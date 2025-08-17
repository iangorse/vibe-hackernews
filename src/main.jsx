import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { classicLight, freshLight, darkTheme } from './theme';
import { useState } from 'react';

function Main() {
  const getInitialMode = () => {
    const saved = window.localStorage.getItem('themeMode');
    if (saved === 'dark' || saved === 'classic' || saved === 'fresh') return saved;
    return 'classic';
  };
  const [mode, setMode] = useState(getInitialMode());

  const handleSetMode = (newMode) => {
    setMode(newMode);
    window.localStorage.setItem('themeMode', newMode);
  };

  const theme =
    mode === 'dark' ? darkTheme :
    mode === 'fresh' ? freshLight :
    classicLight;

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App mode={mode} setMode={handleSetMode} />
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
