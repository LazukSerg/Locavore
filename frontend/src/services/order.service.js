import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/order';

class OrderService {
  
  createOrder(data) {
    return axios.post(API_URL + '/create', data, { headers: authHeader() });
  }

  getOrdersByUser(role, id) {
    return axios.get(API_URL + `/all/${role}/${id}`, { headers: authHeader() });
  }

  getOrderById(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  }

  updateOrderStatus(id, status) {
    return axios.patch(API_URL + `/${id}?status=${encodeURIComponent(status)}`, status, { headers: authHeader() });
  }

}

export default new OrderService();
