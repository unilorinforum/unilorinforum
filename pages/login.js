import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Header from '../components/headerComponent/header.component';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
// import { useSession, signIn, signOut } from 'next-auth/react';
const SocialLogin = {
  color: '#ffffff',
  size: '15px',
};

const styles = {
  mainContainer:
    'flex flex-col md:justify-center  items-center bg-[#000000] w-full h-screen ',
  wellcomeTextContainer:
    'flex flex-col justify-center mb-3 mt-12 items-center ',
};

export default function Login() {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const emailRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    if (auth.user_id) {
      Router.back();
    }
  }, [auth]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmmit = async (event) => {
    event.preventDefault();
     const id = toast.loading('loging in...', {
       className: 'font-bold text-sm ',
       position: 'top-right',
       autoClose: 5000,
       transition: Slide,
     });
    
    const data = { email, password };

    try {
      const response = await axios.post(`/users/login`, data, {
        headers: {
          'Access-Control-Allow-Credentials': true,
        },
      });
       console.log(response);
       if (response.data.success !== 1) {
         console.log(response);
         toast.update(id, {
           render: response.data.message,
           type: 'error',
           isLoading: false,
           closeButton: true,
           position: 'top-right',
           autoClose: 5000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           transition: Slide,
         });
       }else
      if (response.data.success == 1) {
         toast.update(id, {
           render: response.data.message,
           type: 'success',
           isLoading: false,
           closeButton: true,
           position: 'top-right',
           autoClose: 5000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           transition: Slide,
         });
        // setPassword('');
        // setEmail('');
       
        const { user_id, email, username, token } = response.data;
         const userData = {
           user_id: user_id,
          email: email,
          username: username,
        }
        setCookie('FORUM_LOGIN_DATA', JSON.stringify(userData), {
          maxAge: 60 * 60 * 24 * 90, //90 days
          path: '/',
          sameSite: 'strict',
        });
        setAuth({
          user_id: user_id,
          email: email,
          username: username,
        });
      }
    }
     catch (error) {
      console.log(error);
       toast.update(id, {
         render: error.message,
         type: 'error',
         isLoading: false,
         closeButton: true,
         position: 'top-right',
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         transition: Slide,
       });
    }
  };

  return (
    <>
      <ToastContainer
        transition={Slide}
        style={{
          width: '300px',
          height: '150px',
          top: '60px',
          left: '15px',
          marginLeft: '20px',
        }}
      />
      <div className='flex flex-col md:justify-center  items-center bg-[#000000] px-2 h-screen '>
        <div className='flex flex-col justify-center mb-3 mt-12 items-center '>
          <h2 className='text-[#F1CB97] text-xl font-bold '>
            Log into to Forum App
          </h2>
          <span className='font-bold text-[#F1CB97] text-sm mt-2'></span>
        </div>
        <div className='bg-[#01183a] bg-gradient-to-l w-[361px] rounded-sm sm:mx-2 from-[#c6d7f4] px-10 mt-4 pt-2 h-min '>
          {' '}
          <div className=' flex items-center justify-center'>
            <span
              ref={errRef}
              className='text-[#ffffff] text-center font-bold text-xl w-[300px] '
            ></span>
          </div>
          <form
            onSubmit={handleSubmmit}
            className='flex flex-col justify-between items-center mt-7'
          >
            <div className='p-2 px-3 space-y-4 bg-black'>
              <input
                name='email'
                type='email'
                required
                value={email}
                // autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter e-mail'
                ref={emailRef}
                className='flex bg-[#FFFFFF] italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
              />
              <input
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength='1'
                placeholder='Enter password'
                className='flex bg-[#FFFFFF] italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
              />
            </div>
            <input
              className=' font-bold text-center text-[#faf9f9] w-[240px] h-[40px] bg-[#002D72] mt-8 cursor-pointer rounded-full border-2 '
              type='submit'
              value='Login'
            />
          </form>
          <div className='flex flex-col justify-items-center '>
            {/* <span className='mt-6 text-center font-bold text-[#f4f2ef] '>
              Login up with Google or facebook
            </span>
            <div className='flex justify-center space-x-4 mt-6 justify-self-center '>
              <span className='cursor-pointer bg-[#002d72] p-2 rounded-md '>
                <BsGoogle onClick={googleSignIn} style={SocialLogin} />
              </span>
              <span className='cursor-pointer bg-[#002d72] p-2  rounded-md '>
                <BsFacebook onClick={facebookSignIn} style={SocialLogin} />
              </span>
            </div> */}
            <div className='flex flex-col justify-center text-sm items-center space-y-7 mt-4'>
              <div className=' mb-5 pb-6 text-[#e5e3e1] font-bold'>
                {`Don't have an account?`}{' '}
                <span className='text-[#120339] font-bold'>
                  <Link href='/sign-up'>Sign up</Link>
                </span>{' '}
                Instead
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Login.getLayout = function pageLayout(page) {
  return (
    <>
      {/* <Header /> */}
      {page}
    </>
  );
};
