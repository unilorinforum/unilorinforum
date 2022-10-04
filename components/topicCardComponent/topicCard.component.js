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

  const except = topic.content
    .replace(/^"(.*)"$/, '$1')
    .replace(/(<([^>]+)>)/gi, '');
  const contentExcept = trimContent(except, 80);

  const title = trimContent(topic.title, 160);

  useEffect(() => {
    const getAuthorData = async () => {
      const AuthorInfo = await axios(`/users/${topic.user_id}`);
      // console.log('author info', AuthorInfo.data.user);
      setAuthorData(AuthorInfo.data.user);
    };
    getAuthorData();
  }, [topic.user_id]);

  return (
    <div className='topic-card text-[#002D72]  w-screen  max-w-[393px] p-2 border-b-[0.20000000298023224px] border-[#2223]  m-0  flex'>
      <div className='w-[60px] pt-0 mr-2 topic-card-avatar m-r'>
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
      <div className='font-MontserratBold'>
        <div className='mx-0  w-full text-[#002D72;] flex  justify-between '>
          <span className='text-[20px] author-name'>
            sammy{authorData.username}
          </span>
          <div className='text-sm space-x-2 mr-3 justify-between flex items-center '>
            {/* <BsThreeDots className='h-[20px] topic-card-dot font-bold w-[20px] text-[#707070]' /> */}
            <span className='flex space-x-[2px] items-center '>
              <BsFillEyeFill className=' text-[#FFAD40AB] p-x-[2px]' />
              <p className='topic-viwes-count'>10k</p>
            </span>
            <span className='topic-card-time'>2h Ago</span>
          </div>
        </div>
        <div className=' w-full items-cente mb-2 '>
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
        </div>
        <div>
          {topic.coverImageUrl ? (
            <div className='mt-1 w-[313px] h-[136px]'>
              <Image
                src={`${topic.coverImageUrl}`}
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
