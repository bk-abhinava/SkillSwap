import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = (userData, userToken) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem("token", userToken);

    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };
  const updateUser = (updatedUser) => {
  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  setUser(updatedUser);
};

  return (
    <AuthContext.Provider
   value={{
  user,
  token,
  login,
  logout,
  updateUser,
  isAuthenticated: !!token,
}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};