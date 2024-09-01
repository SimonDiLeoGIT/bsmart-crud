import { ErrorInterface } from "../interfaces/ErrorInterface";

class ApiService {
  static baseURL = 'http://localhost:8000/api';

  static async get(endpoint: string, options = {}) {
    return this.request(endpoint, {
      headers: {
        'Accept': 'application/json', 
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      method: 'GET',
      ...options,
    });
  }
  
  static async post<T>(endpoint: string, body: T, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
      ...options,
    });
  }

  static async put<T>(endpoint: string, body: T, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
      ...options,
    });
  }

  // static async 

  static async request(endpoint: string, options: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData: ErrorInterface = await response.json();
        return errorData;
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export default ApiService;