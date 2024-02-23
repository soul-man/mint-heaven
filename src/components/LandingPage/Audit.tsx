import { BsShieldCheck } from "react-icons/bs";
const Audit = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center text-center min-h-[200px] border-y-1 border-blue-700/10'>
        <div className='
          flex 
          items-center 
          justify-center 
          gap-2 
          pr-4 
          mb-3
          flex-row 
          text-center 
          text-lg 
          md:text-xl'
        >
          <span className="text-sm tracking-wide text-blue-400/60">
            contracts
          </span>
          <span className="text-2xl text-green-500">
            <BsShieldCheck />
          </span>
          <span className="text-sm tracking-wide text-blue-400/60">
            audited
          </span>
        </div>


        <h2 className="flex flex-col gap-3 items-center mb-2 text-xl font-semibold md:text-2xl">
          <span className="text-white mb-2">We use audited contracts from <a href="https://thirdweb.com/" target="_new"><span className="text-blue-100">thirdweb.com</span></a></span>
          <span className="w-14">
            <a href="https://thirdweb.com/" target="_new">
              <svg viewBox="0 0 516 321" fill="none">
                <g clip-path="url(#clip0_3:35)">
                  <path d="M1.40497 27.0011C-3.73633 14.022 5.84519 0 19.8669 0H106.919C115.098 0 122.342 4.86715 125.381 12.3996L194.671 185.299C196.541 189.935 196.541 195.149 194.671 199.901L151.087 308.484C144.427 325.056 120.823 325.056 114.163 308.484L1.40497 27.0011Z" fill="url(#paint0_linear_3:35)"></path>
                  <path d="M169.547 26.4217C164.873 13.5585 174.454 0 188.242 0H264.077C272.49 0 279.968 5.2148 282.772 12.9791L345.753 185.879C347.272 190.166 347.272 194.918 345.753 199.321L307.894 303.27C301.585 320.652 276.813 320.652 270.503 303.27L169.547 26.4217Z" fill="url(#paint1_linear_3:35)"></path>
                  <path d="M321.331 27.0011C316.19 14.022 325.771 0 339.793 0H426.845C435.024 0 442.269 4.86715 445.307 12.3996L514.597 185.299C516.467 189.935 516.467 195.149 514.597 199.901L471.013 308.484C464.353 325.056 440.75 325.056 434.089 308.484L321.331 27.0011Z" fill="url(#paint2_linear_3:35)"></path>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_3:35" x1="7.40492" y1="55.24" x2="260.485" y2="164.437" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F213A4"></stop>
                    <stop offset="0.1517" stop-color="#E011A7"></stop>
                    <stop offset="0.4554" stop-color="#B20DAF"></stop>
                    <stop offset="0.8789" stop-color="#6806BB"></stop>
                    <stop offset="1" stop-color="#5204BF"></stop>
                  </linearGradient>
                  <linearGradient id="paint1_linear_3:35" x1="175.093" y1="54.447" x2="410.968" y2="148.471" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F213A4"></stop>
                    <stop offset="0.1517" stop-color="#E011A7"></stop>
                    <stop offset="0.4554" stop-color="#B20DAF"></stop>
                    <stop offset="0.8789" stop-color="#6806BB"></stop>
                    <stop offset="1" stop-color="#5204BF"></stop>
                  </linearGradient>
                  <linearGradient id="paint2_linear_3:35" x1="327.331" y1="55.24" x2="580.411" y2="164.437" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F213A4"></stop>
                    <stop offset="0.1517" stop-color="#E011A7"></stop>
                    <stop offset="0.4554" stop-color="#B20DAF"></stop>
                    <stop offset="0.8789" stop-color="#6806BB"></stop>
                    <stop offset="1" stop-color="#5204BF"></stop>
                  </linearGradient>
                  <clipPath id="clip0_3:35"><rect width="516" height="321" fill="white"></rect></clipPath>
                </defs>
              </svg>
            </a>
          </span>
        </h2>
        <span className="pl-1 text-sm tracking-wide text-white/60">
            - SAFU -
          </span>
      </div>
    </>
  );
};

export default Audit;
