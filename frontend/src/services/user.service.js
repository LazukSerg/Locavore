import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user';

class UserService {
  getById(id) {
    return axios.get(API_URL + "/" + id, null, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
