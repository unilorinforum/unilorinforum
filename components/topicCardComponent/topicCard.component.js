import React from 'react';
import styles from './topicCardStyles.module.css';
import Image from 'next/image';
import susan from '../../public/susan.jpg';
import {
  BsThreeDots,
  BsFillEyeFill,
  BsFillSuitHeartFill,
} from 'react-icons/bs';

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
    <div className='topic-card text-[#002D72] max-w-[393px]  my-0 p-2 border-b-[0.20000000298023224px]  m-2  justify-between flex'>
      <div className='w-[60px] pt-3 mr-2 topic-card-avatar'>
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
          <span className='text-[20px] author-name'>sammy</span>
          <div className='text-sm space-x-2 mr-3 justify-between flex items-center '>
            <BsThreeDots className='h-[20px] topic-card-dot font-bold w-[20px] text-[#707070]' />
            <span className='flex space-x-[2px] items-center '>
              <BsFillEyeFill className=' text-[#FFAD40AB] p-x-[2px]' />
              <p className='topic-viwes-count'>10k</p>
            </span>
            <span className='topic-card-time'>2h Ago</span>
          </div>
        </div>
        <div className=' items-cente mb-2 w- '>
          <h2 className='text-xl font-MEB font-bold topic-card-title'>
            How we designed the University of Ilorin Forum mobile application
          </h2>
        </div>
        <div className='flex justify-between'>
          <span className='text-[12px] topic-card-except'>
            Sometime in 2021, the idea for a forum came up, somewhere for s ...
          </span>
          <span className='mr-3 flex text-sm space-x-[2px]  px-[2PX] items-center'>
            <BsFillSuitHeartFill className='text-[#FFAD40AB]' />
            <p className='topic-likes-count'>10k</p>
          </span>
        </div>
        <div className='mt-1'>
          <Image
            src='/blood.png'
            alt='auh'
            width={313}
            height={136}
            className='rounded-xl'
          />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default TopicCardComponent;
