import Image from 'next/image';
import { BsShieldCheck } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

const Audit = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center mb-44 gap-5 xl:gap-8 px-5 xl:px-0">

      <div className="w-full md:w-6/12">

        <div className='w-full p-4 md:p-5 flex flex-col md:flex-row gap-5 md:gap-10 rounded-lg justify-center items-center bg-blue-950/10 border-2 border-dashed border-blue-950/20'>
          <div className="w-12/12 md:w-3/12 flex flex-col items-center justify-center">
              <span className="">
                <Image
                  src="/images/thirdweb.png"
                  width={170}
                  height={170}
                  alt="thirdweb" 
                  className='w-[80px] md:w-[120px]'
                />
              </span>
          </div>
          <div className="w-12/12 md:w-9/12 flex flex-col items-center md:items-start">
            <span className="text-white font-thin text-lg md:text-xl mb-5 text-center md:text-left">We use audited contracts from <a href="https://thirdweb.com/" target="_new"><span className="text-blue-100 hover:underline">thirdweb.com</span></a></span>
            <div className='
              flex 
              items-center 
              gap-3 
              pr-4 
              flex-row 
              text-center 
              text-lg 
              md:text-xl'
            >
              <span className="text-xl md:text-3xl text-green-500">
                <BsShieldCheck />
              </span>
              <span className="text-sm md:text-md lg:text-lg font-semibold text-blue-400 uppercase mr-5">
                Audited
              </span>
              <span className="text-xl md:text-3xl text-green-500">
                <BsShieldCheck />
              </span>
              <span className="text-sm md:text-md lg:text-lg font-semibold text-blue-400 uppercase">
                Safu
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full md:w-6/12">

        <div className='w-full p-4 md:p-5 flex flex-col md:flex-row gap-5 md:gap-10 rounded-lg justify-center items-center bg-blue-950/10 border-2 border-dashed border-blue-950/20'>
          <div className="w-12/12 md:w-3/12 flex flex-col items-center justify-center">
              <span className="">
                <Image
                  src="/images/midjourney.png"
                  width={170}
                  height={170}
                  alt="midjourney" 
                  className='w-[60px] md:w-[120px]'
                />
              </span>
          </div>
          <div className="w-12/12 md:w-9/12 flex flex-col items-center md:items-start">
            <span className="text-white font-thin text-lg md:text-xl mb-5 text-center md:text-left">Our NFTs are created with help <a href="https://www.midjourney.com/" target="_new"><span className="text-blue-100 hover:underline">midjourney.io</span></a></span>
            <div className='
              flex 
              items-center 
              gap-3 
              pr-4 
              flex-row 
              text-center 
              text-lg 
              md:text-xl'
            >
              <span className="text-xl md:text-3xl text-red-600">
                <FiHeart />
              </span>
              <span className="text-sm md:text-md lg:text-lg font-semibold text-blue-400 uppercase mr-5">
                Prompt with love
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Audit;
