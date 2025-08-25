import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Toolbar  // Add this import
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  People as PeopleIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

function Sidebar() {
  const { user } = useAuth();

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
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;