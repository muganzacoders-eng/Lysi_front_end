// import React from 'react';
// import PropTypes from 'prop-types';
// import { 
//   Drawer, 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText,
//   Toolbar,
//   IconButton
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   Class as ClassIcon,
//   Assignment as AssignmentIcon,
//   Book as BookIcon,
//   People as PeopleIcon,
//   Person as PersonIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   TrendingUp as TrendingUpIcon,
//   Analytics as AnalyticsIcon
// } from '@mui/icons-material';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const drawerWidth = 240;
// const collapsedWidth = 80;

// function Sidebar({ isOpen, onToggle, isMobile }) {
//   const { user } = useAuth();
//   const location = useLocation();

//   const menuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
//     { text: 'Classrooms', icon: <ClassIcon />, path: '/classrooms' },
//     { text: 'Exams', icon: <AssignmentIcon />, path: '/exams' },
//     { text: 'Library', icon: <BookIcon />, path: '/library' },
//   ];

//   // Add parent-specific menu items
//   if (user?.role === 'parent') {
//     menuItems.push(
//       { text: 'Children', icon: <PeopleIcon />, path: '/parent/children' },
//       { text: 'Progress', icon: <TrendingUpIcon />, path: '/parent/progress' }
//     );
//   }

//   // Add admin-specific menu items
//   if (user?.role === 'admin') {
//     menuItems.push(
//       { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
//       { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin/analytics' }
//     );
//   }

//   // Add counseling for students
//   if (user?.role === 'student') {
//     menuItems.push({ text: 'Counseling', icon: <PeopleIcon />, path: '/counseling' });
//   }

//   menuItems.push({ text: 'Profile', icon: <PersonIcon />, path: '/profile' });

//   return (
//     <Drawer
//       variant={isMobile ? 'temporary' : 'permanent'}
//       open={isMobile ? isOpen : true}
//       onClose={isMobile ? onToggle : undefined}
//       sx={{
//         width: isOpen ? drawerWidth : collapsedWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: { 
//           width: isOpen ? drawerWidth : collapsedWidth, 
//           boxSizing: 'border-box',
//           transition: isMobile ? 'none' : 'width 0.3s ease',
//           overflowX: 'hidden',
//         },
//       }}
//     >
//       <Toolbar>
//         <IconButton 
//           onClick={onToggle} 
//           sx={{ ml: 'auto', display: isOpen ? 'block' : 'none' }}
//         >
//           <ChevronLeftIcon />
//         </IconButton>
//         <IconButton 
//           onClick={onToggle} 
//           sx={{ ml: 'auto', display: isOpen ? 'none' : 'block' }}
//         >
//           <ChevronRightIcon />
//         </IconButton>
//       </Toolbar>
//       <List>
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <ListItem 
//               button 
//               key={item.text} 
//               component={Link} 
//               to={item.path}
//               sx={{ 
//                 justifyContent: isOpen ? 'flex-start' : 'center',
//                 px: isOpen ? 2 : 1,
//                 backgroundColor: isActive ? 'primary.light' : 'transparent',
//                 color: isActive ? 'primary.contrastText' : 'text.primary',
//                 '&:hover': {
//                   backgroundColor: isActive ? 'primary.main' : 'action.hover',
//                 },
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: isOpen ? 56 : 'auto', color: isActive ? 'primary.contrastText' : 'inherit' }}>
//                 {item.icon}
//               </ListItemIcon>
//               {isOpen && (
//                 <ListItemText 
//                   primary={item.text} 
//                   sx={{ '& .MuiListItemText-primary': { fontWeight: isActive ? 'bold' : 'normal' } }}
//                 />
//               )}
//             </ListItem>
//           );
//         })}
//       </List>
//     </Drawer>
//   );
// }

// Sidebar.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onToggle: PropTypes.func.isRequired,
//   isMobile: PropTypes.bool.isRequired,
// };

// export default Sidebar;



