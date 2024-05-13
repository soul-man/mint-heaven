import { useAddress, useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { HiMiniLink } from "react-icons/hi2";
import { ImSpinner8 } from "react-icons/im";
import { TbExternalLink } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';
import basic from 'src/contracts/build/basic.json';
import Web3, { ContractAbi } from 'web3';

import { getXataClient } from '@/xata';
const xata = getXataClient();

import ChainContext from "@/lib/context/Chain";

const chains: any[] = [
  {
    name: 'Base',
    slug: 'base',
    chainId: 8453,
    image: '/images/Base_color.png',
  },
  {
    name: 'Blast',
    slug: 'blast-blastmainnet',
    chainId: 81457,
    image: '/images/blast_color.png',
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
  'base': 'https://basescan.org/',
  'linea': 'https://lineascan.build/',
  'scroll': 'https://scrollscan.com/',
  'berachain-artio': 'https://artio.beratrail.io/',
  'polygon-zkevm': 'https://zkevm.polygonscan.com/',
  'blast-blastmainnet': 'https://blastscan.io/',
}

const TokenDeployer = () => {
  const [web3Instance, setWeb3Instance] = useState<Web3>();
  const address = useAddress();
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const switchChain = useSwitchChain();
  const isMismatched = useNetworkMismatch();
  const [chainId, setChainId] = useState(8453);
  const [chainName, setChainName] = useState('Base');

  const [deploying, setDeploying] = useState(false);
  const CONTRACT_ABI: ContractAbi = basic.abi;

  const selectChainToDeploy = async (e: any, slug: any, chainId: number, name: string) => {
    e.preventDefault();
    setSelectedChain(slug);
    setChainId(chainId);
    setChainName(name)
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
        .once("transactionHash", async (txhash) => {
          console.log(txhash);

          await xata.db.deployments.create({
            address: address,
            txHash: txhash,
            blockchain: selectedChain
          });

          const link = explorerLinks[selectedChain] + 'tx/' + txhash;
          toast(
            <>
              <p className='text-left text-2xl font-bold'>Contract successfully deployed!</p>
              <div className='flex items-center gap-2 text-left'>
                <a className="text-sm hover:underline" href={link} target='_new'>Open explorer</a>
                <HiMiniLink /> 
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

      <div className="flex flex-col px-4 xl:px-0 min-h-[90vh]">
        <div className='relative flex flex-col md:flex-row md:pl-10 xl:p-0 items-center md:text-left mt-20 mb-5 md:mb-5'>
          <div className='flex flex-col justify-center md:justify-start items-center md:items-start pl-0 w-1/1 md:w-9/12 lg:w-8/12 xl:pl-0'>

            <div className='mb-8 md:mb-5'>
              <div className='
                p-1 
                flex 
                rounded-lg 
                bg-blue-600/10 shadow-lg shadow-blue-600/25 border-1 border-blue-500/10
                px-2 
                tracking-wide 
                text-gray-300/80'
                >
                <h3 className="text-sm md:text-lg font-light">Diversify your on-chain footprint</h3>
              </div>
            </div>

            <h1 className="mb-7 font-light text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center md:text-left">
              Deploy your own <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">Smart Contracts</span>
            </h1>
            <h2 className='font-thin text-blue-400 text-xl md:text-3xl lg:text-4xl mb-20 text-center md:text-left'>
              Diversification is one key to Airdrops. Deploy a smart contract once a week.
            </h2>

            {/* CHAINS BOX */}
            <div className='mb-6 p-3 md:p-5 w-max rounded-md border-3 border-dashed border-blue-900/20 z-10'>
              <div className="flex gap-1 md:gap-3 mb-5">
                {chains.map((chain) => {
                  return (
                    <div 
                      key={chain.slug} 
                      className={
                        'relative flex flex-row p-2 text-center items-center justify-center text-white gap-1 rounded-md hover:bg-blue-600/30 ' +
                        (chain.slug === selectedChain ? 'bg-blue-600/30 shadow-lg shadow-violet-600/40 border-1 border-violet-500/20' : 'bg-blue-200/10')
                      }
                      onClick={(e) => selectChainToDeploy(e, chain.slug, chain.chainId, chain.name)}
                    >
                      <Image
                        src={chain.image}
                        width={40}
                        height={40}
                        alt={chain.name} 
                        className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]'
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col text-white">
                <span className="text-2xl md:text-3xl font-light mb-1">{chainName}</span>
                <div className="group flex flex-row items-center gap-2">
                  {address && (
                    <>
                      <span className="text-blue-400/70 text-sm">
                        <a href={explorerLinks[selectedChain] + 'address/' + address} target="_blank" className="hover:underline">Check your Wallet</a>
                      </span>
                      <TbExternalLink className="text-blue-300/90 group-hover:scale-125" />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* DEPLOY BUTTON */}
            <div className='flex flex-col justify-center md:justify-start gap-2 mb-2 ml-3'>
              
              {address && !isMismatched ? (
                <button
                  className='bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:bg-blue-500 hover:scale-105 duration-200 text-xl md:text-xl text-white hover:text-black/70 font-normal rounded-lg' 
                  onClick={() => deployToken()}
                >
                  {deploying ? 'Minting...' : 'DEPLOY CONTRACT'}
                </button>
              ) : (
                <>
                  <button
                    className='bg-red-700 uppercase items-center px-6 md:px-8 py-2.0 md:py-2.0 hover:bg-blue-500 hover:scale-105 duration-200 text-xl md:text-2xl text-white hover:text-black/70 font-normal rounded-lg' 
                    onClick={() => switchChain(chainId)}
                >
                  SWITCH CHAIN
                </button>
                <div className='ml-3 mt-2 text-sm text-red-500'>Wrong network, please switch to <span className='uppercase font-bold'>{selectedChain}</span></div>
                </>
              )}
            </div>

          </div>

          {/* ROCKET */}
          <div className="w-1/1 md:w-3/12 lg:w-4/12 hidden md:flex justify-center">
            <div className='relative'>
                <Image
                  src="/images/moon2.png"
                  width={260}
                  height={400}
                  alt="Crypto moon rocket"
                  className='rounded-md w-[200px] md:w-[260px] xl:w-[300px] z-10'
                />
              {/* <IoIosFlash className='lg:text-[400px] xl:text-[460px] ' /> */}
              <div className='
                overflow-hidden
                absolute 
                w-[100px] 
                h-[100px] 
                top-[10%]
                right-[40px]
                md:w-[350px] 
                md:h-[350px] 
                md:top-[20%] 
                md:right-[-20%] 
                rounded-full 
                bg-blue-700 
                opacity-10 
                mix-blend-lighten 
                blur-2xl 
                filter'>
              </div>
            </div>
          </div>
        </div>





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
  );
};

export default TokenDeployer;

