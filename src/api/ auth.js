import axios from "axios";

const baseURL = `https://snapstory-backend.onrender.com/api/v1/user`;

export const signUp = async ({ username, password }) => {
  try {
    const requestURL = `${baseURL}/sign-up`;
    const response = await axios.post(requestURL, { username, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const signIn = async ({ username, password }) => {
  try {
    const requestURL = `${baseURL}/sign-in`;
    const response = await axios.post(requestURL, { username, password });
    localStorage.setItem("x-access-token", response.data.data.token);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signOut = async () => {
  try {
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const requestURL = `${baseURL}/sign-out`;
    const response = await axios.post(requestURL);

    if (response?.data.success) {
      localStorage.removeItem("x-access-token");
    }
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const validateUser = async () => {
  try {
    const requestURL = `${baseURL}/validate-token`;
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const respones = await axios.post(requestURL);

    return respones?.data;
  } catch (error) {
    return error.response?.data;
  }
};


