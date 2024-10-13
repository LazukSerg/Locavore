import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/category/';

class CategoryService {
  getAll() {
    return axios.get(API_URL + 'all',  { headers: authHeader() });
  }

  getProductsByCategoryId(id) {
    var a = axios.get(API_URL + `${id}`, { headers: authHeader() });
    return a
  }
}

export default new CategoryService();
