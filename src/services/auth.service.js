import axios from "axios";

const API_URL = "http://localhost:9081/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  console.log("log out done");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  console.log("Currennt User:"+localStorage.getItem("user"))
  return JSON.parse(localStorage.getItem("user"));
};

const getGoogleUser=()=>{
  return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getGoogleUser,
};

export default AuthService;
