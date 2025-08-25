import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import AppBar from '../components/common/AppBar';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../contexts/AuthContext';

function Layout() {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      {user && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;