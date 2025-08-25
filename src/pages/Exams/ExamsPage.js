// // import React from 'react';
// // import { Box, Typography } from '@mui/material';

// // function ExamsPage() {
// //   return (
// //     <Box>
// //       <Typography variant="h4">Exams</Typography>
// //       <Typography>List of exams will appear here</Typography>
// //     </Box>
// //   );
// // }

// // export default ExamsPage;


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   Button,
//   Chip,
//   CircularProgress,
//   Alert,
//   Grid,
//   Card,
//   CardContent,
//   CardActions
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import ApiService from '../../api';
// import {
//   AccessTime as AccessTimeIcon,
//   Assignment as AssignmentIcon,
//   School as SchoolIcon
// } from '@mui/icons-material';

// function ExamsPage() {
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   // const fetchExams = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError('');
//   //     const data = await ApiService.getExams();
//   //     setExams(data);
//   //   } catch (err) {
//   //     console.error('Error fetching exams:', err);
//   //     setError('Failed to fetch exams. Please try again.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//       // Update the fetchExams function
// // const fetchExams = async () => {
// //   try {
// //     setLoading(true);
// //     setError('');
// //     const data = await ApiService.getExams();
    
// //     // Ensure exams have proper structure
// //     const formattedExams = data.map(exam => ({
// //       ...exam,
// //       date: exam.start_time ? new Date(exam.start_time).toLocaleDateString() : 'No date set',
// //       duration: exam.duration_minutes ? `${exam.duration_minutes} minutes` : 'No duration set'
// //     }));
    
// //     setExams(formattedExams);
// //   } catch (err) {
// //     console.error('Error fetching exams:', err);
// //     setError('Failed to fetch exams. Please try again.');
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// // Update the fetchExams function to handle empty results
// const fetchExams = async () => {
//   try {
//     setLoading(true);
//     setError('');
//     const data = await ApiService.getExams();
    
//     // Handle case where student is not enrolled in any classrooms
//     if (data.length === 0 && user?.role === 'student') {
//       setExams([]);
//       return;
//     }
    
//     // Ensure exams have proper structure
//     const formattedExams = data.map(exam => ({
//       ...exam,
//       date: exam.start_time ? new Date(exam.start_time).toLocaleDateString() : 'No date set',
//       duration: exam.duration_minutes ? `${exam.duration_minutes} minutes` : 'No duration set'
//     }));
    
//     setExams(formattedExams);
//   } catch (err) {
//     console.error('Error fetching exams:', err);
//     setError('Failed to fetch exams. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleStartExam = async (examId) => {
//     try {
//       const attempt = await ApiService.startExam(examId);
//       navigate(`/exams/${examId}/attempt/${attempt.attempt_id}`);
//     } catch (err) {
//       console.error('Error starting exam:', err);
//       setError('Failed to start exam. Please try again.');
//     }
//   };

//   const getExamStatus = (exam) => {
//     const now = new Date();
//     const startTime = new Date(exam.start_time);
//     const endTime = new Date(exam.end_time);

//     if (!exam.is_published) return { status: 'draft', color: 'default', label: 'Draft' };
//     if (now < startTime) return { status: 'scheduled', color: 'info', label: 'Scheduled' };
//     if (now > endTime) return { status: 'completed', color: 'success', label: 'Completed' };
//     return { status: 'ongoing', color: 'warning', label: 'Ongoing' };
//   };

//   const canTakeExam = (exam) => {
//     if (user?.role !== 'student') return false;
//     if (!exam.is_published) return false;
    
//     const now = new Date();
//     const startTime = new Date(exam.start_time);
//     const endTime = new Date(exam.end_time);
    
//     return now >= startTime && now <= endTime;
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
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4">Exams</Typography>
//         {user?.role === 'teacher' && (
//           <Button variant="contained" onClick={() => navigate('/exams/create')}>
//             Create Exam
//           </Button>
//         )}
//       </Box>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
//           {error}
//         </Alert>
//       )}

