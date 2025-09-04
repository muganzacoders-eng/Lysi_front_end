import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../api';
import PropTypes from 'prop-types';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Add PropTypes validation
TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

TabPanel.defaultProps = {
  children: null,
};

function ParentDashboardPage() {
  const [children, setChildren] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchChildrenData();
  }, []);

  const fetchChildrenData = async () => {
    try {
      setLoading(true);
      const [childrenData, progressData] = await Promise.all([
        ApiService.getParentChildren(),
        ApiService.getChildrenProgress()
      ]);
      
      setChildren(childrenData);
      setProgressData(progressData);
    } catch (err) {
      console.error('Error fetching parent data:', err);
      setError('Failed to load children data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
        Parent Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="My Children" />
          <Tab label="Progress Reports" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            My Children
          </Typography>
          {children.length === 0 ? (
            <Typography color="textSecondary">No children registered</Typography>
          ) : (
            <Grid container spacing={3}>
              {children.map((child) => (
                <Grid item xs={12} md={6} key={child.user_id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar src={child.profile_picture_url} sx={{ mr: 2 }}>
                          {child.first_name[0]}{child.last_name[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">
                            {child.first_name} {child.last_name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {child.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<SchoolIcon />}
                          label={`Grade: ${child.studentProfile?.grade_level || 'N/A'}`}
                          size="small"
                        />
                        <Chip
                          label={child.role}
                          color="primary"
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Progress Reports
          </Typography>
          {/* Progress report content will go here */}
        </TabPanel>
      </Paper>
    </Box>
  );
}

export default ParentDashboardPage;