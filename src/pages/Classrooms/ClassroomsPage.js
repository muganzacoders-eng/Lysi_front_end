import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Button,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../api';

function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await ApiService.getClassrooms();
      setClassrooms(data);
    } catch (err) {
      console.error('Error fetching classrooms:', err);
      setError('Failed to fetch classrooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

const handleJoinClassroom = async (classroomId) => {
  try {
    setError('');
    await ApiService.joinClassroom(classroomId);
    fetchClassrooms(); // Refresh the list
  } catch (err) {
    console.error('Error joining classroom:', err);
    setError(err.message || 'Failed to join classroom. Please try again.');
  }
};

const handleLeaveClassroom = async (classroomId) => {
  try {
    setError('');
    await ApiService.leaveClassroom(classroomId);
    fetchClassrooms(); // Refresh the list
  } catch (err) {
    console.error('Error leaving classroom:', err);
    setError(err.message || 'Failed to leave classroom. Please try again.');
  }
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
        Classrooms
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper elevation={2}>
        {classrooms.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              No classrooms found
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {user?.role === 'teacher' 
                ? 'Create your first classroom to get started.' 
                : 'Join a classroom to see it listed here.'}
            </Typography>
          </Box>
        ) : (
          <List>
            {classrooms.map((classroom) => (
              <ListItem 
                key={classroom.classroom_id} 
                divider
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'action.hover',
                    cursor: 'pointer' 
                  } 
                }}
                onClick={() => navigate(`/classrooms/${classroom.classroom_id}`)}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">{classroom.title}</Typography>
                      {classroom.is_active && (
                        <Chip label="Active" color="success" size="small" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        {classroom.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Students: {classroom.current_students}/{classroom.max_students || '∞'}
                      </Typography>
                      {classroom.schedule && (
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          Schedule: {JSON.stringify(classroom.schedule)}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {user?.role === 'student' && (
                    classroom.is_enrolled ? (
                      <Button 
                        variant="outlined" 
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeaveClassroom(classroom.classroom_id);
                        }}
                      >
                        Leave
                      </Button>
                    ) : (
                      <Button 
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJoinClassroom(classroom.classroom_id);
                        }}
                        disabled={classroom.current_students >= classroom.max_students}
                      >
                        Join
                      </Button>
                    )
                  )}
                  {user?.role === 'teacher' && classroom.teacher_id === user.user_id && (
                    <Button 
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/classrooms/${classroom.classroom_id}/edit`);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}

export default ClassroomsPage;