import { useAddress, useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { HiMiniLink } from "react-icons/hi2";
import { ImSpinner8 } from "react-icons/im";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import basic from 'src/contracts/build/basic.json';
import Web3, { ContractAbi } from 'web3';

import ChainContext from "@/lib/context/Chain";

const chains: any[] = [
  {
    name: 'Base',
    slug: 'base',
    chainId: 8453,
    image: '/images/Base_color.png',
  },
  {
    name: 'Scroll',
    slug: 'scroll',
    chainId: 534352,
    image: '/images/Scroll_color.png',
  },
  {
    name: 'Bera Chain',
    slug: 'berachain-artio',
    chainId: 80085,
    image: '/images/Bera.png',
  },
  {
    name: 'Linea',
    slug: 'linea',
    chainId: 59144,
    image: '/images/Linea.png',
  },
  {
    name: 'Polygon ZkEVM',
    slug: 'polygon-zkevm',
    chainId: 1101,
    image: '/images/Polygon_zkEVM.png',
  }
];

const explorerLinks: any = {
  'base': 'https://basescan.org/tx/',
  'linea': 'https://lineascan.build/tx/',
  'scroll': 'https://scrollscan.com/tx/',
  'berachain-artio': 'https://artio.beratrail.io/tx/',
  'polygon-zkevm': 'https://zkevm.polygonscan.com/tx/',
}

const TokenDeployer = () => {
  const [web3Instance, setWeb3Instance] = useState<Web3>();
  const address = useAddress();
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const switchChain = useSwitchChain();
  const isMismatched = useNetworkMismatch();
  const [chainId, setChainId] = useState(8453);
  const [deploying, setDeploying] = useState(false);
  const CONTRACT_ABI: ContractAbi = basic.abi;

  const selectChainToDeploy = async (e: any, slug: any, chainId: number) => {
    e.preventDefault();
    setSelectedChain(slug);
    setChainId(chainId);
    // await updateGasPrice();
  }

  const deployToken = async () => {
    //working with Base, Manta and Scroll - worksaround for zkSync, compile it differently.
    if(web3Instance !== undefined) {
      setDeploying(true);
      const gasPrice = await web3Instance.eth.getGasPrice();

      const tokenContract = new web3Instance.eth.Contract(CONTRACT_ABI);
      const deployOptions: any = {
        data: '0x0' + basic.bytecode,
        arguments: [],
      };
  
      //address does not work in estimateGas
      const myAcc = await web3Instance.eth.getAccounts();
  
      try {
        const gasEst = await web3Instance.eth.estimateGas({
          to: myAcc[0],
          data: '0x608060405234801561000f575f80fd5b506101438061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c80632e64cec1146100385780636057361d14610056575b5f80fd5b610040610072565b60405161004d919061009b565b60405180910390f35b610070600480360381019061006b91906100e2565b61007a565b005b5f8054905090565b805f8190555050565b5f819050919050565b61009581610083565b82525050565b5f6020820190506100ae5f83018461008c565b92915050565b5f80fd5b6100c181610083565b81146100cb575f80fd5b50565b5f813590506100dc816100b8565b92915050565b5f602082840312156100f7576100f66100b4565b5b5f610104848285016100ce565b9150509291505056fea26469706673582212207ca8a77a375aff548bc76892f6b2093ea5bec72e34f6638bcd6bc43f620679bc64736f6c63430008160033',
        });
        //added a buffer to estimatedLimit
        const gasLimit = gasEst + BigInt(100000);

        const deployContract = tokenContract.deploy(deployOptions);

        await deployContract
        .send({
          from: address,
          gas: gasLimit.toString(),
          gasPrice: gasPrice.toString()
        })
        .once("transactionHash", (txhash) => {
          const link = explorerLinks[selectedChain] + txhash;
          toast(
            <>
              <p className='text-left font-bold'>Contract successfully deployed!</p>
              <div className='flex items-center gap-2 text-left'>
                <HiMiniLink /> 
                <a className="text-sm hover:underline opacity-80" href={link} target='_new'>Open {selectedChain.toUpperCase()} explorer</a>
              </div>
            </>
          );
        });
        setDeploying(false);
      } catch (error) {
        setDeploying(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const instance = new Web3(window.ethereum);
      setWeb3Instance(instance);
    }
    setSelectedChain('base');
  }, [setSelectedChain]);
  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[82vh] relative z-1 pb-20">
        <h2
          className='text-lg md:text-2xl text-center font-normal uppercase text-blue-400 opacity-40'>
          OG MOVE
        </h2>
        <h1 className='mb-1 font-medium text-center text-4xl text-white sm:text-4xl md:text-6xl'>
          Deploy your own <span className="leading-snug bg-[url('/svg/banner-light-blue.svg')] bg-cover bg-center px-4 text-white">
          Contract
            </span>
        </h1>
        <p className='mb-14 text-center tracking-wide text-gray-200 opacity-80 text-lg md:text-xl'>
          Diversify your contract interactions by deploying basic smart contracts
        </p>

        <div className="flex justify-center gap-3 mb-5">
          {chains.map((chain) => {
            return (
              <div 
                key={chain.slug} 
                className={
                  'relative flex flex-row p-2 text-center items-center justify-center text-white gap-1 rounded-md hover:bg-blue-600/40 ' +
                  (chain.slug === selectedChain ? 'bg-blue-600/40' : 'bg-blue-200/10')
                }
                onClick={(e) => selectChainToDeploy(e, chain.slug, chain.chainId)}
              >
                <Image
                  src={chain.image}
                  width={30}
                  height={30}
                  alt={chain.name} 
                />

              {chain.slug === selectedChain && (
                <span className="absolute top-[-7px] left-[-7px] text-lg text-blue-400">
                  <FaCircleCheck />
                </span>
              )}

              </div>
            );
          })}
        </div>

        <div className="text-xl text-white/90 mb-1">
          {selectedChain.toUpperCase()}
        </div>

        <div className="text-center text-3xl mb-2 opacity-10">
          <MdKeyboardDoubleArrowDown />
        </div>

        <div className='text-center mb-2'>
          {address && !isMismatched ? (
            <button
              className={
                'bg-blue-600 items-center px-5 py-2 hover:bg-blue-500 text-lg text-white font-semibold rounded-md ' +
                (deploying ? 'disabled' : null )
              }
              onClick={() => deployToken()}
            >
              {deploying ? (
                <div className='flex gap-2 items-center'>
                  <ImSpinner8 className="animate-spin" /> DEPLOYING
                </div>
              ) : ( 
                'DEPLOY CONTRACT'
              )}
            </button>
          ) : (
            <>
            <button
              className="bg-red-600 items-center px-5 py-2 hover:bg-red-700 text-lg text-white font-semibold rounded-md"
              onClick={() => switchChain(chainId)}
            >
              SWITCH CHAIN
            </button>
            <div className='mt-2 text-xs text-red-500'>Wrong network, please switch to <span className='uppercase font-bold'>{selectedChain}</span></div>
            </>

          )}
          <ToastContainer
            position="bottom-center"
            autoClose={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
        </div>

      </div>
    </>
  );
};

export default TokenDeployer;