import React from 'react';
import PropTypes from 'prop-types';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Toolbar,
  IconButton,
  Collapse
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon,
  School as SchoolIcon,
  Psychology as PsychologyIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;
const collapsedWidth = 80;

function Sidebar({ isOpen, onToggle, isMobile }) {
  const { user } = useAuth();
  const location = useLocation();
  const [openItems, setOpenItems] = React.useState({});

  const handleToggleItem = (itemKey) => {
    setOpenItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  // Base menu items for all roles
  const baseMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' }
  ];

  // Role-specific menu items
  const roleMenuItems = {
    student: [
      { text: 'Classrooms', icon: <ClassIcon />, path: '/classrooms' },
      { text: 'Exams', icon: <AssignmentIcon />, path: '/exams' },
      { text: 'Library', icon: <BookIcon />, path: '/library' },
      { text: 'Counseling', icon: <PeopleIcon />, path: '/counseling' }
    ],
    teacher: [
      { 
        text: 'Teaching', 
        icon: <SchoolIcon />, 
        items: [
          { text: 'My Classrooms', path: '/teacher/classrooms' },
          { text: 'Create Exam', path: '/exams/create' },
          { text: 'My Content', path: '/teacher/content' }
        ]
      },
      { text: 'Classrooms', icon: <ClassIcon />, path: '/classrooms' },
      { text: 'Exams', icon: <AssignmentIcon />, path: '/exams' },
      { text: 'Library', icon: <BookIcon />, path: '/library' }
    ],
    expert: [
      { 
        text: 'Counseling', 
        icon: <PsychologyIcon />, 
        items: [
          { text: 'My Sessions', path: '/expert/sessions' },
          { text: 'Availability', path: '/expert/availability' },
          { text: 'Reports', path: '/expert/reports' }
        ]
      },
      { text: 'Schedule', icon: <AssignmentIcon />, path: '/expert/schedule' }
    ],
    parent: [
      { text: 'Children', icon: <PeopleIcon />, path: '/parent/children' },
      { text: 'Progress', icon: <TrendingUpIcon />, path: '/parent/progress' }
    ],
    admin: [
      { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
      { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin/analytics' },
      { text: 'System Settings', icon: <AnalyticsIcon />, path: '/admin/settings' }
    ]
  };

  // Get menu items based on user role
  const menuItems = [
    ...baseMenuItems,
    ...(roleMenuItems[user?.role] || [])
  ];

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => {
      const isActive = location.pathname === item.path;
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = openItems[item.text];
      
      if (hasChildren) {
        return (
          <React.Fragment key={item.text}>
            <ListItem 
              button 
              onClick={() => handleToggleItem(item.text)}
              sx={{ 
                pl: level * 2 + 2,
                backgroundColor: isActive ? 'primary.light' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.primary',
              }}
            >
              <ListItemIcon sx={{ color: isActive ? 'primary.contrastText' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              {isOpen && (
                <>
                  <ListItemText primary={item.text} />
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </>
              )}
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.items, level + 1)}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      return (
        <ListItem 
          button 
          key={item.text} 
          component={Link} 
          to={item.path}
          sx={{ 
            pl: level * 2 + 2,
            backgroundColor: isActive ? 'primary.light' : 'transparent',
            color: isActive ? 'primary.contrastText' : 'text.primary',
            '&:hover': {
              backgroundColor: isActive ? 'primary.main' : 'action.hover',
            },
          }}
        >
          <ListItemIcon sx={{ color: isActive ? 'primary.contrastText' : 'inherit' }}>
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
    });
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? isOpen : true}
      onClose={isMobile ? onToggle : undefined}
      sx={{
        width: isOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: isOpen ? drawerWidth : collapsedWidth, 
          boxSizing: 'border-box',
          transition: isMobile ? 'none' : 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar>
        <IconButton 
          onClick={onToggle} 
          sx={{ ml: 'auto', display: { xs: 'none', sm: 'block' } }}
        >
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <List>
        {renderMenuItems(menuItems)}
      </List>
    </Drawer>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Sidebar;