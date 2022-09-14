import React, { createContext, useState, useEffect } from 'react';
import {
  hasCookie,
  getCookies,
  getCookie,
  setCookie,
  deleteCookie,
} from 'cookies-next';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    if (hasCookie('FORUM_LOGIN_DATA')) {
      const userData = getCookie('FORUM_LOGIN_DATA');
      setAuth(userData);
    }
  }, [setAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
