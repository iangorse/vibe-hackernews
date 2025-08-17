import { useState } from 'react';
import TopStories from './TopStories';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function App({ mode, setMode }) {
  const [count, setCount] = useState(0);

  const handleThemeChange = (event) => {
    setMode(event.target.checked ? 'dark' : 'light');
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={mode === 'dark'} onChange={handleThemeChange} />}
        label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        sx={{ mb: 2, ml: 2 }}
      />
      {/* ...existing code... */}
      <TopStories />
    </>
  );
}

export default App
