import {
  useAddress,
  useChain,
  useContract,
  useNetworkMismatch,
  useSwitchChain} from '@thirdweb-dev/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';

import { getXataClient } from '@/xata';
const xata = getXataClient();

import { CiBookmarkCheck } from 'react-icons/ci';

import { mintingProps } from "@/constant/models/mintingProps";

const MintCard: React.FC<mintingProps> = (props) => {

  const address = useAddress();
  const chain = useChain();
  const switchChain = useSwitchChain();
  const isMismatched = useNetworkMismatch();
  const { contract } = useContract(props.data.contract);
  const [count, setCount] = useState(1);
  const [claiming, setClaiming] = useState(false);
  const [minted, setMinted] = useState(false);

  const mintNft = async () => {
    try {
      if (props.data.chainId != chain?.chainId) {
        return switchChain(props.data.chainId);
      } else {
        setClaiming(true);
        props.notify('Please confirm the transaction');

        const tx = await contract?.erc721.claim(count);
        console.log(tx);

        await xata.db.mints.create({
          address: props.address,
          contract: props.data.contract,
          chain: props.slug,
        });

        setMinted(true);
        setClaiming(false);
        props.notify('NFT successfully minted');
      }
    } catch (error) {
      setClaiming(false);
      console.log(error);
      props.notify('Error!');
    }
  };

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

  useEffect(() => {
    if (props) {
      setMinted(props.data.minted);
    }
  }, [props]);

  return (
    <div className="group">
      <div className='transition-all duration-500 hover:scale-105'>
        <div
          style={{ backgroundImage: `url(${props.data.image})` }}
          className='
            relative 
            rounded-md 
            bg-gray-800 
            bg-cover 
            bg-center 
            p-4 
            w-auto
            min-[320px]:h-[24rem] 
            sm:h-[19rem] 
            md:h-[23rem] 
            lg:h-[22rem]
            xl:h-[17rem]'
          >
          <div className='text-center group-hover:hidden'>
            <div className='z-10 mb-3 font-bold text-4xl uppercase tracking-wide text-white lg:text-4xl xl:text-3xl'>
              {props.data.name}
            </div>
          </div>
          <div className='absolute bottom-4'>
            <div className='flex items-center justify-between group-hover:hidden'>
              <div className='text-md rounded-lg bg-cyan-400 px-3 font-normal tracking-wide text-gray-900 opacity-80'>
                <span className='pr-2'>Supply</span>
                <span className='font-semibold'>
                  {props.data.supply > 0 ? (
                    <span>{props.data.supply}</span>
                  ) : (
                    <span>&#8734;</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='pb-2 pt-3'>
          <div className='flex items-center justify-between'>
            <div>
              {props.mainnet ? (
                <div className='text-3xl text-white'>
                  $
                  {(count * props.data.price * props.ethMarketPrice).toFixed(2)}
                </div>
              ) : (
                <div className='text-xl leading-6 tracking-widest text-white'>
                  TESTNET
                </div>
              )}
              <div className='text-md font-semibold text-gray-600'>
                {(count * props.data.price).toFixed(4)} {props.currency}
              </div>
            </div>
            {address && minted && (
              <div className='flex flex-col items-center text-green-500'>
                <div className='text-4xl lg:text-4xl xl:text-3xl'>
                  <CiBookmarkCheck />
                </div>
                <div className='text-xs xl:hidden'>MINTED</div>
              </div>
            )}
            {address ? (
              <div>
                <div className='m-0 mb-2 flex h-8 w-32 overflow-hidden rounded-md bg-transparent text-2xl leading-6 lg:w-32 xl:w-28'>
                  <button
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-gray-900 text-xl text-gray-400 hover:bg-blue-600 hover:text-white lg:w-12 xl:w-10'
                    onClick={Decrement}
                  >
                    &minus;
                  </button>
                  <span className='inline-block h-full w-12 border-b border-t border-gray-900 text-center text-base font-bold leading-8 text-gray-400 lg:w-12 xl:w-10'>
                    {count}
                  </span>
                  <button
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-gray-900 text-xl text-gray-400 hover:bg-blue-600 hover:text-white lg:w-12 xl:w-10'
                    onClick={Increment}
                  >
                    &#43;
                  </button>
                </div>
                {address && !isMismatched ? (
                  <button
                    className='w-32 items-center rounded-md bg-slate-800 py-1 font-semibold text-gray-300 group-hover:bg-blue-600 hover:bg-blue-300 hover:text-white lg:w-32 xl:w-28'
                    onClick={() => mintNft()}
                  >
                    {claiming ? 'Minting...' : 'MINT'}
                  </button>
                ) : (
                  <button
                    className='w-32 items-center rounded-md bg-slate-800 py-1 font-semibold text-gray-300 group-hover:bg-red-500 hover:bg-blue-300 hover:text-white lg:w-32 xl:w-28'
                    onClick={() => switchChain(props.data.chainId)}
                  >
                    SWITCH
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div className='m-0 mb-2 flex h-8 w-32 overflow-hidden rounded-md bg-transparent leading-6 opacity-25'>
                  <button
                    disabled
                    type='button'
                    className={
                      'inline-block h-full w-12 cursor-pointer bg-gray-900 text-xl text-white active:hover:bg-blue-600' +
                      (!address ? 'disabled' : 'disabled')
                    }
                    onClick={Decrement}
                  >
                    &minus;
                  </button>
                  <span className='inline-block h-full w-12 border-b border-t border-gray-900 text-center text-base font-bold leading-8 text-gray-400'>
                    {count}
                  </span>
                  <button
                    disabled
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-gray-900 text-xl text-white active:hover:bg-6lue-500'
                    onClick={Increment}
                  >
                    &#43;
                  </button>
                </div>
                <div>
                  <ConnectWallet className='dark-mint-button' theme='dark' />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintCard;
