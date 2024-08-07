import { createContext, useState } from "react";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const [user, _setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  // eslint-disable-next-line no-unused-vars
  const [authToken, _setAuthToken] = useState(
    () => localStorage.getItem("authToken") || null,
  );

  const setUser = (value) => {
    localStorage.setItem('user', JSON.stringify(value));
    _setUser(value)
  }
  const setAuthToken = (value) => {
    localStorage.setItem('authToken', value);
    _setAuthToken(value)
  }

  let contextData = {
    user: user,
    setUser: setUser,
    authToken: authToken,
    setAuthToken: setAuthToken,
  };

  return (
    <AuthContext.Provider value={contextData} {...props}>
      {children}
    </AuthContext.Provider>
  );
};
