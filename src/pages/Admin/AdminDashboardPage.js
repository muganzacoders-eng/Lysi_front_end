// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   CircularProgress,
//   Alert,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem
// } from '@mui/material';
// import {
//   People as PeopleIcon,
//   TrendingUp as TrendingUpIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon
// } from '@mui/icons-material';
// import { useAuth } from '../../contexts/AuthContext';
// import ApiService from '../../api';

// function AdminDashboardPage() {
//   const [users, setUsers] = useState([]);
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {
//       setLoading(true);
//       const [usersData, statsData] = await Promise.all([
//         ApiService.getAllUsers(),
//         ApiService.getAdminStats()
//       ]);
      
//       setUsers(usersData);
//       setStats(statsData);
//     } catch (err) {
//       console.error('Error fetching admin data:', err);
//       setError('Failed to load admin data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setEditDialogOpen(true);
//   };

//   const handleCloseEditDialog = () => {
//     setEditDialogOpen(false);
//     setSelectedUser(null);
//   };

//   const handleSaveUser = async () => {
//     try {
//       await ApiService.updateUser(selectedUser.user_id, selectedUser);
//       setEditDialogOpen(false);
//       setSelectedUser(null);
//       fetchAdminData(); // Refresh data
//     } catch (err) {
//       console.error('Error updating user:', err);
//       setError('Failed to update user');
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Statistics Cards */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary" gutterBottom>
//                 Total Users
//               </Typography>
//               <Typography variant="h4">
//                 {stats.totalUsers || 0}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary" gutterBottom>
//                 Active Classrooms
//               </Typography>
//               <Typography variant="h4">
//                 {stats.activeClassrooms || 0}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary" gutterBottom>
//                 Total Exams
//               </Typography>
//               <Typography variant="h4">
//                 {stats.totalExams || 0}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary" gutterBottom>
//                 Counseling Sessions
//               </Typography>
//               <Typography variant="h4">
//                 {stats.counselingSessions || 0}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Users Table */}
//       <Paper>
//         <Typography variant="h6" sx={{ p: 2 }}>
//           User Management
//         </Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.user_id}>
//                   <TableCell>
//                     {user.first_name} {user.last_name}
//                   </TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     <Chip label={user.role} size="small" />
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       label={user.is_verified ? 'Verified' : 'Pending'}
//                       color={user.is_verified ? 'success' : 'warning'}
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       size="small"
//                       startIcon={<EditIcon />}
//                       onClick={() => handleEditUser(user)}
//                     >
//                       Edit
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {/* Edit User Dialog */}
//       <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent>
//           {selectedUser && (
//             <Box sx={{ pt: 1 }}>
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 value={selectedUser.first_name}
//                 onChange={(e) => setSelectedUser({...selectedUser, first_name: e.target.value})}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 value={selectedUser.last_name}
//                 onChange={(e) => setSelectedUser({...selectedUser, last_name: e.target.value})}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 select
//                 label="Role"
//                 value={selectedUser.role}
//                 onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
//                 margin="normal"
//               >
//                 <MenuItem value="student">Student</MenuItem>
//                 <MenuItem value="teacher">Teacher</MenuItem>
//                 <MenuItem value="expert">Expert</MenuItem>
//                 <MenuItem value="parent">Parent</MenuItem>
//                 <MenuItem value="admin">Admin</MenuItem>
//               </TextField>
//               <TextField
//                 fullWidth
//                 select
//                 label="Verification Status"
//                 value={selectedUser.is_verified}
//                 onChange={(e) => setSelectedUser({...selectedUser, is_verified: e.target.value})}
//                 margin="normal"
//               >
//                 <MenuItem value={true}>Verified</MenuItem>
//                 <MenuItem value={false}>Pending</MenuItem>
//               </TextField>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditDialog}>Cancel</Button>
//           <Button onClick={handleSaveUser} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default AdminDashboardPage;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../api';
import PropTypes from 'prop-types';


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [usersData, statsData] = await Promise.all([
        ApiService.getAllUsers(),
        ApiService.getAdminStats()
      ]);
      
      setUsers(usersData);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async () => {
    try {
      await ApiService.updateUser(selectedUser.user_id, selectedUser);
      setSuccess('User updated successfully');
      setEditDialogOpen(false);
      setSelectedUser(null);
      fetchAdminData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await ApiService.deleteUser(userId);
        setSuccess('User deleted successfully');
        fetchAdminData();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user');
      }
    }
  };

  const handleCreateUser = () => {
    setSelectedUser({
      first_name: '',
      last_name: '',
      email: '',
      role: 'student',
      is_verified: false
    });
    setEditDialogOpen(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="User Management" />
          <Tab label="System Analytics" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalUsers || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Active Classrooms
                  </Typography>
                  <Typography variant="h4">
                    {stats.activeClassrooms || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Exams
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalExams || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Counseling Sessions
                  </Typography>
                  <Typography variant="h4">
                    {stats.counselingSessions || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateUser}
            >
              Add User
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>
                      {user.first_name} {user.last_name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.is_verified ? 'Verified' : 'Pending'}
                        color={user.is_verified ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEditUser(user)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteUser(user.user_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            System Analytics
          </Typography>
          <Typography>
            Detailed analytics available in the Analytics section.
          </Typography>
        </TabPanel>
      </Paper>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser?.user_id ? 'Edit User' : 'Create User'}
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label="First Name"
                value={selectedUser.first_name}
                onChange={(e) => setSelectedUser({...selectedUser, first_name: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                value={selectedUser.last_name}
                onChange={(e) => setSelectedUser({...selectedUser, last_name: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                select
                label="Role"
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                margin="normal"
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
              <TextField
                fullWidth
                select
                label="Verification Status"
                value={selectedUser.is_verified}
                onChange={(e) => setSelectedUser({...selectedUser, is_verified: e.target.value})}
                margin="normal"
              >
                <MenuItem value={true}>Verified</MenuItem>
                <MenuItem value={false}>Pending</MenuItem>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">
            {selectedUser?.user_id ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboardPage;