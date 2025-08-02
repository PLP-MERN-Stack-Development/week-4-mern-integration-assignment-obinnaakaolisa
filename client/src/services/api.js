const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    return response.json();
  },

  create: async (postData) => {
    return makeAuthenticatedRequest('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  update: async (id, postData) => {
    return makeAuthenticatedRequest(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  delete: async (id) => {
    return makeAuthenticatedRequest(`/posts/${id}`, {
      method: 'DELETE',
    });
  },

  // Comments
  addComment: async (postId, commentData) => {
    return makeAuthenticatedRequest(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  },

  updateComment: async (postId, commentId, commentData) => {
    return makeAuthenticatedRequest(`/posts/${postId}/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(commentData),
    });
  },

  deleteComment: async (postId, commentId) => {
    return makeAuthenticatedRequest(`/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
    });
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    return response.json();
  },

  getByName: async (name) => {
    const response = await fetch(`${API_BASE_URL}/categories/name/${name}`);
    return response.json();
  },

  create: async (categoryData) => {
    return makeAuthenticatedRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  update: async (id, categoryData) => {
    return makeAuthenticatedRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  delete: async (id) => {
    return makeAuthenticatedRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Upload API
export const uploadAPI = {
  uploadImage: async (imageFile) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return response.json();
  },
};