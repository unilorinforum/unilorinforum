import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

const LogoutComponent = () => {
  const { auth, setAuth } = useAuth();
  const [mss, setMss] = useState('');

  const logOut = async () => {
    const res = await axios.post('/users/logout');
    setMss(res.data.message);
    if (res.data.success == 1) {
      Router.back();
    }
  };
  useEffect(() => {
    setAuth({});
    logOut();
    setCookie('FORUM_LOGIN_DATA', null, {
      maxAge: 1,
    });
  }, [setAuth]);
};

export default LogoutComponent;
