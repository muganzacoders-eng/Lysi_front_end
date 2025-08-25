import axios from 'axios';
import { debugApi } from '../utils/debug'; 

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://educationapi-n33q.onrender.com';

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

  // setupInterceptors() {
  //   // Request interceptor → attach token if available
  //   this.api.interceptors.request.use(
  //     (config) => {
  //       const token = localStorage.getItem('token');
  //       if (token) {
  //         config.headers.Authorization = `Bearer ${token}`;
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   // Response interceptor → handle 401s
  //   this.api.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       if (error.response?.status === 401) {
  //         localStorage.removeItem('token');
  //         window.location.href = '/login';
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   this.api.interceptors.request.use(debugApi.logRequest, debugApi.logError);
  //   this.api.interceptors.response.use(debugApi.logResponse, debugApi.logError);
  // }

// Enhance setupInterceptors with better error handling
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

  // Response interceptor
  this.api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // Provide better error messages
      if (error.response?.data?.error) {
        error.message = error.response.data.error;
      } else if (error.response?.status === 500) {
        error.message = 'Server error. Please try again later.';
      } else if (error.response?.status === 404) {
        error.message = 'Resource not found.';
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

  /* ================= CLASSROOMS ================= */
  async getClassrooms() {
    const response = await this.api.get('/classrooms');
    return response.data;
  }

  // async getClassroom(id) {
  //   const response = await this.api.get(`/classrooms/${id}`);
  //   return response.data;
  // }

  /* ================= EXAMS ================= */
  // async getExams() {
  //   const response = await this.api.get('/exams');
  //   return response.data;
  // }

  // async getExam(id) {
  //   const response = await this.api.get(`/exams/${id}`);
  //   return response.data;
  // }

  /* ================= CONTENT ================= */
  async getRecommendedContent() {
    const response = await this.api.get('/content/recommended');
    return response.data;
  }

  async getContent(id) {
    const response = await this.api.get(`/content/${id}`);
    return response.data;
  }

  /* ================= COUNSELING ================= */
  // async getCounselingSessions() {
  //   const response = await this.api.get('/counseling');
  //   return response.data;
  // }

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

  // Add these methods to your ApiService class in src/api/index.js

// async getClassroom(id) {
//   const response = await this.api.get(`/classrooms/${id}`);
//   return response.data;
// }

// async getClassroomStudents(classroomId) {
//   const response = await this.api.get(`/classrooms/${classroomId}/students`);
//   return response.data;
// }

// async getClassroomExams(classroomId) {
//   const response = await this.api.get(`/classrooms/${classroomId}/exams`);
//   return response.data;
// }

// async joinClassroom(classroomId) {
//   const response = await this.api.post(`/classrooms/${classroomId}/join`);
//   return response.data;
// }

// async leaveClassroom(classroomId) {
//   const response = await this.api.post(`/classrooms/${classroomId}/leave`);
//   return response.data;
// }

// Add these methods to your ApiService class

async getExams() {
  const response = await this.api.get('/exams');
  return response.data;
}

async getExam(id) {
  const response = await this.api.get(`/exams/${id}`);
  return response.data;
}

async getExamQuestions(examId) {
  const response = await this.api.get(`/exams/${examId}/questions`);
  return response.data;
}

async getExamAttempts(examId) {
  const response = await this.api.get(`/exams/${examId}/attempts`);
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

// Add these methods to your ApiService class

// async getCounselingSessions() {
//   const response = await this.api.get('/counseling');
//   return response.data;
// }

// async getExperts() {
//   const response = await this.api.get('/users?role=expert');
//   return response.data;
// }

// async requestCounselingSession(sessionData) {
//   const response = await this.api.post('/counseling', sessionData);
//   return response.data;
// }

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

// Add these methods to your ApiService class

// async getLibraryContent() {
//   const response = await this.api.get('/content');
//   return response.data;
// }

async getContentCategories() {
  const response = await this.api.get('/content/categories');
  return response.data;
}

async uploadContent(contentData) {
  const formData = new FormData();
  Object.keys(contentData).forEach(key => {
    if (contentData[key] !== null) {
      formData.append(key, contentData[key]);
    }
  });

  const response = await this.api.post('/content', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

async purchaseContent(contentId) {
  const response = await this.api.post(`/content/${contentId}/purchase`);
  return response.data;
}

async getContentById(contentId) {
  const response = await this.api.get(`/content/${contentId}`);
  return response.data;
}

// Add these methods to your ApiService class

async getClassroom(id) {
  const response = await this.api.get(`/classrooms/${id}`);
  return response.data;
}

// async getClassroomStudents(classroomId) {
//   try {
//     const response = await this.api.get(`/classrooms/${classroomId}`);
//     return response.data.Enrollments || [];
//   } catch (error) {
//     console.error('Error fetching classroom students:', error);
//     return [];
//   }
// }

// async getClassroomStudents(classroomId) {
//   try {
//     const response = await this.api.get(`/classrooms/${classroomId}`);
//     return response.data.enrollments || [];  // lowercase
//   } catch (error) {
//     console.error('Error fetching classroom students:', error);
//     return [];
//   }
// }


async getClassroomExams(classroomId) {
  try {
    const response = await this.api.get(`/exams`);
    // Filter exams by classroom ID on the client side since the endpoint might not exist
    return response.data.filter(exam => exam.classroom_id == classroomId);
  } catch (error) {
    console.error('Error fetching classroom exams:', error);
    return [];
  }
}

// async joinClassroom(classroomId) {
//   const response = await this.api.post(`/classrooms/${classroomId}/join`);
//   return response.data;
// }

// async leaveClassroom(classroomId) {
//   const response = await this.api.post(`/classrooms/${classroomId}/leave`);
//   return response.data;
// }

// Add these missing methods to fix the join classroom issue
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

// Fix getClassroomStudents method
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

}

// ✅ Assign instance to a variable before exporting (fixes ESLint warning)
const apiService = new ApiService();
export default apiService;