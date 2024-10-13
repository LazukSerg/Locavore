import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/order';

class OrderService {
  
  createOrder(data) {
    return axios.post(API_URL + '/create', data, { headers: authHeader() });
  }
}

export default new OrderService();
