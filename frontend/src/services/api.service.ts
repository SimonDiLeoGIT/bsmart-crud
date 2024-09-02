

class ApiService {
  static baseURL = 'http://localhost:8000/api';

  static async makeRequest<T>(endpoint: string, method = 'GET', body?: T, options: RequestInit = {}) {
    const config: RequestInit = {
      method,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      ...options,
    };
    if (body) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      };
      config.body = JSON.stringify(body);
    }

    return this.request(endpoint, config);
  }

  static async request(endpoint: string, options: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || 'An unknown error occurred');
      }
      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export default ApiService;