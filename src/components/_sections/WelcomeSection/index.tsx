import Image from 'next/image';
import React from 'react';
import { BsShieldCheck } from "react-icons/bs";
import { RiLightbulbFlashFill } from "react-icons/ri";

const WelcomeSection = () => {
  return (
    <>
      <div className='flex items-center justify-center min-h-[calc(100vh-88px)]'>
        <div className='max-w-5xl'>
          <div className='relative'>
            {/* BLOB ANIMATION 1 */}
            <div className='
              animate-blob 
              absolute 
              w-[100px] 
              h-[100px] 
              top-[25vh]
              right-[40px]
              md:w-[350px] 
              md:h-[380px] 
              md:top-[15vh] 
              md:right-[5vw] 
              rounded-full 
              bg-indigo-500 
              opacity-10 
              mix-blend-lighten 
              blur-2xl 
              filter 
              animation-delay-2000'
            >
            </div>
            {/* BLOB ANIMATION 2 */}
            <div className='
              animate-blob 
              absolute 
              w-[300px] 
              h-[100px] 
              top-[16vh]
              left-[10vw]
              md:w-[600px] 
              md:h-[600px] 
              md:top-[1vh] 
              md:left-[5vw] 
              rounded-full 
              bg-indigo-700 
              opacity-10 
              mix-blend-lighten 
              blur-2xl 
              filter 
              animation-delay-4000'
            >
            </div>
          </div>
          <h2
            className='
              text-lg
              sm:text-xl 
              md:text-2xl 
              mb-3 
              text-center 
              font-semibold 
              uppercase
              text-blue-400/50 
              '
            >
            Crypto Airdrops are <span className='underline'>free money</span>
          </h2>
          <div className='mb-8 md:mb-16 flex items-center justify-center'>
            <div className='
              p-1 
              flex 
              items-center 
              justify-center 
              text-md 
              sm:text-lg 
              rounded-lg 
              bg-cyan-500 
              px-1 
              font-normal 
              tracking-wide 
              text-gray-900'
              >
              <div className='mr-2 text-sm rounded-lg bg-blue-600 p-0.5'>
                <RiLightbulbFlashFill className="text-lg md:text-2xl text-white"/>
              </div>
              <span>All you need is contract interaction</span>
            </div>
          </div>

          <h1 className='
            font-grotesk 
            mb-6
            md:mb-12
            text-center 
            text-3xl 
            text-gray-200 
            sm:text-5xl 
            md:text-6xl
            lg:text-7xl'
          >
            Mint NFTs and <span className='text-blue-400'>grow</span>{' '}
            <span className='text-blue-500'>your</span>{' '}
            <span className='text-blue-600'>footprint</span> for a higher{' '}
            <span className='underline'>airdrop</span> chance
          </h1>

          <p className='
            mb-14 
            px-10 
            text-center 
            tracking-wide
          text-blue-300/80
            md:px-40 
            text-lg 
            sm:text-2xl'
          >
            <span className='font-gray-100 font-bold'>Boost</span> your contract
            interactions and qualify for the largest crypto airdrops in 2024
          </p>

          <div className='mb-5 flex items-center justify-center gap-6'>
            <Image
              src='/images/Base.png'
              width={30}
              height={30}
              alt='Base L2 Blockchain Logo'
              title='BASE'
            />
            <Image
              src='/images/Scroll.png'
              width={30}
              height={30}
              alt='Scroll L2 Blockchain Logo'
              title='SCROLL'
            />
            <Image
              src='/images/Bera.png'
              width={33}
              height={33}
              alt='Bera Chain Blockchain Logo'
              title='BERA Chain'
            />
            <Image
              src='/images/Linea.png'
              width={30}
              height={30}
              alt='Linea L2 Blockchain Logo'
              title='LINEA'
            />
            <Image
              src='/images/Polygon_zkEVM.png'
              width={30}
              height={30}
              alt='Polygon zkEVM L2 Blockchain Logo'
              title='POLYGON zkEVM'
            />
            <Image
              src='/images/zkSync.png'
              width={30}
              height={30}
              alt='zkSync L2 Blockchain Logo'
              title='zkSync'
            />
          </div>

          <div className='
            flex 
            items-center 
            justify-center 
            gap-2 
            flex-row 
            mb-12 
            px-10 
            text-center 
            md:px-40 
            text-lg 
            md:text-xl'
          >
            <span className="text-sm tracking-wide text-gray-500/80">
              contracts
            </span>
            <span className="text-2xl text-green-500">
              <BsShieldCheck />
            </span>
            <span className="text-sm tracking-wide text-gray-500/80">
              audited
            </span>
          </div>

          {/* <div className='opacity-40'>
            <div className='icon-scroll'></div>
          </div> */}
          
        </div>
      </div>
    </>
  );
};

export default WelcomeSection;
