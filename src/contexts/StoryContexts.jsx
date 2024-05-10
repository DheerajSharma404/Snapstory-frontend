/* eslint-disable react/prop-types */
import React from "react";
import {
  getAllStory,
  getBookmarkStories,
  getStoryByCategory,
  getUserStories,
} from "../api/story";
import { AuthContext } from "./AuthContexts";

export const StoryContext = React.createContext();

const StoryContextProvider = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const [Stories, setStories] = React.useState([]);
  const [storiesByCategory, setStoriesByCategory] = React.useState([]);
  const [userStories, setUserStories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [bookmarkedStories, setBookmarkedStories] = React.useState([]);

  const fetchStories = async () => {
    try {
      if (selectedCategory !== "All") {
        const response = await getStoryByCategory(selectedCategory);
        setStoriesByCategory(response?.data);
      } else {
        const response = await getAllStory();
        setStories(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserStories = async () => {
    const response = await getUserStories();
    setUserStories(response?.data);
  };

  const fetchBookmarkedStories = async () => {
    const stories = await getBookmarkStories();
    setBookmarkedStories(stories?.data);
  };
  React.useEffect(() => {
    fetchStories();
    if (isAuthenticated) {
      fetchUserStories();
      fetchBookmarkedStories();
    } else {
      setUserStories([]);
      setBookmarkedStories([]);
    }
  }, [selectedCategory, isAuthenticated]);
  return (
    <StoryContext.Provider
      value={{
        Stories,
        userStories,
        storiesByCategory,
        bookmarkedStories,
        selectedCategory,
        setStoriesByCategory,
        setBookmarkedStories,
        setSelectedCategory,
        setUserStories,
        setStories,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContextProvider;
