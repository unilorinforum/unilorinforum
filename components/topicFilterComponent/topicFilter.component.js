import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

 

const TopicFilterComponent = () => {
  const router = useRouter()
  
  console.log(router.asPath);
  const className= "topic-filter-items rounded-full  cursor-pointer  py-1 whitespace-nowrap flex flex-wrap px-4 text-[#002D72] font-bold  bg-[#CED5E0] " 
  
  return (
    <div className='border-b bg-[#ffffff] pl-3 py-3 mt-0 md:hidden flex no-scrollbar overflow-x-auto w-screen max-w-[800px] space-x-4 '>
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
          router.asPath == '/feed/gossip' ? 'active-filter' : ''
        } `}
      >
        <Link href={`/feed/gossip`}>
          <a>Gossip</a>
        </Link>
      </span>
      <span
        className={`${className} ${
          router.asPath == '/feed/trending' ? 'active-filter' : ''
        } `}
      >
        <Link href={`/feed/trending`}>
          <a>Trending</a>
        </Link>
      </span>
      <span
        className={`${className} ${
          router.asPath == '/feed/story' ? 'active-filter' : ''
        } `}
      >
        <Link href={`/feed/story`}>
          <a>Story</a>
        </Link>
      </span>
      <span
        className={`${className} ${
          router.asPath == '/feed/news' ? 'active-filter' : ''
        } `}
      >
        <Link href={`/feed/news`}>
          <a>Just In</a>
        </Link>
      </span>
      <span
        className={`${className} ${
          router.asPath == '/feed/materials' ? 'active-filter' : ''
        } `}
      >
        <Link href={`/feed/materials`}>
          <a>Materias</a>
        </Link>
      </span>
      <span
        className={`${className} ${
          router.asPath == '/feed/Voting' ? 'active-filter' : ''
        } `}
      >
        <Link href={`/feed/voting`}>
          <a>Voting</a>
        </Link>
      </span>
    </div>
  );
};

export default TopicFilterComponent;
