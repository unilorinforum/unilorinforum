import React, { useEffect, useState } from 'react';
import styles from './topicCardStyles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { trimContent } from '../../functions';
import {
  BsThreeDots,
  BsFillEyeFill,
  BsFillSuitHeartFill,
} from 'react-icons/bs';

const style = {
  authorContainer: '',
  authImage: 'rounded-sm object-contain',
  cardTop: '',
  authorName: '',
  topIcons: '',
  topicTitle: '',
  TopicFoot: '',
  featuredImage: '',
};
const TopicCardComponent = ({ topic }) => {
  const [authorData, setAuthorData] = useState({});
  // console.log(topic);

  const except = topic.content
    .replace(/^"(.*)"$/, '$1')
    .replace(/(<([^>]+)>)/gi, '');
  const contentExcept = trimContent(except, 80);

  const title = trimContent(topic.title, 80);

  useEffect(() => {
    const getAuthorData = async () => {
      const AuthorInfo = await axios(`/users/${topic.user_id}`);
      // console.log('author info', AuthorInfo.data.user);
      setAuthorData(AuthorInfo.data.user);
    };
    getAuthorData();
  }, [topic.user_id]);

  return (
    <div className='topic-card text-[#002D72] max-w-[393px] min-w-[350px] border-b border-[#d0caca]  my-0 p-2  mx-4   justify-between flex'>
      <div className='w-[60px]  topic-card-avatar'>
        <Image
          src='/susan.jpg'
          alt='auh'
          width={40}
          quality={100}
          height={40}
          className={style.authImage}
          objectFit='contain'
        />
      </div>
      <div className='font-MontserratBold mx-2  w-full'>
        <div className='  items-center   text-[#002D72;] flex  justify-between '>
          <span className='text-[20px] font-bold author-name'>{authorData.username}</span>
          <div className='text-sm space-x-2 mr-3 justify-between flex items-center '>
            <BsThreeDots className='h-[20px] topic-card-dot font-bold w-[25px] text-[#707070]' />
            <span className='flex space-x-[2px] items-center '>
              <BsFillEyeFill className=' text-[#f8910bab] font-bold p-x-[2px]' />
              <p className='topic-viwes-count'>10k</p>
            </span>
            <span className='topic-card-time'>2h Ago</span>
          </div>
        </div>
        <div className=' items-cente mb-2 w- '>
          <h2 className='text-xl font-MEB font-bold topic-card-title'>
            <Link href={'/#'}>
              <a>{title}...</a>
            </Link>
          </h2>
        </div>
        <div className='flex justify-between'>
          <span className='text-[12px] topic-card-except'>
            {contentExcept}...
          </span>
          <span className='mr-3 flex text-sm space-x-[2px]  px-[2PX] items-center'>
            <BsFillSuitHeartFill className='text-[#f08800ab]' />
            <p className='topic-likes-count'>10k</p>
          </span>
        </div>
        <div>
          {' '}
          {topic.cover_Image_url ? (
            <div className='mt-1 w-[313px] h-[136px]'>
              <Image
                src={`${topic.cover_Image_url}`}
                alt='auh'
                width={313}
                height={136}
                className='rounded-xl object-cover'
                priority
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default TopicCardComponent;
