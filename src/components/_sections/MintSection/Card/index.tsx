import {
  useAddress,
  useChain,
  useContract,
  useNetworkMismatch,
  useSwitchChain} from '@thirdweb-dev/react';
import { ConnectWallet } from '@thirdweb-dev/react';
  import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'react-tippy';
import Spinner from '@/components/Spinner';

import { getXataClient } from '@/xata';
const xata = getXataClient();

import { FaRegCircleCheck } from "react-icons/fa6";

import ChainContext from "@/lib/context/Chain";

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
  const { selectedChain } = useContext(ChainContext);

  const explorerLinks: any = {
    'base': 'https://basescan.org/tx/',
    'scroll': 'https://scrollscan.com/tx/',
    'berachain-artio': 'https://artio.beratrail.io/tx/',
    'blast-blastmainnet': 'https://blastscan.io/tx/',
  }

  const mintNft = async () => {

    try {
      if (props.data.chainId != chain?.chainId) {
        return switchChain(props.data.chainId);
      } else {
        setClaiming(true);
        props.notifyMinting('please-confirm-tx', '', '');
        const tx = await contract?.erc721.claim(count);

        setMinted(true);
        setClaiming(false);
        if (tx) {
          const selectIndex = tx[0];
          const tokenId = parseInt(selectIndex.id.toString());

          await xata.db.mints.create({
            address: props.address,
            contract: props.data.contract,
            chain: props.slug,
            tokenId: tokenId
          });

          const link = explorerLinks[selectedChain] + selectIndex.receipt.transactionHash;
          props.notifyMinting('successfully-minted', link, selectedChain);
        }
      }
    } catch (error) {
      setClaiming(false);
      console.log(error);
      props.notifyMinting('error', '', '');
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
      <div className='transition-all duration-300 hover:rounded-md'>
        <div className='relative flex flex-col justify-center items-center overflow-hidden'>
          <Image
            src={'/' + props.data.image}
            width={580}
            height={580}
            alt={props.data.name} 
            className='rounded-md duration-500 group-hover:scale-110'
            priority={true}
          />
          <div className='absolute top-4 text-center group-hover:hidden'>
            <div className='z-10 mb-3 font-normal uppercase tracking-wide text-white text-2xl sm:text-3xl md:text-4xl xl:text-3xl'>
              {props.data.name}
            </div>
          </div>
          <div className='absolute bottom-0 w-full'>
            <div className='p-3 flex flex-row items-center justify-between'>
              <div className='text-md rounded-lg bg-cyan-400 px-2 font-normal tracking-wide text-gray-900 opacity-80'>
                <span className='pr-2 group-hover:hidden'>Supply</span>
                <span className='font-semibold group-hover:hidden'>
                  {props.data.supply > 0 ? (
                    <span>{props.data.supply}</span>
                  ) : (
                    <span>&#8734;</span>
                  )}
                </span>
              </div>
              <div className='flex flex-col items-center text-gray-900/90'>
                {address && minted && (
                  <div className='text-4xl lg:text-4xl xl:text-2xl p-1 rounded-full bg-cyan-400/80'>
                    <Tooltip
                      html={<span className="text-lg font-medium">Minted</span>}
                      position="top"
                      trigger="mouseenter"
                      >
                        <FaRegCircleCheck className='w-5 h-5' />
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='pb-2 pt-3'>
          <div className='flex flex-col md:flex-row items-center md:items-start justify-between'>
            <div className='mb-2 md:mb-0 w-full flex flex-row justify-between items-center md:items-start md:flex-col'>
              <div className='text-2xl font-light'>
                {(count * props.data.price).toFixed(4)} {props.currency}
              </div>
              {props.mainnet ? (
                <div className='text-sm text-gray-500/70'>
                  
                  {(count * props.data.price * props.ethMarketPrice).toFixed(2)} $
                </div>
              ) : (
                <div className='text-lg leading-6 tracking-widest text-white'>
                  TESTNET
                </div>
              )}

            </div>
            {address ? (
              <div className='w-full flex flex-col items-end'>
                <div className='mb-2 flex h-8 w-full md:w-32 overflow-hidden rounded-md bg-transparent text-2xl leading-6 lg:w-32 xl:w-28'>
                  <button
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-blue-950/80 text-xl text-gray-400 hover:bg-blue-700 hover:text-white lg:w-12 xl:w-10'
                    onClick={Decrement}
                  >
                    &minus;
                  </button>
                  <span className='inline-block h-full w-full md:w-12 border-b border-t border-gray-900 text-center text-base font-normal leading-8 text-gray-400 lg:w-12 xl:w-10'>
                    {count}
                  </span>
                  <button
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-blue-950/80 text-xl text-gray-400 hover:bg-blue-700 hover:text-white lg:w-12 xl:w-10'
                    onClick={Increment}
                  >
                    &#43;
                  </button>
                </div>
                {address && !isMismatched ? (
                  <button
                    className='w-full md:w-32 items-center rounded-md bg-blue-900/50 py-1 font-normal hover:bg-blue-700 hover:scale-105 md:hover:scale-110 duration-200 text-white text-lg lg:w-32 xl:w-28'
                    onClick={() => mintNft()}
                  >
                    {claiming ? (
                      <span className='flex flex-row justify-center gap-2'>
                        <Spinner/> 
                      </span>

                    ) : ( 
                      'Mint'
                    )}
                  </button>
                ) : (
                  <button
                    className='w-32 items-center rounded-md bg-slate-800 py-1 font-normal text-gray-300 group-hover:bg-red-500 hover:bg-blue-300 hover:text-white text-lg lg:w-32 xl:w-28'
                    onClick={() => switchChain(props.data.chainId)}
                  >
                    Switch
                  </button>
                )}
              </div>
            ) : (
              <div className='w-full flex flex-col items-end'>
                <div className='mb-2 flex h-8 w-full md:w-32 md:text-right overflow-hidden rounded-md bg-transparent leading-6 opacity-25'>
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
                  <span className='inline-block h-full w-full md:w-12 border-b border-t border-gray-900 text-center text-base font-bold leading-8 text-gray-400'>
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
                <div className='w-full flex items-end'>
                  <ConnectWallet className='!w-full dark-mint-button' theme='dark' />
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
