// import React from 'react';
// import { 
//   Drawer, 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText,
//   Toolbar  // Add this import
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   Class as ClassIcon,
//   Assignment as AssignmentIcon,
//   Book as BookIcon,
//   People as PeopleIcon,
//   Person as PersonIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const drawerWidth = 240;

// function Sidebar() {
//   const { user } = useAuth();

//   const menuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
//     { text: 'Classrooms', icon: <ClassIcon />, path: '/classrooms' },
//     { text: 'Exams', icon: <AssignmentIcon />, path: '/exams' },
//     { text: 'Library', icon: <BookIcon />, path: '/library' },
//   ];

//   if (user?.role === 'student') {
//     menuItems.push({ text: 'Counseling', icon: <PeopleIcon />, path: '/counseling' });
//   }

//   menuItems.push({ text: 'Profile', icon: <PersonIcon />, path: '/profile' });

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//       }}
//     >
//       <Toolbar />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem 
//             button 
//             key={item.text} 
//             component={Link} 
//             to={item.path}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// }


// export default Sidebar;


import React from 'react';
import PropTypes from 'prop-types'; // <--- import this
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Toolbar,
  IconButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;
const collapsedWidth = 80;

function Sidebar({ isOpen, onToggle }) {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Classrooms', icon: <ClassIcon />, path: '/classrooms' },
    { text: 'Exams', icon: <AssignmentIcon />, path: '/exams' },
    { text: 'Library', icon: <BookIcon />, path: '/library' },
  ];

  if (user?.role === 'student') {
    menuItems.push({ text: 'Counseling', icon: <PeopleIcon />, path: '/counseling' });
  }

  menuItems.push({ text: 'Profile', icon: <PersonIcon />, path: '/profile' });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: isOpen ? drawerWidth : collapsedWidth, 
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar>
        <IconButton 
          onClick={onToggle} 
          sx={{ ml: 'auto', display: isOpen ? 'block' : 'none' }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton 
          onClick={onToggle} 
          sx={{ ml: 'auto', display: isOpen ? 'none' : 'block' }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Toolbar>
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem 
              button 
              key={item.text} 
              component={Link} 
              to={item.path}
              sx={{ 
                justifyContent: isOpen ? 'flex-start' : 'center',
                px: isOpen ? 2 : 1,
                backgroundColor: isActive ? 'primary.light' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  backgroundColor: isActive ? 'primary.main' : 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: isOpen ? 56 : 'auto', color: isActive ? 'primary.contrastText' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              {isOpen && (
                <ListItemText 
                  primary={item.text} 
                  sx={{ '& .MuiListItemText-primary': { fontWeight: isActive ? 'bold' : 'normal' } }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

// Add prop type validation
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Sidebar;
