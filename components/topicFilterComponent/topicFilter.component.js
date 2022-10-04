import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiTrendingUp } from 'react-icons/hi';

import { adminCategories } from '../../common/categories';

const TopicFilterComponent = () => {
  const router = useRouter();
  const className =
    'topic-filter-items rounded-full  cursor-pointer  py-1 whitespace-nowrap flex flex-wrap  px-4 text-[#002D72] font-bold  bg-[#CED5E0] ';

  return (
    <div className='border-b text-sm bg-[#ffffff] pl-3 py-3 mt-0  flex no-scrollbar overflow-x-auto w-screen max-w-[800px] space-x-4 '>
      <span
        className={`${className} ${
          router.asPath == '/feed/top' ? 'active-filter' : ''
        } `}
      >
        <Link href={`/feed/top`}>
          <a>For You</a>
        </Link>
      </span>
      <span
        className={`${className} ${
          router.asPath == '/feed/latest' ? 'active-filter' : ''
        } `}
      >
        <Link href={`/feed/latest`}>
          <a>Latest</a>
        </Link>
      </span>

      <span
        className={`${className} ${
          router.asPath == '/feed/trending' ? 'active-filter' : ''
        } `}
      >
        <div className='flex space-x-1 items-center'>
          <Link href={`/feed/trending`}>
            <a>Trending</a>
          </Link>
          <div className='text-xl'>
            <HiTrendingUp />
          </div>
        </div>
      </span>
      {adminCategories.map((cat) => {
        return (
          <div key={cat.label}>
            <span
              className={`${className} ${
                router.asPath == `/feed/${cat.value}` ? 'active-filter' : ''
              } `}
            >
              <div className='flex space-x-1 items-center'>
                <Link href={`/feed/${cat.value}`}>
                  <a>{cat.label}</a>
                </Link>
                <div className='text-xl'>{cat.icon}</div>
              </div>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TopicFilterComponent;
