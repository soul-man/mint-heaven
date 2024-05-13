import Image from 'next/image';
import { BsShieldCheck } from "react-icons/bs";

const ProTip = () => {
  return (
    <div className="w-full flex justify-center items-center gap-5 md:gap-10 px-5 xl:px-0">
      <div className='w-8/12 p-5 md:p-5 flex flex-col md:flex-row gap-5 md:gap-10 rounded-xl justify-center items-center bg-blue-950/10'>
        <div className="md:w-2/12 flex flex-col items-center justify-center">
          <span className="">
            <Image
              src="/images/thirdweb.png"
              width={170}
              height={170}
              alt="thirdweb" 
              className='w-[120px]'
            />
          </span>
        </div>
        <div className="md:w-10/12 flex flex-col items-center md:items-start">
          <span className="text-blue-400 font-thin text-xl md:text-2xl mb-2 text-center md:text-left">
            We use audited contracts from 
            <a href="https://thirdweb.com/" target="_new">
              <span className="text-blue-100"> thirdweb.com</span>
            </a>
          </span>
          <div className='flex flex-row items-center gap-3'>
            <span className="text-xl md:text-2xl text-green-500">
              <BsShieldCheck />
            </span>
            <span className="text-sm md:text-md text-white/40 uppercase mr-5">
              Audit
            </span>
            <span className="text-xl md:text-2xl text-green-500">
              <BsShieldCheck />
            </span>
            <span className="text-sm md:text-md text-white/40 uppercase">
              Safu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProTip;
