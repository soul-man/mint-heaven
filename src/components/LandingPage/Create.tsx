import { AiOutlineRise } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { IoMdContract } from "react-icons/io";
import { RiNftLine } from "react-icons/ri";

const Deploy = () => {
  return (
    <>
      <div className='
        relative flex flex-col gap-1 md:gap-8 lg:gap-20 justify-between
        p-5 sm:p-3 md:p-5 lg:p-7 
        mr-5 ml-5 sm:ml-0 xl:mr-0
        w-12/12 sm:w-6/12
        text-center md:text-left
        bg-blue-950/10 
        rounded-lg
        overflow-hidden'
      >
        <div>
        <h2 className="mb-6 text-4xl font-thin md:text-5xl lg:text-6xl md:!leading-[3.7rem] lg:!leading-[4.2rem]">
            <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">Create</span> your own NFTs with 3 clicks
          </h2>
          <p className='text-blue-400 font-thin text-xl lg:text-2xl mb-10'>
            MintHeaven makes it easy to create your own NFTs in three simple steps.
          </p>
        </div>

        <div className="z-10">
          <a href="./create-your-own-nft">
          <button className="bg-blue-700 items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:bg-blue-500 hover:scale-105 duration-200 text-lg md:text-xl text-white hover:text-black/70 font-normal rounded-lg">
              ...coming soon
            </button>
          </a>
        </div>

        {/* <div className="w-full">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
            <div className='flex flex-col md:flex-row lg:flex-row items-center text-white px-3 md:px-5 xl:px-4 py-3 md:py-3 gap-2 md:gap-4 xl:gap-4 rounded-md bg-blue-800/10'>
              <span className="rounded-full bg-blue-600/20 p-2">
                <RiNftLine className="text-2xl md:text-5xl text-green-500" />
              </span>
              <div className='flex flex-row md:flex-col items-center gap-1'>
                <span className='font-medium text-xl md:text-3xl text-white'>+1</span>
                <span className='font-light text-xl xl:text-lg text-blue-400'>NFT</span>
              </div>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-col items-center text-white px-3 md:px-5 xl:px-4 py-3 md:py-3 gap-2 md:gap-4 xl:gap-4 rounded-md bg-blue-800/10'>
              <span className="rounded-full bg-blue-600/20 p-2">
                <GrTransaction className="text-2xl md:text-5xl text-blue-600" />
              </span>
              <div className='flex flex-row md:flex-col items-center gap-1'>
                <span className='font-medium text-xl md:text-3xl text-white'>+3</span>
                <span className='font-light text-xl xl:text-lg text-blue-400'>Transactions</span>
              </div>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-col items-center text-white px-3 md:px-5 xl:px-4 py-3 md:py-3 gap-2 md:gap-4 xl:gap-4 rounded-md bg-blue-800/10'>
              <span className="rounded-full bg-blue-600/20 p-2">
                <IoMdContract className="text-2xl md:text-5xl text-yellow-600" />
              </span>
              <div className='flex flex-row lg:flex-col items-center gap-1'>
                <span className='font-medium text-xl md:text-3xl text-white'>+1</span>
                <span className='font-light text-xl xl:text-lg text-blue-400'>Contract call</span>
              </div>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-col items-center text-white px-3 md:px-5 xl:px-4 py-3 md:py-3 gap-2 md:gap-4 xl:gap-4 rounded-md bg-blue-800/10'>
              <span className="rounded-full bg-blue-600/20 p-2">
                <AiOutlineRise className="text-2xl md:text-5xl text-pink-600" />
              </span>
              <div className='flex flex-row md:flex-col items-center gap-1'>
                <span className='font-medium text-xl md:text-3xl text-white'>+more</span>
                <span className='font-light text-xl xl:text-lg text-blue-400'>Volume</span>
              </div>
            </div>
          </div>
        </div> */}

        <div className='
          absolute 
          w-[300px] 
          h-[100px] 
          top-[10%]
          left-[10%]
          md:w-[500px] 
          md:h-[500px] 
          md:top-[-40%] 
          md:left-[-25%] 
          rounded-full 
          bg-blue-900 
          opacity-20 
          mix-blend-lighten 
          blur-2xl 
          filter'
        >
        </div>

    </div>
    </>
  );
};

export default Deploy;
