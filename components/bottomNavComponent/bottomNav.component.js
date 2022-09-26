import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';
import { FcBusinessman } from 'react-icons/fc';
import { MdNotifications } from 'react-icons/md';
import NewPostButtonComponent from '../commonComponents/newPostButton.component';

const BottomNavComponent = () => {
  return (
    <div className=''>
      <div className=' flex bottom-[72px] z-50 right-4 absolute justify-end items-end '>
        <NewPostButtonComponent />
      </div>
      <div className=' w-11/12 mobile-nav  fixed  z-50 md:hidden flex  items-center justify-around mx-4'>
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
    </div>
  );
};

export default BottomNavComponent;
//:@/heroku_317df6cc72767b9?reconnect=true

// mysql: username = bd939e68fed79d;
// password = 3747cfb6
// host = us-cdbr-east-06.cleardb.net
