import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';

const NewPostHeaderComponent = () => {
const handleClose   = () => {
 Router.asPath == '/' ? Router.back() : Router.push('/');
}

    return (
      <div className='pt-2  items-center bg-gray-light'>
        <div className='flex items-center p-2 pt-0 justify-between '>
          <div className='flex items-center cursor-pointer space-x-3'>
            <span className=' md:text-3xl flex items-center text-center py-1 px-3 rounded-lg  text-[#ffff] bg-[#000000] '>
              <Link href='/'>
                <a>App</a>
              </Link>
            </span>
            <span className='text-xl font-bold'>Create Post</span>
          </div>
          <div className='space-x-2'>
            <button>Edit</button>
            <button> Preview</button>
          </div>
          <AiOutlineClose onClick={handleClose} />
        </div>
      </div>
    );
}

export default NewPostHeaderComponent;
