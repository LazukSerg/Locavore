import axios from 'axios';
import authHeader from './auth-header';

const API_PRODUCT_URL = 'http://localhost:8080/api/product/';

class ProductService {

  getAllProducts(sellerId) {
    return axios.get(API_PRODUCT_URL + `all-by-seller/${sellerId}`,  { headers: authHeader() });
  }

  
  getProductById(id) {
    return axios.get(API_PRODUCT_URL + `${id}`,  { headers: authHeader() });
  }

  createProduct(data) {
    return axios.post(API_PRODUCT_URL + `create`, data, { headers: authHeader() });
  }
}

export default new ProductService();
