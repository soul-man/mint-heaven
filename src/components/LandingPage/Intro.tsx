import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
import ConfettiExplosion from 'react-confetti-explosion';
import SoundPlayer from '@/components/LandingPage/SoundPlayer';
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { SparklesCore } from '@/components/ui/sparkles';
import { RiLightbulbFlashFill } from "react-icons/ri";
import { Tooltip } from 'react-tippy';

const Intro = () => {

  const [isExploding, setIsExploding] = useState<boolean>(false);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const Explotion = () => { 
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
    }, 2000)
  }

  return (
    <BackgroundGradientAnimation>
      <div className='absolute z-40 pointer-events-none w-full'>

        <div className='flex flex-col items-center'>
          <div className='flex flex-col max-w-7xl z-40 items-center justify-center min-h-[calc(100vh)]'>
            {/* Intro text */}

              <motion.div 
                initial="hidden"
                animate="visible"
                transition={{ duration: 1.2 }}
                variants={variants1}
                className="flex flex-col items-center justify-center w-full ">

                <div onClick={() => Explotion()} className='
                  pb-8 
                  md:pb-4 
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  z-50 
                  cursor-pointer
                  hover:scale-105
                  hover:-translate-y-1
                  duration-300'>
                  <div 
                    className='
                    pointer-events-auto
                    p-1 pr-2 px-1 
                    flex items-center justify-center 
                    rounded-lg tracking-wide 
                    bg-blue-800/10 shadow-lg shadow-blue-800/25 border-1 border-blue-500/10
                    text-gray-300'
                    >
                    <div className='mr-2 text-sm rounded-lg bg-blue-600 p-0.5 opacity-80'>
                      <RiLightbulbFlashFill className="text-xl md:text-2xl text-white"/>
                    </div>
                    <h3 className="text-sm md:text-lg font-normal">Airdrops are free money</h3>
                  </div>
                  <div className="w-full h-5 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
            
                    {/* Core component */}
                    <SparklesCore
                      background="transparent"
                      minSize={0.4}
                      maxSize={1}
                      particleDensity={600}
                      className="w-full h-full"
                      particleColor="#FFFFFF"
                    />
            
                    {/* Radial Gradient to prevent sharp edges */}
                    <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                  </div>
                  {isExploding && <ConfettiExplosion />}
                </div>

                <h1 className="
                    mb-6
                    text-center 
                    text-5xl 
                    text-white
                    md:text-7xl
                    lg:text-8xl
                    w-11/12
                    md:w-9/12
                    font-thin"
                  >
                    Let's <span className="font-bold bg-gradient-to-r from-red-700 to-blue-700 inline-block text-transparent bg-clip-text">boost</span> your <span className="font-normal">on<span className="font-extrabold">chain</span></span> footprint
                  </h1>

                {/* <h1 className='
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
                  Let's <span className="font-bold bg-gradient-to-r from-red-700 to-blue-700 inline-block text-transparent bg-clip-text">boost</span> your <span className="font-normal">on<span className="font-extrabold">chain</span></span> footprint
                </h1> */}
                <p className='
                  mb-8
                  md:mb-14
                  font-thin
                  text-center 
                  tracking-wide
                text-blue-300
                  md:px-20 
                  text-xl 
                  md:text-2xl
                  lg:text-3xl
                  w-11/12
                  md:w-9/12'
                >
                  MintHeaven qualifies airdrop farmers for the largest airdrops in history
                </p>

                <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-8 z-50 pointer-events-auto">
                  <a href="./mint-nfts">
                    <button className="bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:scale-105 duration-200 text-xl md:text-2xl text-white font-normal rounded-lg z-50">
                      Start farming
                    </button>
                  </a>
                  <SoundPlayer />
                </div>

              </motion.div>


            <div className='w-full flex items-center justify-center gap-6 z-50 pointer-events-auto'>
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

            {/* 
            <div className='opacity-25'>
            <div className='icon-scroll'></div>
            </div> */}
          </div>
        </div>
      

      </div>
    </BackgroundGradientAnimation>
  );
};

export default Intro;
