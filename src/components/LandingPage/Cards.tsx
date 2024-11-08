import { GrGrow } from "react-icons/gr";

const Cards = () => {
  return (
    <>

      <div className="max-w-7xl flex flex-col sm:flex-row mx-auto gap-5 xl:gap-8 pt-20 pb-44 xl:pb-8 px-5 md:px-10 xl:px-0">

        <div className='
          relative flex flex-col lg:flex-col gap-8 lg:gap-10 justify-between
          w-12/12 sm:w-6/12
          p-5 sm:p-5 lg:p-12 
          text-center md:text-left
          bg-black/20 border-1 border-blue-900/40 border-dashed
          rounded-lg
          overflow-hidden'>        
          <div>
            <h2 className="mb-6 text-4xl font-thin md:text-5xl lg:text-6xl md:!leading-[3.7rem] lg:!leading-[4.2rem]">
              <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">Deploy</span> your own Contracts 
            </h2>
            <p className='text-blue-300 font-thin text-xl lg:text-3xl'>
              We have simplified the process of deploying Smart Contracts yourself. 
              Deploy contracts in seconds on multiple blockchains.
            </p>
          </div>

          <div className="z-10">
            <a href="./create-your-own-nft">
              <button className="bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:scale-105 duration-200 text-lg md:text-xl text-white font-normal rounded-lg">
                Deploy now
              </button>
            </a>
          </div>


          {/* <div className="md:hidden lg:flex flex flex-row items-center justify-center w-1/1 md:w-5/12">
            <GrGrow className="text-[200px] md:text-[370px] text-blue-500" />
          </div> */}

          <div className='
            absolute 
            w-[300px] 
            h-[100px] 
            top-[10%]
            left-[10%]
            md:w-[500px] 
            md:h-[500px] 
            md:top-[-30%] 
            md:left-[-5%] 
            rounded-full 
            bg-blue-900 
            opacity-10 
            mix-blend-lighten 
            blur-2xl 
            filter'
          >
          </div>

        </div>

        <div className='
        relative flex flex-col gap-1 md:gap-8 lg:gap-10 justify-between
        w-12/12 sm:w-6/12
        p-5 sm:p-5 lg:p-12 
        text-center md:text-left
        bg-black/10 border-1 border-blue-900/40 border-dashed
        rounded-lg
        overflow-hidden'
      >
        <div>
          <h2 className="mb-6 text-4xl font-thin md:text-5xl lg:text-6xl md:!leading-[3.7rem] lg:!leading-[4.2rem]">
            <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">Create</span> your own NFTs
          </h2>
          <p className='text-blue-300 font-thin text-xl lg:text-3xl'>
            MintHeaven makes it easy to create your own NFTs in three simple steps.
          </p>
        </div>

        <div className="z-10">
          <a href="./create-your-own-nft">
          <button className="bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:scale-105 duration-200 text-lg md:text-xl text-white font-normal rounded-lg">
              coming soon
            </button>
          </a>
        </div>

        <div className='
          absolute 
          w-[300px] 
          h-[100px] 
          top-[10%]
          left-[10%]
          md:w-[500px] 
          md:h-[500px] 
          md:top-[-30%] 
          md:left-[-5%] 
          rounded-full 
          bg-blue-900 
          opacity-10 
          mix-blend-lighten 
          blur-2xl 
          filter'
        >
        </div>

    </div>

      </div>
    </>
  );
};

export default Cards;
