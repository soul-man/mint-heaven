import React from 'react';
import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import SoundPlayer from '@/components/LandingPage/SoundPlayer';
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { SparklesCore } from '@/components/ui/sparkles';
import { RiLightbulbFlashFill } from "react-icons/ri";

const Intro = () => {

  const [isExploding, setIsExploding] = useState<boolean>(false);

  const Explotion = () => {
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
    }, 2000)
  }

  return (
    <div className="mb-20">
      <BackgroundGradientAnimation>
        <div className='mb-10 absolute z-40 w-full'>
          <div className='flex flex-col items-center'>
            <div className='flex flex-col max-w-7xl z-40 items-center justify-center min-h-[calc(100vh)]'>
              {/* Intro text */}

              <div
                className="flex flex-col items-center justify-center w-full">

                <div className="">
                  <div onClick={() => Explotion()} className='
                      pb-3 
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
                        <RiLightbulbFlashFill className="text-xl md:text-2xl text-white" />
                      </div>
                      <h3 className="text-sm md:text-lg font-normal">Airdrops are free money</h3>
                    </div>
                    <div className="w-[12rem] md:w-[16rem] h-5 relative">
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

                <div className="flex flex-col md:flex-row items-center gap-6 z-50 pointer-events-auto">
                  <a href="./airdrop-farming-nft-minting">
                    <button className="bg-blue-700 uppercase items-center px-6 md:px-10 py-1.5 md:py-2.5 hover:scale-105 duration-200 text-xl md:text-2xl text-white font-normal rounded-lg z-50">
                      Start farming
                    </button>
                  </a>
                  <SoundPlayer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default Intro;
