import React from 'react';
import Image from 'next/image';
import susan from '../../public/susan.jpg';
import { BsThreeDots, BsFillEyeFill, BsFillSuitHeartFill } from 'react-icons/bs';

const style = {
  authorContainer: '',
  authoImage: 'rounded-sm',
  cardTop: '',
  authorName: '',
  topIcons: '',
  topicTitle: '',
  TopicFoot: '',
  featuredImage: '',
};
const threeDotStyles = {
//   color: '#707070',
//   size: '50px',
//   width: '13px',
// height: '9px',
  
};

const TopicCardComponent = () => {
  return (
    <div className='text-[#002D72] max-w-[393px]  my-0 p-2 border-b-[0.20000000298023224px]  m-2  justify-between flex'>
      <div className='w-[60px] pt-3 mr-2'>
        <Image
          src='/susan.jpg'
          alt='auh'
          width={40}
          height={40}
          className={style.authoImage}
        />
      </div>
      <div className='font-MontserratBold  w-full'>
        <div className=' items-center   text-[#002D72;] flex  justify-between '>
          <span className='text-[20px]'>sammy</span>
          <div className='text-sm space-x-2 mr-3 justify-between flex items-cente'>
            <BsThreeDots className='h-[20px] font-bold w-[20px] text-[#707070]' />
            <span className='flex space-x-[2px] items-center '>
              <BsFillEyeFill className=' text-[#FFAD40AB] p-x-[2px]' />
              <p>10k</p>
            </span>
            <span>2h</span>
          </div>
        </div>
        <div className=' items-cente mb-2 w- '>
          <h2 className='text-xl font-MEB font-bold'>
            How we designed the University of Ilorin Forum mobile application
          </h2>
        </div>
        <div className='flex '>
          <span className='text-[12px]'>
            Sometime in 2021, the idea for a forum came up, somewhere for s ...
          </span>
          <span className='mr-3 flex text-sm space-x-[2px]  px-[2PX] items-center'>
            <BsFillSuitHeartFill className='text-[#FFAD40AB]' />
            <p>10k</p>
          </span>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default TopicCardComponent;