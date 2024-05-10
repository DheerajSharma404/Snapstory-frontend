/* eslint-disable react/prop-types */
import React from "react";
import { validateUser } from "../api/ auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem("x-access-token") ? true : false
  );
  const [user, setUser] = React.useState(null);

  const login = async (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  const fetchUser = async () => {
    if (isAuthenticated) {
      const user = await validateUser();
      if (user?.success) {
        setUser(user?.data);
      }
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Steps 8 and 9 are done in other components
