import axios from "axios";

const baseURL = `http://localhost:3000/api/v1/story`;

export const createStory = async ({ category, slides }) => {
  try {
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;

    const response = await axios.post(baseURL, { category, slides });
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getStoryById = async (storyId) => {
  try {
    const requestURL = `${baseURL}/${storyId}`;
    const response = await axios.get(requestURL);

    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getAllStory = async () => {
  try {
    const response = await axios.get(baseURL);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getStoryByCategory = async (category) => {
  try {
    const requestURL = `${baseURL}?category=${category}`;

    const response = await axios.get(requestURL);

    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const toggleStoryBookmark = async (storyId) => {
  try {
    const requestURL = `${baseURL}/bookmark/${storyId}`;

    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;

    const response = await axios.post(requestURL);

    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const toggleStoryLike = async (storyId) => {
  try {
    const requestURL = `${baseURL}/like/${storyId}`;

    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;

    const response = await axios.post(requestURL);

    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getBookmarkStories = async () => {
  try {
    const requestURL = `${baseURL}/bookmarks`;

    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;

    const response = await axios.get(requestURL);

    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const editStory = async (storyId, data) => {
  try {
    const requestURL = `${baseURL}/${storyId}`;
    const response = await axios.patch(requestURL, data);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getUserStories = async () => {
  try {
    const requestURL = `${baseURL}/user-stories`;
    const token = localStorage.getItem("x-access-token");

    axios.defaults.headers.common["x-access-token"] = token;

    const response = await axios.get(requestURL);

    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};
