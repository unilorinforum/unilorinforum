import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaLessThanEqual } from 'react-icons/fa';

const styles = {
  content: 'max-w-7xl flex justify-between flex-1',
  logo: 'cursor-pointer object-conatain',
  logoContainer:
    'flex items-center justify-center mt-2 flex-start  h-min  text-bold  text-3xl cursor-pointer',
  navMenu: 'flex cursor-pointer items-center space-x-5',
  menuItem: 'font-bold hidden md:flex ',
  signUpButton:
    'bg-[#ffffff] text-[#000000] font-bold rounded-full px-4  whitespace-nowrap py-2',
};

const Header = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 95);
      // console.log(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  return (
    <div
      className={`${
        sticky ? 'top-nav-sticky md:fixed top-0 z-50' : ''
      } flex  w-screen h-24 items-center justify-center  p-5 bg-[#272930] text-[#ffffff] z-10`}
    >
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Link href={'/'}>
            <span className='text-lg ms:text-2xl font-bold'>App</span>
          </Link>
        </div>
        <div className={styles.navMenu}>
          <div className={styles.menuItem}>Contact</div>
          <div className={styles.menuItem}>About</div>
          <div className={styles.menuItem}>Policy</div>
          <Link href={'/login'}>
            <div className='font-bold'>Login</div>
          </Link>

          <Link href={'/sign-up'}>
            <div className={styles.signUpButton}>Get Started</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
