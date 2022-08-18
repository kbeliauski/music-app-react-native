import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { Actions } from 'react-native-router-flux';

const API_URL = "http://127.0.0.1:8000";

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL + "token-auth/", {
        username,
        password
      });
    if (response.data.user) {
      SecureStore.setItemAsync("user", JSON.stringify(response.data))
      SecureStore.getItemAsync("user").then(value => {
        console.log(value)
      })
    }
    return response.data;
  }

  logout() {
    SecureStore.deleteItemAsync("user");

  }

  async register(username, password) {
    return axios.post(API_URL + "users/", {
      username,
      password
    })
    .then(() => {
      console.log(username, password);
    })
    .catch((e) => {
      console.log(e)
    })
    //this.login(username, password)
  }

  async getCurrentUser() {
    try {
      const credentials = await SecureStore.getItemAsync("user");
      console.log('value of credentials: ', credentials);

      if (credentials !== null) {
        const myJson = JSON.parse(credentials)
        var user = myJson.user.username
        console.log("USERNAME IS ")
        return user
      }
      else {return null}
    } catch (e) {
      console.log(e);
    }
}
}

export default new AuthService;
