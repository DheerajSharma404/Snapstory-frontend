import axios from "axios";

const baseURL = `http://localhost:3000/api/v1/story`;

export const createStory = async ({ category, slides }) => {
  try {
    const response = await axios.post(
      baseURL,
      { category, slides },
      { withCredentials: true }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStoryById = async (storyId) => {
  try {
    const requestURL = `${baseURL}/${storyId}`;
    const response = await axios.get(requestURL, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStory = async () => {
  try {
    const response = await axios.get(baseURL, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStoryByCategory = async (category) => {
  try {
    const requestURL = `${baseURL}?category=${category}`;
    const response = await axios.get(requestURL, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleStoryBookmark = async (storyId) => {
  try {
    const requestURL = `${baseURL}/bookmark/${storyId}`;
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

export const toggleStoryLike = async (storyId) => {
  try {
    const requestURL = `${baseURL}/like/${storyId}`;

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

export const getLike = async (storyId, userId) => {
  try {
    const requestURL = `${baseURL}/like?storyId=${storyId}&userId=${userId}`;
    const response = await axios.get(requestURL, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarkStories = async () => {
  try {
    const requestURL = `${baseURL}/bookmarks`;
    const response = await axios.get(requestURL, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
