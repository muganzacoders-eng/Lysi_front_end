// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Outlet } from 'react-router-dom';
// import { ProtectedRoute, PublicRoute } from './routes/ProtectedRoute';
// import Layout from './layouts/Layout';
// import HomePage from './pages/Home/HomePage';
// import LoginPage from './pages/Auth/LoginPage';
// import RegisterPage from './pages/Auth/RegisterPage';
// import DashboardPage from './pages/Dashboard/DashboardPage';
// import ClassroomsPage from './pages/Classrooms/ClassroomsPage';
// import ClassroomDetailPage from './pages/Classrooms/ClassroomDetailPage';
// import ExamsPage from './pages/Exams/ExamsPage';
// import ExamDetailPage from './pages/Exams/ExamDetailPage';
// import LibraryPage from './pages/Library/LibraryPage';
// import CounselingPage from './pages/Counseling/CounselingPage';
// import ProfilePage from './pages/Profile/ProfilePage';
// import NotFoundPage from './pages/NotFoundPage';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import ParentDashboardPage from './pages/Parent/ParentDashboardPage';
// import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
// import AnalyticsPage from './pages/Admin/AnalyticsPage';
// import OnboardingModal from './components/onboarding/OnboardingModal';
// import { useAuth } from './contexts/AuthContext';

// // Layout route component
// const LayoutRoute = () => {
//   return (
//     <Layout>
//       <Outlet />
//     </Layout>
//   );
// };

// // Add a function to update user onboarding status
// const updateUserOnboardingStatus = () => {
//   // This would ideally update the user context
//   // For now, we'll use a simple approach
//   if (user) {
//     setUser({ ...user, hasCompletedOnboarding: true });
//   }
// };

// function App() {
//   const { user, isAuthenticated } = useAuth();
//   const [showOnboarding, setShowOnboarding] = useState(false);

//   useEffect(() => {
//     // Check if user has completed onboarding
//     if (isAuthenticated && user && !user.has_completed_onboarding) {
//       setShowOnboarding(true);
//     }
//   }, [isAuthenticated, user]);

//   const handleOnboardingComplete = () => {
//     setShowOnboarding(false);
//     // Mark onboarding as complete in user profile
//     // This would typically be an API call
//   };
  

//   return (
//     <ErrorBoundary>
//       {showOnboarding && (
//         <OnboardingModal 
//           user={user} 
//           open={showOnboarding} 
//           onComplete={handleOnboardingComplete} 
//         />
//       )}
      
//       <Routes>
//         {/* Public routes without layout */}
//         <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
//         <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        
//         {/* Routes with layout */}
//         <Route element={<LayoutRoute />}>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
//           <Route path="/classrooms" element={<ProtectedRoute><ClassroomsPage /></ProtectedRoute>} />
//           <Route path="/classrooms/:id" element={<ProtectedRoute><ClassroomDetailPage /></ProtectedRoute>} />
//           <Route path="/exams" element={<ProtectedRoute><ExamsPage /></ProtectedRoute>} />
//           <Route path="/exams/:id" element={<ProtectedRoute><ExamDetailPage /></ProtectedRoute>} />
//           <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
//           <Route path="/counseling" element={<ProtectedRoute><CounselingPage /></ProtectedRoute>} />
//           <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
//           <Route path="/parent/*" element={<ProtectedRoute><ParentDashboardPage /></ProtectedRoute>} />
//           <Route path="/admin/users" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
//           <Route path="/admin/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Route>
//       </Routes>
//     </ErrorBoundary>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './routes/ProtectedRoute';
import Layout from './layouts/Layout';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ClassroomsPage from './pages/Classrooms/ClassroomsPage';
import ClassroomDetailPage from './pages/Classrooms/ClassroomDetailPage';
import ExamsPage from './pages/Exams/ExamsPage';
import ExamDetailPage from './pages/Exams/ExamDetailPage';
import LibraryPage from './pages/Library/LibraryPage';
import CounselingPage from './pages/Counseling/CounselingPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import ParentDashboardPage from './pages/Parent/ParentDashboardPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AnalyticsPage from './pages/Admin/AnalyticsPage';
import OnboardingModal from './components/onboarding/OnboardingModal';
import { useAuth } from './contexts/AuthContext';
import ApiService from './api';

// Layout route component
const LayoutRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    if (isAuthenticated && user && !user.has_completed_onboarding) {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [isAuthenticated, user]);

  const handleOnboardingComplete = async () => {
    try {
      // Call API to mark onboarding as complete
      await ApiService.markOnboardingComplete();
      
      // Update user context to reflect onboarding completion
      if (updateUser) {
        updateUser({ ...user, has_completed_onboarding: true });
      }
      
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <ErrorBoundary>
      {showOnboarding && (
        <OnboardingModal 
          user={user} 
          onComplete={handleOnboardingComplete} 
        />
      )}
      
      <Routes>
        {/* Public routes without layout */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        
        {/* Routes with layout */}
        <Route element={<LayoutRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/classrooms" element={<ProtectedRoute><ClassroomsPage /></ProtectedRoute>} />
          <Route path="/classrooms/:id" element={<ProtectedRoute><ClassroomDetailPage /></ProtectedRoute>} />
          <Route path="/exams" element={<ProtectedRoute><ExamsPage /></ProtectedRoute>} />
          <Route path="/exams/:id" element={<ProtectedRoute><ExamDetailPage /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
          <Route path="/counseling" element={<ProtectedRoute><CounselingPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/parent/*" element={<ProtectedRoute><ParentDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;