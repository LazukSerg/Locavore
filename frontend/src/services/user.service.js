import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user';

class UserService {
  getById(id) {
    return axios.get(API_URL + "/" + id, null, { headers: authHeader() });
  }

  getSellerById(id) {
    return axios.get(API_URL + "/seller/" + id, null, { headers: authHeader() });
  }

  getAllSellersActive() {
    return axios.get(API_URL + "/all-seller/active", null, { headers: authHeader() });
  }

  getAllSellers() {
    return axios.get(API_URL + "/all-seller", { headers: authHeader() });
  }

  getAllBuyer() {
    return axios.get(API_URL + "/all-buyer", { headers: authHeader() });
  }

  blockUser(id) {
    return axios.put(API_URL + `/block/${id}?active=false`, { headers: authHeader() });
  }

  unblockUser(id) {
    return axios.put(API_URL + `/block/${id}?active=true`, { headers: authHeader() });
  }

  
}

export default new UserService();
