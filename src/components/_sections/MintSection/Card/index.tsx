import {
  getContract,
} from "thirdweb";
import { sendTransaction } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import { client } from "@/constant/constants";
import { defineChain, type ChainOptions } from "thirdweb/chains";

import { useActiveAccount, useActiveWallet, useActiveWalletChain, useSwitchActiveWalletChain } from 'thirdweb/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tippy';
import Spinner from '@/components/Spinner';

import { getXataClient } from '@/xata';
const xata = getXataClient();

import { FaRegCircleCheck } from "react-icons/fa6";
import { base, scroll, blast, sepolia } from "thirdweb/chains";

import { mintingProps } from "@/constant/models/mintingProps";

const MintCard: React.FC<mintingProps> = (props) => {

  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [count, setCount] = useState(1);
  const [claiming, setClaiming] = useState(false);
  const [minted, setMinted] = useState(false);

  const chainMap: Record<number, Readonly<ChainOptions & { rpc: string }>> = {
    8453: base,
    84532: sepolia,
    534352: scroll,
    81457: blast,
  };

  const handleChainSwitch = async () => {
    const targetChain = chainMap[props.data.chainId];
    if (!targetChain) {
      console.error('Unsupported chain ID:', props.data.chainId);
      return;
    }
    try {
      await switchChain(targetChain);
    } catch (error) {
      console.error('Failed to switch chain:', error);
    }
  };

  const explorerLinks: any = {
    'Base': 'https://basescan.org/tx/',
    'Scroll': 'https://scrollscan.com/tx/',
    'Blast': 'https://blastscan.io/tx/',
  }

  const mintNft = async () => {

    if (!account) {
      throw new Error("No account connected");
    }

    try {
      setClaiming(true);
      props.notifyMinting('please-confirm-tx', '', '');

      const contract = getContract({
        client,
        chain: defineChain(props.data.chainId),
        address: props.data.contract,
      });

      const transaction = claimTo({
        contract,
        to: account?.address,
        quantity: BigInt(count),
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      await xata.db.mints.create({
        address: account?.address,
        contract: props.data.contract,
        chain: props.slug
      });

      console.log('transactionHash:', transactionHash)
      console.log('chain?.chainId:', chain)

      const link = explorerLinks[chain?.name || ''] + transactionHash;
      props.notifyMinting('successfully-minted', link, chain?.name || '');

      setMinted(true);
      setClaiming(false);
    } catch (error) {
      setClaiming(false);
      console.log('Transaction error:', error);

      // Extract error message for notification
      let errorMessage = '';

      if (error instanceof Error) {
        errorMessage = error.message;

        // Parse the error message to extract specific details
        if (errorMessage.includes('insufficient funds')) {
          // Handle the specific insufficient funds error
          try {
            // Try to extract the detailed error message if it's in JSON format
            const jsonMatch = errorMessage.match(/\{.*\}/);
            if (jsonMatch) {
              const errorJson = JSON.parse(jsonMatch[0]);
              if (errorJson.message) {
                errorMessage = 'Insufficient funds: ' + errorJson.message.split('err: ')[1];
              }
            }
          } catch (parseError) {
            // If parsing fails, use a generic message
            errorMessage = 'You don\'t have enough funds to cover gas fees and the NFT price.';
          }
        } else if (errorMessage.includes('user rejected')) {
          errorMessage = 'Transaction was rejected by user.';
        } else if (errorMessage.includes('Execution Reverted')) {
          errorMessage = 'Transaction failed: Contract execution reverted.';
        }
      }

      props.notifyMinting('error', '', errorMessage);
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
                {account && minted && (
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

        <div className='pb-4 md:pb-2 pt-1 md:pt-3'>
          <div className='flex flex-col md:flex-row items-center md:items-start justify-between'>
            <div className='mb-1 md:mb-0 w-full flex flex-row justify-between items-center md:items-start md:flex-col'>
              <div className='text-lg md:text-xl font-light'>
                {(count * props.data.price).toFixed(4)} {props.currency}
              </div>
              <div className='text-md text-gray-400'>

                {(count * props.data.price * props.ethMarketPrice).toFixed(2)} $
              </div>

            </div>
            {account ? (
              <div className='w-full flex flex-col items-end'>
                <div className='mb-3 flex h-8 w-full md:w-32 overflow-hidden rounded-md bg-transparent text-2xl leading-6 lg:w-32 xl:w-28'>
                  <button
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-black/30 text-xl text-gray-400 hover:bg-blue-700 hover:text-white lg:w-12 xl:w-10'
                    onClick={Decrement}
                  >
                    &minus;
                  </button>
                  <span className='inline-block h-full w-full md:w-12 bg-blue-950/60 text-center text-base font-normal leading-8 text-gray-200 lg:w-12 xl:w-10'>
                    {count}
                  </span>
                  <button
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-black/30 text-xl text-gray-400 hover:bg-blue-700 hover:text-white lg:w-12 xl:w-10'
                    onClick={Increment}
                  >
                    &#43;
                  </button>
                </div>
                {account && chain?.id == props.data.chainId ? (
                  <button
                    className='w-full md:w-32 items-center rounded-md bg-blue-700 py-1 font-normal tracking-wider hover:bg-blue-800 hover:scale-105 md:hover:scale-110 duration-200 text-white text-lg lg:w-32 xl:w-28'
                    onClick={() => mintNft()}
                  >
                    {claiming ? (
                      <span className='flex flex-row justify-center gap-2'>
                        <Spinner />
                      </span>

                    ) : (
                      'MINT'
                    )}
                  </button>
                ) : (
                  <button
                    className='w-full md:w-32 items-center rounded-md bg-slate-800 py-1 font-normal tracking-wider text-gray-300 group-hover:bg-red-500 hover:bg-blue-300 hover:text-white text-lg lg:w-32 xl:w-28'
                    onClick={handleChainSwitch}
                  >
                    SWITCH
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
                      (!account ? 'disabled' : 'disabled')
                    }
                    onClick={Decrement}
                  >
                    &minus;
                  </button>
                  <span className='inline-block h-full w-full md:w-12 border-b border-t border-gray-900 text-center font-bold leading-8'>
                    {count}
                  </span>
                  <button
                    disabled
                    type='button'
                    className='inline-block h-full w-12 cursor-pointer bg-gray-900 text-xl text-white active:hover:bg-blue-500'
                    onClick={Increment}
                  >
                    &#43;
                  </button>
                </div>
                <div className='w-full flex items-end'>
                  {/* <ConnectButton className='!w-full dark-mint-button' theme='dark' /> */}
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
