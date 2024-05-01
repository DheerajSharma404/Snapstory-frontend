/* eslint-disable react/prop-types */
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

// Step 1
export const AuthContext = React.createContext();

// Step 2
export const AuthProvider = ({ children }) => {
  // Step 3
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  // Step 4
  const login = (userData) => {
    // login logic...
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    // logout logic...
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const fetchUser = async () => {
    const token = Cookies.get("x-access-token");
    if (token) {
      const user = await axios.post(
        "http://localhost:3000/api/v1/user/validate-token",
        {
          token,
        },
        { withCredentials: true }
      );
    
      setIsAuthenticated(true);
      setUser(user.data.data); // Replace this with actual user data
    }
  };
  // Step 5
  React.useEffect(() => {
    fetchUser();
  }, []);

  // Step 6
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Steps 8 and 9 are done in other components
