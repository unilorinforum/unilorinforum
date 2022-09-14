import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

const LogoutComponent = () => {
  const { auth, setAuth } = useAuth();
  const [mss, setMss] = useState('');

  const logOut = async () => {
    const res = await axios.post('/api/users/logout');
    setMss(res.data.message);
    // console.log(res);
    if (res.data.success == 1) {
      Router.push('/');
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
