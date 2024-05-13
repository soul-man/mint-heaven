import { GrGrow } from "react-icons/gr";

const Create = () => {
  return (
    <>
      <div className='
        relative flex flex-col lg:flex-col gap-1 md:gap-8 lg:gap-20 justify-between
        p-5 sm:p-3 md:p-5 lg:p-7 
        ml-5 mr-5 sm:mr-0 xl:ml-0
        w-12/12 sm:w-6/12
        text-center md:text-left
        bg-blue-950/20
        rounded-lg
        overflow-hidden'>        
        <div>
          <h2 className="mb-6 text-4xl font-thin md:text-5xl lg:text-6xl md:!leading-[3.7rem] lg:!leading-[4.2rem]">
            <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">Deploy</span> your own Smart Contracts 
          </h2>
          <p className='text-blue-400 font-thin text-xl lg:text-2xl mb-5'>
            We have simplified the process of deploying Smart Contracts yourself. 
            Deploy contracts in seconds on multiple blockchains.
          </p>
          <p className='text-white font-medium text-2xl lg:text-2xl mb-5'>
            Check it out, it's FREE!
          </p>
        </div>

        <div className="z-10">
          <a href="./create-your-own-nft">
            <button className="bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:bg-blue-500 hover:scale-105 duration-200 text-lg md:text-xl text-white hover:text-black/70 font-normal rounded-lg">
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

export default Create;
