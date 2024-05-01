import axios from "axios";

const baseURL = `https://snapstory-backend.onrender.com/api/v1/user`;

export const signUp = async ({ username, password }) => {
  try {
    const requestURL = `${baseURL}/sign-up`;
    const response = await axios.post(
      requestURL,
      { username, password },
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const signIn = async ({ username, password }) => {
  try {
    const requestURL = `${baseURL}/sign-in`;
    const response = await axios.post(
      requestURL,
      { username, password },
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    const requestURL = `${baseURL}/sign-out`;
    const response = await axios.post(
      requestURL,
      {},
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
