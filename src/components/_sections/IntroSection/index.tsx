import { useState } from 'react';
import { CiBookmarkCheck } from 'react-icons/ci';

const IntroSection = () => {

  const [count, setCount] = useState(1);

  const Increment = () => {
    if (count >= 10) {
      setCount(10);
    } else {
      setCount(count + 1);
    }
  };

  const Decrement = () => {
    if (count <= 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <>
      <div className='relative flex flex-col md:flex-row justify-between text-center md:text-left mt-44 min-h-[700px]'>

        <div className='flex flex-col pl-0 pb-20 w-1/1 md:w-6/12 lg:w-7/12 md:pl-12 xl:pl-0'>
          <h2 className='font-grotesk mb-6 text-4xl sm:text-5xl lg:text-6xl text-white'>
            <span className="text-blue-600">Grow </span> your wallet <span className="text-blue-400">exponentially</span>
          </h2>
          <p className='mb-6 tracking-wide text-white text-2xl'>
            MINT & <span className='font-gray-100 font-bold'>REPEAT</span> and lift your wallet into the top 5%
          </p>
          <p className='mb-8 text-gray-400 text-lg lg:text-xl leading-loose pr-3'>
            To be eligible for an airdrop, the most important thing is regular interaction with contracts. 
            It is crucial to carry out at least one daily transaction, especially at the beginning.
          </p>
          <div>
            <a href="./mint-nfts">
              <button className=" bg-blue-500 items-center px-5 py-3 hover:bg-blue-600 text-xl text-white font-semibold rounded-md">
                START MINTING NOW
              </button>
            </a>
          </div>
        </div>
        
        <div className='flex w-1/1 pb-20 md:pr-16 md:w-6/12 lg:w-5/12 justify-center md:justify-end z-10'>
          <div className='cursor-pointer transition-all duration-500 hover:scale-105'>
            <div
              style={{ backgroundImage: `url(./images/nfts/base/to-the-moon.png)` }}
              className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[20rem] h-[20rem]'
            >
              <div className='text-center'>
                <div className='font-grotesk mb-3 text-4xl uppercase tracking-wide text-white lg:text-4xl xl:text-3xl'>
                  TO THE M00N
                </div>
              </div>
              <div className='absolute bottom-4'>
                <div className='flex items-center justify-between'>
                  <div className='text-md rounded-lg bg-cyan-400 px-3 font-normal tracking-wide text-gray-900 opacity-80'>
                    <span className='pr-2'>Supply</span>
                    <span className='font-semibold'>
                      <span>&#8734;</span>
                    </span>
                  </div>
                </div>
              </div>
          </div>

          <div className='pb-2 pt-3'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='text-3xl text-white'>
                  $ 0.49
                </div>
                <div className='text-md text-gray-600'>
                  0.0002 ETH
                </div>
              </div>
              <div className='flex flex-col items-center text-green-500'>
                <div className='text-4xl lg:text-4xl xl:text-3xl'>
                  <CiBookmarkCheck />
                </div>
                <div className='text-xs xl:hidden'>MINTED</div>
              </div>
              <div>
                <div className='m-0 mb-2 flex h-8 w-32 overflow-hidden rounded-md bg-transparent leading-6'>
                  <button
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-gray-900 text-xl text-white hover:bg-blue-600'
                    onClick={Decrement}
                  >
                    &minus;
                  </button>
                  <span className='inline-block h-full w-12 border-b border-t border-gray-900 text-center text-base font-bold leading-8 text-gray-400'>
                    {count}
                  </span>
                  <button
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-gray-900 text-xl text-white hover:bg-blue-600'
                    onClick={Increment}
                  >
                    &#43;
                  </button>
                </div>
                <a href="./mint-nfts">
                  <button
                    className='w-32 items-center rounded-md bg-slate-800 py-1 font-semibold text-white hover:bg-blue-600'
                  >
                    MINT
                  </button>
                </a>
              </div>
            </div>
          </div>

        </div>
        </div>

        <div className='
          absolute 
          w-[100px] 
          h-[100px] 
          top-[25vh]
          right-[40px]
          md:w-[350px] 
          md:h-[380px] 
          md:top-[15vh] 
          md:right-[5vw] 
          rounded-full 
          bg-indigo-600 
          opacity-10 
          mix-blend-lighten 
          blur-2xl 
          filter'
        >
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
          bg-indigo-700 
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

export default IntroSection;