// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { Box, CssBaseline, Toolbar } from '@mui/material';
// import AppBar from '../components/common/AppBar';
// import Sidebar from '../components/common/Sidebar';
// import { useAuth } from '../contexts/AuthContext';

// function Layout() {
//   const { user } = useAuth();

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar />
//       {user && <Sidebar />}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }


// export default Layout;





import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import AppBar from '../components/common/AppBar';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../contexts/AuthContext';

function Layout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar onDrawerToggle={handleDrawerToggle} />
      {user && <Sidebar isOpen={sidebarOpen} onToggle={handleDrawerToggle} />}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          marginLeft: user ? (sidebarOpen ? '240px' : '80px') : 0,
          transition: 'margin-left 0.3s ease',
          width: user ? (sidebarOpen ? 'calc(100% - 240px)' : 'calc(100% - 80px)') : '100%'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
