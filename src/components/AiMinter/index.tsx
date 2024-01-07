import {
  useAddress,
  useChain,
  useContract,
  useSwitchChain,
} from '@thirdweb-dev/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { getXataClient } from '../../xata';
const xata = getXataClient();

import { CiBookmarkCheck } from 'react-icons/ci';

import 'react-toastify/dist/ReactToastify.css';

const AiMinter = () => {


  function notify(message: string) {
    toast(message);
  }

  const mintNft = async () => {
    try {
      if (props.data.chainId != chain?.chainId) {
        switchChain(props.data.chainId);
      } else {
        setClaiming(true);
        notify('Please confirm the transaction');
        const tx = await contract?.erc721.claim(count);

        console.log(tx);

        await xata.db.mints.create({
          address: props.address,
          contract: props.data.contract,
        });

        notify('NFT successfully minted');
        setClaiming(false);
        setMinted(true);
      }
    } catch (error) {
      setClaiming(false);
      console.log('ERROR test');
      notify('Error!');
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

  // useEffect(() => {
  //   if (props) {
  //     setMinted(props.data.minted);
  //   }
  // }, [props]);

  return (
    <div>
      <div className='cursor-pointer transition-all duration-500 hover:scale-105'>
test
      </div>
      <ToastContainer className='toast-message' />
    </div>
  );
};

export default AiMinter;
