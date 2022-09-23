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
  // console.log(topic.user_id);

  const except = topic.content
    .replace(/^"(.*)"$/, '$1')
    .replace(/(<([^>]+)>)/gi, '');
  const contentExcept = trimContent(except, 80);

  const title = topic.title;

  useEffect(() => {
    const getAuthorData = async () => {
      const AuthorInfo = await axios(`/api/users/${topic.user_id}`);
      setAuthorData(AuthorInfo.data);
    };
    getAuthorData();
  }, [topic.user_id]);

  return (
    <div className='topic-card text-[#002D72] max-w-[393px]  my-0 p-2 border-b-[0.20000000298023224px]  m-2  justify-between flex'>
      <div className='w-[60px] pt-3 mr-2 topic-card-avatar'>
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
      <div className='font-MontserratBold  w-full'>
        <div className=' items-center   text-[#002D72;] flex  justify-between '>
          <span className='text-[20px] author-name'>{authorData.username}</span>
          <div className='text-sm space-x-2 mr-3 justify-between flex items-center '>
            {/* <BsThreeDots className='h-[20px] topic-card-dot font-bold w-[20px] text-[#707070]' /> */}
            <span className='flex space-x-[2px] items-center '>
              <BsFillEyeFill className=' text-[#FFAD40AB] p-x-[2px]' />
              <p className='topic-viwes-count'>10k</p>
            </span>
            <span className='topic-card-time'>2h Ago</span>
          </div>
        </div>
        <div className=' items-cente mb-2 w- '>
          <h2 className='text-xl font-MEB font-bold topic-card-title'>
            <Link href={'/#'}>
              <a>{title}</a>
            </Link>
          </h2>
        </div>
        <div className='flex justify-between'>
          <span className='text-[12px] topic-card-except'>
            {contentExcept}...
          </span>
          <span className='mr-3 flex text-sm space-x-[2px]  px-[2PX] items-center'>
            <BsFillSuitHeartFill className='text-[#FFAD40AB]' />
            <p className='topic-likes-count'>10k</p>
          </span>
          {topic.cover_Image_url ? (
            <div className='mt-1 w-[313px] h-[136px]'>
              <Image
                src='/public/blood.jpg'
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
