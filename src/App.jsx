import { useState } from 'react';
import TopStories from './TopStories';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function App({ mode, setMode }) {
  const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleThemeChange = (theme) => {
    setMode(theme);
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vibe Hacker News
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        disableScrollLock
      >
        <MenuItem disabled>Theme</MenuItem>
        <MenuItem selected={mode === 'classic'} onClick={() => handleThemeChange('classic')}>Classic Light</MenuItem>
        <MenuItem selected={mode === 'fresh'} onClick={() => handleThemeChange('fresh')}>Fresh Light</MenuItem>
        <MenuItem selected={mode === 'lavender'} onClick={() => handleThemeChange('lavender')}>Lavender Light</MenuItem>
        <MenuItem selected={mode === 'dark'} onClick={() => handleThemeChange('dark')}>Dark</MenuItem>
      </Menu>
      <div style={{ marginTop: 16 }}>
        <TopStories />
      </div>
    </>
  );
}

export default App
