import { AiOutlineRise } from "react-icons/ai";
import { GrGrow } from "react-icons/gr";
import { GrTransaction } from "react-icons/gr";
import { IoMdContract } from "react-icons/io";
import { RiNftLine } from "react-icons/ri";

const Create = () => {
  return (
    <>
      <div className='relative flex flex-col p-2 gap-10 lg:gap-20 md:flex-row justify-between text-center md:text-left mb-44'>

        <div className="w-1/1 md:w-6/12">
          <div className="rounded-md mb-3">
              <div className='
                p-2 
                pr-3
                flex 
                items-center 
                justify-center 
                text-md 
                md:text-lg 
                rounded-l
                bg-blue-950 
                font-normal 
                tracking-wide 
                text-white'
                >
                <div className='mr-4 text-sm rounded-lg bg-white p-1.5'>
                  <GrGrow className="text-lg md:text-2xl text-black"/>
                </div>
                <span>Grow your footprint <span className='underline'>exponentially</span></span>
              </div>
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            <div className="shrink-1 grow-1 flex flex-col flex-auto gap-3 items-center p-4 bg-blue-900/10 rounded-md">
              <RiNftLine className="text-2xl md:text-5xl text-blue-400/90" />
              <span className="text-lg md:text-xl">1 NFT</span>
            </div>
            <div className="shrink-1 grow-1 flex flex-col flex-auto gap-3 items-center p-4 bg-blue-900/10 rounded-md">
              <GrTransaction className="text-2xl md:text-5xl text-blue-400/90" />
              <span className="text-lg md:text-xl">3 Transactions</span>
            </div>
            <div className="shrink-1 grow-1 flex flex-col flex-auto gap-3 items-center p-4 bg-blue-900/10 rounded-md">
              <IoMdContract className="text-2xl md:text-5xl text-blue-400/90" />
              <span className="text-lg md:text-xl">1 Contract Call</span>
            </div>
            <div className="shrink-1 grow-1 flex flex-col flex-auto gap-3 items-center p-4 bg-blue-900/10 rounded-md">
              <AiOutlineRise className="text-2xl md:text-5xl text-blue-400/90" />
              <span className="text-lg md:text-xl">more Volume</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col pl-0 pb-20 w-1/1 md:w-6/12 md:pl-12 xl:pl-0'>
          <h2 className="mb-6 text-4xl font-medium md:text-6xl">
            Create{' '}
            <span className="leading-tight text-white">
              your own
            </span>
            {' '} NFTs
          </h2>
          <p className='mb-12 text-gray-400/70 text-lg lg:text-lg'>
            We have simplified the process of minting NFTs yourself. In less than a minute you get 3 transactions, 1 NFT, 1 Contract Call and more Volume.
          </p>
          <div className="z-10">
            <a href="./mint-nfts">
              <button className="bg-blue-600 items-center px-5 py-2 hover:bg-blue-700 text-xl text-white rounded-lg">
                Start creating now
              </button>
            </a>
          </div>
        </div>

        <div className='
          absolute 
          w-[300px] 
          h-[100px] 
          top-[16vh]
          left-[10vw]
          md:w-[600px] 
          md:h-[400px] 
          md:top-[-5vh] 
          md:left-[-3vw] 
          rounded-full 
          bg-blue-700 
          opacity-10 
          mix-blend-lighten 
          blur-2xl 
          filter'
        >
        </div>

      </div>
    </>
  );
};

export default Create;
