import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ErrorBoundary>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="classrooms" element={<ProtectedRoute><ClassroomsPage /></ProtectedRoute>} />
        <Route path="classrooms/:id" element={<ProtectedRoute><ClassroomDetailPage /></ProtectedRoute>} />
        <Route path="exams" element={<ProtectedRoute><ExamsPage /></ProtectedRoute>} />
        <Route path="exams/:id" element={<ProtectedRoute><ExamDetailPage /></ProtectedRoute>} />
        <Route path="library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
        <Route path="counseling" element={<ProtectedRoute><CounselingPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </ErrorBoundary>
  );
}

export default App;