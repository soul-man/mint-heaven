// import { useChain, useContract, useSwitchChain } from '@thirdweb-dev/react';
// import Image from 'next/image';
import { FaRegFaceGrinStars } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";

// import MintArea from '@/components/_sections/CreateNft/MintArea';
import MintAreaComingSoon from "@/components/_sections/CreateNft/MintAreaComingSoon";

const CreateNft = () => {

  return (
    <div className="flex items-center justify-center min-h-[92vh] relative z-1 pb-44">

      <div className='flex flex-col items-center justify-center z-1'>
        <h2
          className='text-lg md:text-2xl text-center font-normal uppercase text-blue-400 opacity-40'>
          In under 1 minute
        </h2>
        <h1 className='mb-1 text-center font-medium text-4xl text-white sm:text-4xl md:text-6xl'>
          Mint your <span className="leading-snug bg-[url('/svg/banner-light-blue.svg')] bg-cover bg-center px-4">
          own NFT
            </span>
        </h1>
        <p className='mb-10 text-center font-normal tracking-wide text-gray-200 opacity-80 text-lg md:text-xl'>
           Send your favourite image to your desired Blockchain and <span className='underline'>grow your footprint</span>
        </p>
        <div className='hidden mb-14 gap-2 md:flex flex-row flex-wrap items-center justify-center text-sm lg:text-lg text-gray-700'>
          <div className='rounded-md bg-blue-700/10 text-blue-300 px-4 py-2 tracking-wide ring-1 ring-inset ring-gray-600/10'>
            3 Transactions
          </div>
          +
          <div className='rounded-lg bg-blue-700/10 text-blue-300 px-4 py-2 tracking-wide ring-1 ring-inset ring-gray-600/10'>
            1 Token Holding
          </div>
          +
          <div className='rounded-lg bg-blue-700/10 text-blue-300 px-4 py-2 tracking-wide ring-1 ring-inset ring-gray-600/10'>
            1 Contract call
          </div>
          +
          <div className='rounded-lg bg-blue-700/10 text-blue-300 px-4 py-2 tracking-wide ring-1 ring-inset ring-gray-600/10'>
            more Volume
          </div>
          =
          <GiTakeMyMoney className='text-5xl text-blue-400'/>
          <FaRegFaceGrinStars className='text-3xl text-blue-400'/>
        </div>

        <MintAreaComingSoon/>

      </div>

      {/* <div aria-hidden="true" className="absolute opacity-70 top-[-100px] z-0">
        <Image src="/images/bg/docs-right.png" title="background blur" className="h-[800px] shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" alt="docs right background" data-loaded="true" />
      </div> */}

    </div>
  );
};

export default CreateNft;