//       {exams.length === 0 ? (
//         <Paper sx={{ p: 4, textAlign: 'center' }}>
//           <AssignmentIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
//           <Typography variant="h6" color="textSecondary" gutterBottom>
//             No exams found
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             {user?.role === 'teacher' 
//               ? 'Create your first exam to get started.' 
//               : 'No exams are available at the moment.'}
//           </Typography>
//         </Paper>
//       ) : (
//         <Grid container spacing={3}>
//           {exams.map((exam) => {
//             const status = getExamStatus(exam);
//             const canTake = canTakeExam(exam);

//             return (
//               <Grid item xs={12} md={6} lg={4} key={exam.exam_id}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//                       <Typography variant="h6" component="h2" gutterBottom>
//                         {exam.title}
//                       </Typography>
//                       <Chip
//                         label={status.label}
//                         color={status.color}
//                         size="small"
//                       />
//                     </Box>

//                     <Typography variant="body2" color="textSecondary" gutterBottom>
//                       {exam.description}
//                     </Typography>

//                     <Box sx={{ mt: 2 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                         <AccessTimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
//                         <Typography variant="body2">
//                           {exam.duration_minutes} minutes
//                         </Typography>
//                       </Box>

//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                         <SchoolIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
//                         <Typography variant="body2">
//                           {exam.total_marks} marks
//                         </Typography>
//                       </Box>

//                       {exam.start_time && (
//                         <Typography variant="body2" sx={{ mt: 1 }}>
//                           Starts: {new Date(exam.start_time).toLocaleString()}
//                         </Typography>
//                       )}

//                       {exam.end_time && (
//                         <Typography variant="body2">
//                           Ends: {new Date(exam.end_time).toLocaleString()}
//                         </Typography>
//                       )}
//                     </Box>
//                   </CardContent>

//                   <CardActions>
//                     <Button
//                       size="small"
//                       onClick={() => navigate(`/exams/${exam.exam_id}`)}
//                     >
//                       View Details
//                     </Button>
                    
//                     {canTake && (
//                       <Button
//                         size="small"
//                         variant="contained"
//                         onClick={() => handleStartExam(exam.exam_id)}
//                         sx={{ ml: 'auto' }}
//                       >
//                         Start Exam
//                       </Button>
//                     )}

//                     {user?.role === 'teacher' && exam.created_by === user.user_id && (
//                       <Button
//                         size="small"
//                         onClick={() => navigate(`/exams/${exam.exam_id}/edit`)}
//                       >
//                         Edit
//                       </Button>
//                     )}
//                   </CardActions>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}
//     </Box>
//   );
// }

// export default ExamsPage;



import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../api';
import {
  AccessTime as AccessTimeIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon
} from '@mui/icons-material';

function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    classroom_id: '',
    duration_minutes: 60,
    total_marks: 100,
    instructions: ''
  });
  const [classrooms, setClassrooms] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Wrap fetchExams in useCallback to prevent infinite re-renders
  const fetchExams = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await ApiService.getExams();
      
      // Handle case where student is not enrolled in any classrooms
      if (data.length === 0 && user?.role === 'student') {
        setExams([]);
        return;
      }
      
      // Ensure exams have proper structure
      const formattedExams = data.map(exam => ({
        ...exam,
        date: exam.start_time ? new Date(exam.start_time).toLocaleDateString() : 'No date set',
        duration: exam.duration_minutes ? `${exam.duration_minutes} minutes` : 'No duration set'
      }));
      
      setExams(formattedExams);
    } catch (err) {
      console.error('Error fetching exams:', err);
      setError('Failed to fetch exams. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]); // Add user as dependency

  // Wrap fetchClassrooms in useCallback
  const fetchClassrooms = useCallback(async () => {
    try {
      const data = await ApiService.getClassrooms();
      // Filter classrooms where the current user is the teacher
      const teacherClassrooms = data.filter(classroom => 
        classroom.teacher_id === user.user_id
      );
      setClassrooms(teacherClassrooms);
    } catch (err) {
      console.error('Error fetching classrooms:', err);
    }
  }, [user]); // Add user as dependency

  useEffect(() => {
    fetchExams();
    if (user?.role === 'teacher') {
      fetchClassrooms();
    }
  }, [user, fetchExams, fetchClassrooms]); // Add all dependencies

  const handleCreateExam = async () => {
    try {
      await ApiService.createExam(newExam);
      setShowCreateForm(false);
      setNewExam({
        title: '',
        description: '',
        classroom_id: '',
        duration_minutes: 60,
        total_marks: 100,
        instructions: ''
      });
      // Refresh exams list
      fetchExams();
    } catch (error) {
      console.error('Error creating exam:', error);
      setError('Failed to create exam. Please try again.');
    }
  };

  const handleStartExam = async (examId) => {
    try {
      const attempt = await ApiService.startExam(examId);
      navigate(`/exams/${examId}/attempt/${attempt.attempt_id}`);
    } catch (err) {
      console.error('Error starting exam:', err);
      setError('Failed to start exam. Please try again.');
    }
  };

  const getExamStatus = (exam) => {
    const now = new Date();
    const startTime = new Date(exam.start_time);
    const endTime = new Date(exam.end_time);

    if (!exam.is_published) return { status: 'draft', color: 'default', label: 'Draft' };
    if (now < startTime) return { status: 'scheduled', color: 'info', label: 'Scheduled' };
    if (now > endTime) return { status: 'completed', color: 'success', label: 'Completed' };
    return { status: 'ongoing', color: 'warning', label: 'Ongoing' };
  };

  const canTakeExam = (exam) => {
    if (user?.role !== 'student') return false;
    if (!exam.is_published) return false;
    
    const now = new Date();
    const startTime = new Date(exam.start_time);
    const endTime = new Date(exam.end_time);
    
    return now >= startTime && now <= endTime;
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Exams</Typography>
        {user?.role === 'teacher' && (
          <Button variant="contained" onClick={() => setShowCreateForm(true)}>
            Create Exam
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {exams.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <AssignmentIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No exams found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.role === 'teacher' 
              ? 'Create your first exam to get started.' 
              : 'No exams are available at the moment.'}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {exams.map((exam) => {
            const status = getExamStatus(exam);
            const canTake = canTakeExam(exam);

            return (
              <Grid item xs={12} md={6} lg={4} key={exam.exam_id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {exam.title}
                      </Typography>
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                      />
                    </Box>

                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {exam.description}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {exam.duration_minutes} minutes
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SchoolIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {exam.total_marks} marks
                        </Typography>
                      </Box>

                      {exam.start_time && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Starts: {new Date(exam.start_time).toLocaleString()}
                        </Typography>
                      )}

                      {exam.end_time && (
                        <Typography variant="body2">
                          Ends: {new Date(exam.end_time).toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/exams/${exam.exam_id}`)}
                    >
                      View Details
                    </Button>
                    
                    {canTake && (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleStartExam(exam.exam_id)}
                        sx={{ ml: 'auto' }}
                      >
                        Start Exam
                      </Button>
                    )}

                    {user?.role === 'teacher' && exam.created_by === user.user_id && (
                      <Button
                        size="small"
                        onClick={() => navigate(`/exams/${exam.exam_id}/edit`)}
                      >
                        Edit
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Create Exam Modal */}
      {showCreateForm && (
        <Dialog open={showCreateForm} onClose={() => setShowCreateForm(false)} maxWidth="md" fullWidth>
          <DialogTitle>Create New Exam</DialogTitle>
          <DialogContent>
            <TextField
              label="Exam Title"
              value={newExam.title}
              onChange={(e) => setNewExam({...newExam, title: e.target.value})}
              fullWidth
              margin="normal"
              required
            />
            
            <TextField
              label="Description"
              value={newExam.description}
              onChange={(e) => setNewExam({...newExam, description: e.target.value})}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />

            <TextField
              select
              label="Classroom"
              value={newExam.classroom_id}
              onChange={(e) => setNewExam({...newExam, classroom_id: e.target.value})}
              fullWidth
              margin="normal"
              required
            >
              {classrooms.map((classroom) => (
                <MenuItem key={classroom.classroom_id} value={classroom.classroom_id}>
                  {classroom.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Duration (minutes)"
              type="number"
              value={newExam.duration_minutes}
              onChange={(e) => setNewExam({...newExam, duration_minutes: parseInt(e.target.value)})}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Total Marks"
              type="number"
              value={newExam.total_marks}
              onChange={(e) => setNewExam({...newExam, total_marks: parseInt(e.target.value)})}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Instructions"
              value={newExam.instructions}
              onChange={(e) => setNewExam({...newExam, instructions: e.target.value})}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateForm(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateExam} 
              variant="contained"
              disabled={!newExam.title || !newExam.classroom_id}
            >
              Create Exam
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default ExamsPage;