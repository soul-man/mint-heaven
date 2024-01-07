import Image from 'next/image';
import React from 'react';

const WelcomeSection = () => {
  return (
    <>
      <div className='flex h-[80%] md:h-[100vh] items-center justify-center pb-44'>
        <div className='max-w-5xl'>
          <h2
            className='text-lg md:text-2xl mb-3 text-center font-semibold uppercase text-white opacity-90'>
            Crypto Airdrops are <span className='underline'>free money</span>
          </h2>
          <div className='mb-16 flex items-center justify-center'>
            <div className='text-md lg:text-lg rounded-lg bg-cyan-400 px-3 font-normal tracking-wide text-gray-900 opacity-60'>
              All you need is{' '}
              <span className='font-semibold'>contract interaction</span>
            </div>
          </div>

          <h1 className='font-grotesk mb-12 text-center text-4xl text-gray-200 sm:text-4xl md:text-7xl'>
            Mint NFTs and <span className='text-blue-400'>grow</span>{' '}
            <span className='text-blue-500'>your</span>{' '}
            <span className='text-blue-600'>footprint</span> for a higher{' '}
            <span className='text-blue-600'>airdrop</span> chance
          </h1>

          <p className='mb-6 px-10 text-center font-normal tracking-wide text-gray-200 opacity-80 md:px-40 text-lg md:text-2xl'>
            <span className='font-gray-100 font-bold'>Boost</span> your contract
            interactions and qualify for the largest airdrops in 2024
          </p>

          <div className='mb-14 sm:mb-10 flex items-center justify-center gap-5 opacity-90'>
            <Image
              src='/images/Base.png'
              width={30}
              height={30}
              alt='Base L2 Blockchain'
              title='BASE'
            />
            <Image
              src='/images/Linea.png'
              width={30}
              height={30}
              alt='Linea L2 Blockchain'
              title='LINEA'
            />
            <Image
              src='/images/zkSync.png'
              width={30}
              height={15}
              alt='zkSync L2 Blockchain'
              title='zkSync'
            />
            <Image
              src='/images/Manta.png'
              width={30}
              height={15}
              alt='Manta Pacific L2 Blockchain'
              title='MANTA'
            />
            <Image
              src='/images/Polygon_zkEVM.png'
              width={30}
              height={15}
              alt='Polygon zkEVM L2 Blockchain'
              title='POLYGON zkEVM'
            />
            <Image
              src='/images/Scroll.png'
              width={30}
              height={15}
              alt='Scroll L2 Blockchain'
              title='SCROLL'
            />
          </div>

          <div className='opacity-40'>
            <div className='icon-scroll'></div>
          </div>

          {/* <div className="text-center mb-6">
            <a className="color_black" href="#mint-nfts">
              <button className=" bg-blue-500 items-center px-4 py-2 hover:bg-blue-600 text-lg text-white font-semibold rounded-md">
                START MINTING NOW
              </button>
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default WelcomeSection;
