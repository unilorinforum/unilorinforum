import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';
import { FcBusinessman } from 'react-icons/fc';
import { MdNotifications } from 'react-icons/md';

const BottomNavComponent = () => {
  return (
    <div className=' w-11/12 mobile-nav  fixed bottom-0 z-50 md:hidden flex  items-center justify-around mx-4'>
      <div className='focus:border relative'>
        <Link href=''>
          <a>
            <FaHome className='mobile-nav-home  ' />
          </a>
        </Link>
      </div>
      <div>
        <Link href=''>
          <a>
            <FaSearch />
          </a>
        </Link>
      </div>
      <div>
        <Link href=''>
          <a>
            <FcBusinessman />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavComponent;
