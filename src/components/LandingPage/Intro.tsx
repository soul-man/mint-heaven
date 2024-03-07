import Image from 'next/image';
import React from 'react';
import { RiLightbulbFlashFill } from "react-icons/ri";

const Intro = () => {
  return (
    <>
      <div className='flex items-center justify-center min-h-[calc(100vh-85px)]'>
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
              md:top-[0vh] 
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
              md:w-[700px] 
              md:h-[500px] 
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
          <div className='mb-8 md:mb-12 flex items-center justify-center'>
            <div className='
              p-1 
              pr-2
              flex 
              items-center 
              justify-center 
              text-lg 
              md:text-lg 
              rounded-lg 
              bg-blue-800/30 
              px-1 
              font-normal 
              tracking-wide 
              text-gray-400'
              >
              <div className='mr-2 text-sm rounded-lg bg-blue-600 p-0.5'>
                <RiLightbulbFlashFill className="text-xl md:text-2xl text-white"/>
              </div>
              <span>Airdrops are <span className='underline'>free money</span></span>
            </div>
          </div>

          <h1 className='
            mb-6
            md:mb-16
            text-center 
            text-4xl 
            font-medium
            text-white
            sm:text-5xl 
            md:text-6xl
            lg:text-7xl'
          >
            Mint NFTs and <span className="font-bold">grow</span> your{' '}
            <span className="leading-snug bg-[url('/svg/banner-light-blue.svg')] bg-cover bg-center px-4 text-white">
              <span className="font-thin">Footprint</span>
            </span>
            {' '}for a higher{' '}
            <span className='underline'>Airdrop</span> chance
          </h1>

          <p className='
            mb-10
            px-
            text-center 
            tracking-wide
          text-gray-400/90
            md:px-40 
            text-lg 
            lg:text-2xl'
          >
            MintHeaven boosts your contract interactions to qualify you for the largest airdrops in 2024
          </p>

          <div className='mb-5 flex items-center justify-center gap-4 opacity-30'>
            <Image
              src='/images/Base.png'
              width={30}
              height={30}
              alt='Base L2 Blockchain Logo'
              title='BASE'
            />
            <Image
              src='/images/Linea.png'
              width={30}
              height={30}
              alt='Linea L2 Blockchain Logo'
              title='LINEA'
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
              src='/images/blast.png'
              width={30}
              height={30}
              alt='Blast Blockchain Logo'
              title='BLAST'
            />
            <Image
              src='/images/Polygon_zkEVM.png'
              width={30}
              height={30}
              alt='Polygon zkEVM L2 Blockchain Logo'
              title='POLYGON zkEVM'
            />
          </div>

          {/* <div className='opacity-40'>
            <div className='icon-scroll'></div>
          </div> */}
          
        </div>
      </div>
    </>
  );
};

export default Intro;
