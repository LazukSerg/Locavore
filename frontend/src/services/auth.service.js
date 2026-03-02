import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, phoneNumber, password, seller, firstName, lastName, region, settlement, street, building) {
    let data = {
      username,
      email,
      phoneNumber,
      password,
      role: seller ? "seller" : "buyer",
      region,
    };

    // Добавляем дополнительные поля только если seller = true
    if (seller) {
      Object.assign(data, {
        firstName,
        lastName,
        settlement,
        street,
        building
      });
    }

    return axios.post(API_URL + "signup", data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
