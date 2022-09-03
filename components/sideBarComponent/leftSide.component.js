import React from 'react';
import { FcHome } from 'react-icons/fc';

const LeftSideBarComponent = () => {
  return (
    <div className=' hidden lg:flex mr-10 lg:flex-col items-center w-[300px] bg-[#ffffff]'>
      <div className='p-2 card mt-2 space-y-4 w-[200px]'>
        <span className='text-2xl'>Important Notices</span>
        <div>
          <ul>
            <li>User will take responsibility of his/her post</li>
          </ul>
        </div>
      </div>
      <div className='p-2 card mt-2 space-y-4 w-[200px]'>
        <span className='text-2xl'>Important Notices</span>
        <div>
          <ul>
            <li>User will take responsibility of his/her post</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBarComponent;
