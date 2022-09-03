import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
// import Header from '../components/headerComponent/header.component';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
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
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const emailRef = useRef();
  const errRef = useRef();
  

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
     setErrMsg('');
   }, [email, password]);

  const handleSubmmit = async (event) => {
    event.preventDefault();
    const data = { email, password };
    console.log(data, 'ooo');

    try {
      const endPoint = 'http://localhost:4000/api/users/login';
      const response = await axios.post(endPoint, JSON.stringify(data), {
        headers: { 'content-Type': 'application/json' },
        // withCredentials: true,
      });

      // set user data
      // console.log(JSON.stringify(response));
      setErrMsg(response.data.message);
      const accessToken = response.data.token;
      console.log(accessToken);
      //redirect user after sucessfull login
      if (response.data.success == 1) {
        // console.log('fgf');
        Router.push('/');
      }
    } catch (error) {
      setErrMsg();
      
    }
  };

  return (
    <>
      <div className='flex flex-col md:justify-center  items-center bg-[#000000] px-2 h-screen '>
        <div className='flex flex-col justify-center mb-3 mt-12 items-center '>
          <h2 className='text-[#F1CB97] text-xl font-bold '>
            Log into to  Forum App
          </h2>
          <span className='font-bold text-[#F1CB97] text-sm mt-2'>
            
          </span>
        </div>
        <div className='bg-[#01183a] bg-gradient-to-l w-[361px] rounded-sm sm:mx-2 from-[#c6d7f4] px-10 mt-4 pt-2 h-min '>
          {' '}
          <div className=' flex items-center justify-center'>
            <span
              ref={errRef}
              className='text-[#ffffff] text-center font-bold text-xl w-[300px] '
            >
              {errMsg}
            </span>
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
                autoComplete='off'
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
                minlength='1'
                placeholder='Enter password'
                className='flex bg-[#FFFFFF] italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
              />
            </div>
            {/* <p>{result.message}</p> */}
            <input
              className=' font-bold text-center text-[#faf9f9] w-[240px] h-[40px] bg-[#002D72] mt-8 cursor-pointer rounded-full border-2 '
              type='submit'
              value='Sign Up'
            />
          </form>
          <div className='flex flex-col justify-items-center '>
            <span className='mt-6 text-center font-bold text-[#f4f2ef] '>
              or sign up with Google
            </span>
            <div className='flex justify-center space-x-4 mt-6 justify-self-center '>
              <span className='cursor-pointer bg-[#002d72] p-2 rounded-md '>
                <BsGoogle style={SocialLogin} />
              </span>
              <span className='cursor-pointer bg-[#002d72] p-2  rounded-md '>
                <BsFacebook style={SocialLogin} />
              </span>
            </div>
            <div className='flex flex-col justify-center text-sm items-center space-y-7 mt-4'>
              <div className='text-[#e5e3e1] font-bold'>
                By signing up you agree with our{' '}
                <span className='text-[#120339]  font-bold'>
                  {' '}
                  terms of services agrements
                </span>{' '}
                and
                <span className='text-[#120339] font-bold'>
                  {' '}
                  privacy policy
                </span>
              </div>
              <div className=' mb-5 pb-6 text-[#e5e3e1] font-bold'>
                alredy have an account?{' '}
                <span className='text-[#120339] font-bold'>
                  <Link href='/login'>Login</Link>
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
