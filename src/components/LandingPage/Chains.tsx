import Image from 'next/image';
import { Tooltip } from 'react-tippy';

const Chains = () => {

  return (
    <>

      <div className='relative max-w-7xl mx-auto'>
        <div className="px-5 md:px-10 xl:px-0 relative">

          <div className='flex items-center justify-center gap-4 md:gap-14 z-50 pointer-events-auto'>
            <Tooltip
              html={<span className="text-xl font-medium">Base</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Base.png'
                width={33}
                height={33}
                alt='Base L2 Blockchain Logo'
                title='BASE'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">Linea</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Linea.png'
                width={35}
                height={35}
                alt='Linea L2 Blockchain Logo'
                title='LINEA'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">Scroll</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Scroll.png'
                width={32}
                height={32}
                alt='Scroll L2 Blockchain Logo'
                title='SCROLL'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">Bera Chain</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Bera.png'
                width={40}
                height={40}
                alt='Bera Chain Blockchain Logo'
                title='BERA Chain'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">Blast</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/blast.png'
                width={42}
                height={42}
                alt='Blast Blockchain Logo'
                title='BLAST'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
            <Tooltip
              html={<span className="text-xl font-medium">POLYGON zkEVM</span>}
              position="top"
              trigger="mouseenter"
            >
              <Image
                src='/images/Polygon_zkEVM.png'
                width={33}
                height={33}
                alt='Polygon zkEVM L2 Blockchain Logo'
                title='POLYGON zkEVM'
                className="pt-2 hover:scale-125 duration-400 opacity-60 hover:opacity-100"
              />
            </Tooltip>
          </div>

        </div>

      </div>


    </>
  );
};

export default Chains;
