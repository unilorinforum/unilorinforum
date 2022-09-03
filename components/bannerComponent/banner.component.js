import React from 'react';
import Image from 'next/image'
// import banner from '../../public/sammy.png'
import Link from 'next/link';

const BannerComponent = () => {
    return (
      <div className=' border-y px-10 flex-[3] bg-[#002D72] pb-3 text-[#ffffff] flex justify-between  '>
        <div className=' flex flex-col justify-start p-0'>
          <div className=' text-left'>
            <h1 className='w-full ml-0 font-MontserratBold whitesapce-nowrap md:text-5xl text-3xl'>
              Curise And Learn
            </h1>
            <h3 className='font-MontserratBold text-xl  '>
              Connecting students for fun learning
            </h3>
          </div>
          <div className='flex justify-between max-w-[400px]'>
            <button className='bg-[#ffffff] text-[#000000] font-bold mx-2 mt-4 py-2 px-4 rounded'>
              <Link href={'/new-topic'}> Create A Topic</Link>
            </button>
            {/* <button className='bg-[#ffffff] text-[#000000] font-bold  mx-2 mt-4 py-2 px-4 rounded'>
            Share PDF
          </button> */}
          </div>
        </div>
        <div className='md:flex hidden'>
          {/* <Image scr={banner} alt='banner' width={40} height={40} /> */}
        </div>
      </div>
    );
}

export default BannerComponent;
