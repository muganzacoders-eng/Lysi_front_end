import axios from 'axios';
import { debugApi } from '../utils/debug'; 

const API_BASE_URL = 'https://educationapi-2.onrender.com/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }


setupInterceptors() {
  // Request interceptor
  this.api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

   this.api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message;
      
      console.error('API Error:', {
        status,
        message,
        url: error.config?.url,
        method: error.config?.method
      });
      
      // Handle specific error cases
      if (status === 404) {
        error.message = 'Requested resource not found';
      } else if (status === 500) {
        error.message = 'Server error. Please try again later.';
      } else if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        error.message = message || 'An unexpected error occurred';
      }
      
      return Promise.reject(error);
    }
  );


this.api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error || error.message;
    const url = error.config?.url;
    
    console.error('API Error:', {
      status,
      message,
      url,
      method: error.config?.method,
      details: error.response?.data
    });
    
    // Handle specific error cases
    if (status === 404) {
      error.message = 'Requested resource not found';
    } else if (status === 500) {
      error.message = 'Server error. Please try again later.';
    } else if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      error.message = message || 'An unexpected error occurred';
    }
    
    return Promise.reject(error);
  }
);
}

  /* ================= AUTH ================= */
  async login(credentials) {
    const response = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData) {
    const response = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async getMe() {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  /* ================= USERS ================= */
  async getUsers() {
    const response = await this.api.get('/users');
    return response.data;
  }

  async getUser(id) {
    const response = await this.api.get(`/users/${id}`);
    return response.data;
  }

  async getClassrooms() {
  const response = await this.api.get('/classrooms');

  // Ensure it always returns an array
  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  return []; // Fallback to an empty array
}


  async getRecommendedContent() {
  const response = await this.api.get('/content/recommended');

  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  return [];
}


  async getContent(id) {
    const response = await this.api.get(`/content/${id}`);
    return response.data;
  }

  async getCounselingSession(id) {
    const response = await this.api.get(`/counseling/${id}`);
    return response.data;
  }

  /* ================= PAYMENTS ================= */
  async getPayments() {
    const response = await this.api.get('/payments');
    return response.data;
  }

  async createPayment(data) {
    const response = await this.api.post('/payments', data);
    return response.data;
  }

  /* ================= NOTIFICATIONS ================= */
  async getNotifications() {
    const response = await this.api.get('/notifications');
    return response.data;
  }

  async markNotificationRead(id) {
    const response = await this.api.patch(`/notifications/${id}/read`);
    return response.data;
  }

async getExams() {
  const response = await this.api.get('/exams');
  return response.data;
}


async getExam(id) {
  try {
    if (!id || isNaN(id)) {
      throw new Error('Invalid exam ID');
    }
    const response = await this.api.get(`/exams/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exam:', error);
    throw new Error('Failed to fetch exam data');
  }
}

async getExamQuestions(examId) {
  if (!examId) {
    throw new Error('Exam ID is required');
  }
  const response = await this.api.get(`/exams/${examId}/questions`);
  return response.data;
}

async startExam(examId) {
  const response = await this.api.post(`/exams/${examId}/start`);
  return response.data;
}

async submitExam(examId, answers) {
  const response = await this.api.post(`/exams/${examId}/submit`, { answers });
  return response.data;
}

  async createExam(examData) {
    const response = await this.api.post('/exams', examData);
    return response.data;
  }

async confirmCounselingSession(sessionId) {
  const response = await this.api.post(`/counseling/${sessionId}/confirm`);
  return response.data;
}

async cancelCounselingSession(sessionId) {
  const response = await this.api.post(`/counseling/${sessionId}/cancel`);
  return response.data;
}

async completeCounselingSession(sessionId) {
  const response = await this.api.post(`/counseling/${sessionId}/complete`);
  return response.data;
}

async getContentCategories() {
  const response = await this.api.get('/content/categories');
  return response.data;
}

async uploadContent(contentData, onUploadProgress = null) {
  const formData = new FormData();
  Object.keys(contentData).forEach(key => {
    if (contentData[key] !== null) {
      formData.append(key, contentData[key]);
    }
  });


  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  // Add progress callback if provided
  if (onUploadProgress) {
    config.onUploadProgress = onUploadProgress;
  }

  const response = await this.api.post('/content', formData, config);
  return response.data;
}

async getContentById(contentId) {
  const response = await this.api.get(`/content/${contentId}`);
  return response.data;
}


async getClassroom(id) {
  const response = await this.api.get(`/classrooms/${id}`);
  return response.data;
}


async getClassroomExams(classroomId) {
  try {
    const response = await this.api.get(`/exams`);
    return response.data.filter(exam => exam.classroom_id == classroomId);
  } catch (error) {
    console.error('Error fetching classroom exams:', error);
    return [];
  }
}

async joinClassroom(classroomId) {
  try {
    const response = await this.api.post(`/classrooms/${classroomId}/join`);
    return response.data;
  } catch (error) {
    console.error('Error joining classroom:', error);
    throw new Error(error.response?.data?.error || 'Failed to join classroom. Please try again.');
  }
}

async leaveClassroom(classroomId) {
  try {
    const response = await this.api.post(`/classrooms/${classroomId}/leave`);
    return response.data;
  } catch (error) {
    console.error('Error leaving classroom:', error);
    throw new Error(error.response?.data?.error || 'Failed to leave classroom. Please try again.');
  }
}

async getClassroomStudents(classroomId) {
  try {
    const response = await this.api.get(`/classrooms/${classroomId}/students`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching classroom students:', error);
    throw new Error('Failed to fetch classroom students. Please try again.');
  }
}

async getCounselingSessions() {
  try {
    const response = await this.api.get('/counseling');
    return response.data;
  } catch (error) {
    console.error('Error fetching counseling sessions:', error);
    return [];
  }
}

async getExperts() {
  try {
    const response = await this.api.get('/users?role=expert');
    console.log("API Experts response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching experts:', error);
    return [];
  }
}
async requestCounselingSession(sessionData) {
  const response = await this.api.post('/counseling', sessionData);
  return response.data;
}

async getLibraryContent() {
  try {
    const response = await this.api.get('/content');
    return response.data;
  } catch (error) {
    console.error('Error fetching library content:', error);
    return [];
  }
}

// async getExamQuestions(examId) {
//   try {
//     const response = await this.api.get(`/exams/${examId}/questions`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching exam questions:', error);
//     throw new Error('Failed to fetch exam questions');
//   }
// }

async getExamAttempts(examId) {
  try {
    const response = await this.api.get(`/exams/${examId}/attempts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exam attempts:', error);
    throw new Error('Failed to fetch exam attempts');
  }
}

async getExamResults(examId) {
  try {
    const response = await this.api.get(`/exams/${examId}/results`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exam results:', error);
    throw new Error('Failed to fetch exam results');
  }
}

async createClassroomMeeting(meetingData) {
  const response = await this.api.post('/meetings/classrooms/meetings', meetingData);
  return response.data;
}

async generateInstantClassroomMeeting(classroomId) {
  const response = await this.api.get(`/meetings/classrooms/${classroomId}/instant-meeting`);
  return response.data;
}

async createCounselingMeeting(meetingData) {
  const response = await this.api.post('/counseling/meetings', meetingData);
  return response.data;
}

async generateInstantCounselingMeeting() {
  const response = await this.api.post('/meetings/counseling/generate-instant-meeting');
  return response.data;
}

async confirmCounselingSessionWithMeet(sessionId, meetingData) {
  const response = await this.api.post(`/counseling/${sessionId}/confirm-with-meet`, meetingData);
  return response.data;
}


async purchaseContent(contentId) {
  const response = await this.api.post(`/content/${contentId}/purchase`);
  return response.data;
}

async trackContentDownload(contentId) {
  const response = await this.api.post(`/content/${contentId}/download`);
  return response.data;
}

async getParentChildren() {
  const response = await this.api.get('/parent/children');
  return response.data;
}

async getChildrenProgress() {
  const response = await this.api.get('/parent/progress');
  return response.data;
}

async getAllUsers() {
  const response = await this.api.get('/admin/users');
  return response.data;
}

async getAdminStats() {
  const response = await this.api.get('/admin/stats');
  return response.data;
}

async updateUser(userId, userData) {
  const response = await this.api.put(`/admin/users/${userId}`, userData);
  return response.data;
}

async verifyUser(userId) {
  const response = await this.api.post(`/admin/users/${userId}/verify`);
  return response.data;
}


async markOnboardingComplete() {
  const response = await this.api.patch('/users/me/onboarding-complete');
  return response.data;
}

}

const apiService = new ApiService();

export default apiService;

