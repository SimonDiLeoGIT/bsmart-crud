import { RegisterResponseIterface, UserLoginInterface, UserRegisterInterface } from '../interfaces/UserInterfaces';
import ApiService from './api.service';

class UserService {
  static async register(userData: UserRegisterInterface): Promise<RegisterResponseIterface> {
    const response: RegisterResponseIterface = await ApiService.makeRequest('/register', 'POST', userData);
    return response;
  }

  static async login(userData: UserLoginInterface): Promise<RegisterResponseIterface> {
    const response: RegisterResponseIterface = await ApiService.makeRequest('/login', 'POST', userData);
    return response;
  }

  static async logout() {
    const response = await ApiService.makeRequest('/logout');
    return response;
  }
}

export default UserService;