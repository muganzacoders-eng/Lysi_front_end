// import React from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { Box, Typography, Paper, Grid } from '@mui/material';
// import ClassroomCard from '../../components/dashboard/ClassroomCard';
// import ExamCard from '../../components/dashboard/ExamCard';
// import CounselingCard from '../../components/dashboard/CounselingCard';
// import ContentCard from '../../components/dashboard/ContentCard';
// import { useNavigate } from 'react-router-dom';

// function DashboardPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // Mock data - in a real app, you would fetch this from your API
//   const classrooms = [
//     { id: 1, title: 'Algebra I', description: 'Morning class', schedule: 'Mon/Wed/Fri 9:00 AM' },
//     { id: 2, title: 'Biology', description: 'Afternoon class', schedule: 'Tue/Thu 1:00 PM' },
//   ];

//   const upcomingExams = [
//     { id: 1, title: 'Algebra Midterm', date: '2023-11-15', duration: '60 minutes' },
//     { id: 2, title: 'Biology Quiz', date: '2023-11-20', duration: '30 minutes' },
//   ];

//   const counselingSessions = [
//     { id: 1, expert: 'Dr. Smith', date: '2023-11-18', time: '2:00 PM' },
//   ];

//   const recommendedContent = [
//     { id: 1, title: 'Algebra Basics', type: 'PDF', category: 'Mathematics' },
//     { id: 2, title: 'Cell Biology', type: 'Video', category: 'Science' },
//   ];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Welcome, {user?.first_name}!
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         {user?.role === 'student' ? 'Student Dashboard' : 
//          user?.role === 'teacher' ? 'Teacher Dashboard' : 'Expert Dashboard'}
//       </Typography>

//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Your Classrooms
//             </Typography>
//             {classrooms.map((classroom) => (
//               <ClassroomCard 
//                 key={classroom.id}
//                 classroom={classroom}
//                 onClick={() => navigate(`/classrooms/${classroom.id}`)}
//               />
//             ))}
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Upcoming Exams
//             </Typography>
//             {upcomingExams.map((exam) => (
//               <ExamCard 
//                 key={exam.id}
//                 exam={exam}
//                 onClick={() => navigate(`/exams/${exam.id}`)}
//               />
//             ))}
//           </Paper>
//         </Grid>

//         {user?.role === 'student' && (
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Counseling Sessions
//               </Typography>
//               {counselingSessions.map((session) => (
//                 <CounselingCard 
//                   key={session.id}
//                   session={session}
//                   onClick={() => navigate('/counseling')}
//                 />
//               ))}
//             </Paper>
//           </Grid>
//         )}

//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Recommended Content
//             </Typography>
//             {recommendedContent.map((content) => (
//               <ContentCard 
//                 key={content.id}
//                 content={content}
//                 onClick={() => navigate('/library')}
//               />
//             ))}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default DashboardPage;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import ClassroomCard from '../../components/dashboard/ClassroomCard';
import ExamCard from '../../components/dashboard/ExamCard';
import CounselingCard from '../../components/dashboard/CounselingCard';
import ContentCard from '../../components/dashboard/ContentCard';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../api';

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // States
  const [classrooms, setClassrooms] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [counselingSessions, setCounselingSessions] = useState([]);
  const [recommendedContent, setRecommendedContent] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const [classroomData, examData, contentData] = await Promise.all([
    //       ApiService.getClassrooms(),
    //       ApiService.getExams(),            // ⬅️ make sure this exists in ApiService
    //       ApiService.getRecommendedContent() // ⬅️ make sure this exists too
    //     ]);

    //     setClassrooms(classroomData);
    //     setUpcomingExams(examData);
    //     setRecommendedContent(contentData);

    //     if (user?.role === 'student') {
    //       const counselingData = await ApiService.getCounselingSessions();
    //       setCounselingSessions(counselingData);
    //     }
    //   } catch (err) {
    //     setError('Failed to fetch dashboard data');
    //     console.error('Error fetching dashboard data:', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // Update the fetchData function
const fetchData = async () => {
  try {
    const [classroomData, contentData] = await Promise.all([
      ApiService.getClassrooms(),
      ApiService.getRecommendedContent()
    ]);

    setClassrooms(classroomData);
    setRecommendedContent(contentData);

    // For students, fetch counseling sessions
    if (user?.role === 'student') {
      try {
        const counselingData = await ApiService.getCounselingSessions();
        setCounselingSessions(counselingData);
      } catch (err) {
        console.error('Error fetching counseling sessions:', err);
      }
    }

    // For exams, we need to handle this differently since the endpoint might not exist
    try {
      const examData = await ApiService.getExams();
      setUpcomingExams(examData);
    } catch (err) {
      console.error('Error fetching exams:', err);
    }
  } catch (err) {
    setError('Failed to fetch dashboard data');
    console.error('Error fetching dashboard data:', err);
  } finally {
    setLoading(false);
  }
};

    fetchData();
  }, [user?.role]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user?.first_name}!
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Classrooms */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Classrooms
            </Typography>
            {classrooms.length === 0 ? (
              <Typography>No classrooms found</Typography>
            ) : (
              classrooms.map((classroom) => (
                <ClassroomCard 
                  key={classroom.classroom_id}
                  classroom={classroom}
                  onClick={() => navigate(`/classrooms/${classroom.classroom_id}`)}
                />
              ))
            )}
          </Paper>
        </Grid>

        {/* Upcoming Exams */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Exams
            </Typography>
            {upcomingExams.length === 0 ? (
              <Typography>No upcoming exams</Typography>
            ) : (
              upcomingExams.map((exam) => (
                <ExamCard 
                  key={exam.id}
                  exam={exam}
                  onClick={() => navigate(`/exams/${exam.id}`)}
                />
              ))
            )}
          </Paper>
        </Grid>

        {/* Counseling Sessions - Only for Students */}
        {user?.role === 'student' && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Counseling Sessions
              </Typography>
              {counselingSessions.length === 0 ? (
                <Typography>No counseling sessions available</Typography>
              ) : (
                counselingSessions.map((session) => (
                  <CounselingCard 
                    key={session.id}
                    session={session}
                    onClick={() => navigate('/counseling')}
                  />
                ))
              )}
            </Paper>
          </Grid>
        )}

        {/* Recommended Content */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recommended Content
            </Typography>
            {recommendedContent.length === 0 ? (
              <Typography>No content available</Typography>
            ) : (
              recommendedContent.map((content) => (
                <ContentCard 
                  key={content.id}
                  content={content}
                  onClick={() => navigate('/library')}
                />
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
