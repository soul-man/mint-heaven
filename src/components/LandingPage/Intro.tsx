import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
import ConfettiExplosion from 'react-confetti-explosion';
import SoundPlayer from '@/components/LandingPage/SoundPlayer';
import { RiLightbulbFlashFill } from "react-icons/ri";
import { Tooltip } from 'react-tippy';

const Intro = () => {

  const [isExploding, setIsExploding] = useState<boolean>(false);

  const Explotion = () => { 
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
    }, 2000)
  }

  return (
    <div className='relative flex items-center justify-center min-h-[calc(100vh-85px)]'>

          {/* BLOB ANIMATION 1 */}
          <div className='
            animate-blob 
            absolute 
            w-[540px] 
            h-[500px] 
            top-[22%]
            right-[7%]
            rounded-full 
            bg-blue-600 
            opacity-10 
            mix-blend-lighten 
            blur-2xl 
            filter 
            animation-delay-2000
            '
          >
          </div>
          {/* BLOB ANIMATION 2 Big */}
          <div className='
            animate-blob 
            absolute 
            w-[340px] 
            h-[340px] 
            top-[31%]
            left-[28%]
            rounded-full 
            bg-blue-700 
            opacity-10 
            mix-blend-lighten 
            blur-2xl 
            filter 
            animation-delay-4000'
          >
          </div>

      <div className='flex flex-col items-end max-w-7xl mb-16 z-10'>

        {/* Intro text */}
        <div>
          <div onClick={() => Explotion()} className='pb-8 md:pb-10 flex items-center justify-center'>
            <div 
            className='
              cursor-pointer
              hover:scale-105
              hover:-translate-y-1
              duration-300
              p-1 
              pr-2
              flex 
              items-center 
              justify-center 
              rounded-lg 
              bg-blue-600/10 shadow-lg shadow-blue-600/25 border-1 border-blue-500/10
              px-1 
              tracking-wide 
              text-gray-300'
              >
              <div className='mr-2 text-sm rounded-lg bg-blue-600 p-0.5 opacity-80'>
                <RiLightbulbFlashFill className="text-xl md:text-2xl text-white"/>
              </div>
              <h3 className="text-sm md:text-lg font-normal">Airdrops are free money</h3>
            </div>
            {isExploding && <ConfettiExplosion />}
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className='
              mb-6
              text-center 
              text-5xl 
              text-white
              md:text-7xl
              lg:text-8xl
              w-11/12
              md:w-9/12
              font-thin'
            >
              Let's <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">boost</span> your <span className="font-normal">on<span className="font-extrabold">chain</span></span> footprint
            </h1>
            <p className='
            mb-8
            md:mb-14
            font-thin
            text-center 
            tracking-wide
          text-blue-400
            md:px-20 
            text-xl 
            md:text-2xl
            lg:text-3xl
            w-11/12
            md:w-9/12'
          >
            MintHeaven qualifies airdrop farmers for the largest airdrops in history
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-8 z-10">

            {/* <a href="./mint-nfts" className="cursor-pointer min-w-[20px] md:min-w-[300px] relative inline-flex items-center justify-center p-4 px-10 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-blue-600 rounded-lg shadow-md group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="
                absolute 
                flex 
                items-center 
                justify-center 
                w-full 
                h-full 
                text-md 
                md:text-xl 
                text-blue-100
                bg-blue-900/30 
                uppercase 
                transition-all 
                duration-300 
                transform 
                group-hover:translate-x-full 
                ease">
                  Start farming now
              </span>
              <span className="relative invisible">Start farming now</span>
            </a> */}

            <a href="./mint-nfts">
              <button className="bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:bg-blue-500 hover:scale-105 duration-200 text-xl md:text-2xl text-white hover:text-black/70 font-normal rounded-lg">
                Start farming
              </button>
            </a>

            <SoundPlayer />

          </div>

          </div>
        </div>

        <div className="absolute bottom-0 w-full flex flex-row items-center justify-center">
          <div className='mb-5 flex items-center justify-center gap-6'>
            <Tooltip
              html={<span className="text-xl font-medium">Base</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Base.png'
                width={23}
                height={23}
                alt='Base L2 Blockchain Logo'
                title='BASE'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">Linea</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Linea.png'
                width={25}
                height={25}
                alt='Linea L2 Blockchain Logo'
                title='LINEA'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">Scroll</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Scroll.png'
                width={22}
                height={22}
                alt='Scroll L2 Blockchain Logo'
                title='SCROLL'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">Bera Chain</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Bera.png'
                width={30}
                height={30}
                alt='Bera Chain Blockchain Logo'
                title='BERA Chain'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">Blast</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/blast.png'
                width={32}
                height={32}
                alt='Blast Blockchain Logo'
                title='BLAST'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">POLYGON zkEVM</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Polygon_zkEVM.png'
                width={23}
                height={23}
                alt='Polygon zkEVM L2 Blockchain Logo'
                title='POLYGON zkEVM'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
          </div>

          {/* <div className='mb-5 flex items-center justify-center gap-4'>
            <SoundPlayer />
          </div> */}
        </div>

        {/* 
        <div className='opacity-25'>
          <div className='icon-scroll'></div>
        </div> */}
        
      </div>
    </div>
  );
};

export default Intro;
