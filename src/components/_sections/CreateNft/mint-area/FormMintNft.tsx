/* eslint-disable @next/next/no-img-element */
import { useAddress, useContract, useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react';
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiMiniLink } from "react-icons/hi2";
import { ImCheckboxChecked,ImCheckboxUnchecked } from "react-icons/im";
import ReactCrop from "react-image-crop";
import { toast, ToastContainer } from 'react-toastify';

import ChainContext from "@/lib/context/Chain";

import cropImage from "@/components/_sections/CreateNft/helpers/cropImage";
import StatusNftCreation from "@/components/_sections/CreateNft/mint-area/StatusNftCreation";
import Spinner from "@/components/Spinner/index";

import { getXataClient } from '@/xata';
const xata = getXataClient();

const explorerLinks: any = {
  'base': 'https://basescan.org/tx/',
  'linea': 'https://lineascan.build/tx/',
  'scroll': 'https://scrollscan.com/tx/',
  'berachain-artio': 'https://artio.beratrail.io/tx/',
  'polygon-zkevm': 'https://zkevm.polygonscan.com/tx/',
}

export interface mintNftProps {
  onImageLoad(e: any): any;
  handleToggleAspectClick(): any;
  setCompletedCrop(e: any): any;
  setCrop(e: any): any;
  setImgSrc(e: any): any;
  crop: any;
  aspect: any;
  imgRef: any;
  imgSrc: string;
  scale: number;
  rotate: number;
  previewCanvasRef: any;
  completedCrop: any;
  contractToMint: string;
  chainId: any;
}

interface FormErrors {
  name?: string;
  description?: string;
  // Add other form fields if needed
}

const statusInitialState = {
  UPLOAD_NFT: false,
  UPLOAD_NFT_HASH: "",
  UPLOAD_NFT_FINISHED: false,
  SET_NFT_DATA: false,
  SET_NFT_DATA_HASH: "",
  SET_NFT_DATA_FINISHED: false,
  MINT_NFT: false,
  MINT_NFT_HASH: "",
  MINT_NFT_FINISHED: false,
}

const FormMintNft: React.FC<mintNftProps> = (props) => {

  const { selectedChain } = useContext(ChainContext);

  const switchChain = useSwitchChain();
  const isMismatched = useNetworkMismatch();
  const address = useAddress();
  // const chain = useChain();

  const {contract} = useContract(props.contractToMint);
  const [croppedUrl, setCroppedUrl] = useState("");
  const [status, setStatus] = useState(statusInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const createCroppedUrl = async () => {
    setIsLoading(true)
    const image: any = await cropImage(
      props.imgRef.current,
      props.imgRef,
      props.completedCrop,
      true
    );
    setIsLoading(false)
    return image.jpegFile;
  }

  const mintNft = async (e: any) => {
    try {
      e.preventDefault();
      setClaiming(true);

      const url = await createCroppedUrl();
      setCroppedUrl(url)

      const metadata = [{
        name: e.target[0].value,
        description: e.target[1].value,
        image: url 
      }];

      console.log('metadata: ', metadata)

      status.UPLOAD_NFT = true;
      setStatus({...status});

      // 1. Upload and create the NFTs on chain
      const results = await contract?.erc1155.lazyMint(metadata);

      let tokenId!: any;
      if (results) {
        tokenId = results[0].id;
        status.UPLOAD_NFT_HASH = results[0].receipt.blockHash;
        setStatus({...status});
        console.log('Upload results: ', results);
      }

      // const tokenId = results[0].id;
      console.log('tokenId: ', tokenId);
      // const firstNFT = await results[0].data();

      status.UPLOAD_NFT_FINISHED = true;
      setStatus({...status});
      status.SET_NFT_DATA = true;
      setStatus({...status});

      // 2. Set the claim phase
      const publicSaleStartTime = new Date();
      const claimConditions = [
        {
          startTime: publicSaleStartTime,
          price: 0.00045,
        }
      ];
      await contract?.erc1155.claimConditions.set(tokenId, claimConditions);

      status.SET_NFT_DATA_FINISHED = true;
      setStatus({...status});
      status.MINT_NFT = true;
      setStatus({...status});

      // 3. Mint the NFT and store data in xata db
      const tx = await contract?.erc1155.claim(tokenId, 1);
      const receipt = tx?.receipt;
      console.log('receipt: ', receipt)

      await xata.db.createdNfts.create({
        name: e.target[0].value,
        description: e.target[1].value,
        image: url,
        address: address,
        chain: selectedChain,
        tokenId: tokenId,
      });

      status.MINT_NFT_HASH = receipt?.blockHash || '';
      setStatus({...status});
      status.MINT_NFT_FINISHED = true;
      setStatus({...status});

      const link = explorerLinks[selectedChain] + tx?.receipt.blockHash;

      toast(
        <>
          <p className='text-left font-bold'>NFT successfully created!</p>
          <div className='flex items-center gap-2 text-left'>
            <HiMiniLink /> 
            <a className="text-sm hover:underline opacity-80" href={link} target='_new'>Open {selectedChain.toUpperCase()} explorer</a>
          </div>
        </>
      );

    } catch (error) {
      console.log(error);
    }
  };

  const restartProcess = () => {
    props.setImgSrc("");
    setClaiming(false);
    setStatus(statusInitialState);
  }

  const NftForm = (props: any) => {
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [isFormValid, setIsFormValid] = useState(false); 
    const [errors, setErrors] = useState<FormErrors>({}); 

    const switcher = (e: any, chainId: any) => {
      e.preventDefault();
      switchChain(chainId)
    }

    useEffect(() => { 
      validateForm(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, description]); 

    const validateForm = () => { 
      const errors: { name?: string; description?: string } = {}; 

      if (!name) { 
        errors.name = 'is required!'; 
      } else if (name.length < 3) { 
        errors.name = 'min. 3 characters.'; 
      }

      if (!description) { 
          errors.description = 'is required!'; 
      } else if (description.length < 10) { 
        errors.description = 'min. 10 characters.'; 
      }

      setErrors(errors); 
      setIsFormValid(Object.keys(errors).length === 0); 
    }; 

    if (isLoading) {
      return (
        <Spinner/>
      )
    } else {
      return(
        <form className="edit-tx pb-1" onSubmit={(e)=> mintNft(e)}>
          <div className="group relative w-auto mb-3">
            <div className="flex items-center justify-between">
              <label className="block pb-1 text-md text-gray-100 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Name</label>
              {errors.name ? (
                <div className='text-sm text-red-500'>{errors.name}</div>
              ):(
                <div className='text-lg text-green-500'><FaCheck className='animate-appearance-in'/></div>
              )}
            </div>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              id="name" 
              className="h-9 w-full rounded-md text-gray-400 border-slate-800 bg-gray-800/30 px-4 font-thin transition-all duration-200 ease-in-out focus:bg-gray-900"
            />            
          </div>
          <div className="group relative w-auto mb-5">
            <div className="flex items-center justify-between">
              <label className="block pb-1 text-md text-gray-100 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Description</label>
              {errors.description ? (
                <div className='text-sm text-red-500'>{errors.description}</div>
              ):(
                <div className='text-lg text-green-500'><FaCheck className='animate-appearance-in'/></div>
              )}
            </div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" className="h-40 w-full rounded-md text-gray-400 border-slate-800 bg-gray-800/30 px-4 font-thin transition-all duration-200 ease-in-out focus:bg-gray-900"></textarea>
          </div>

          <div className='flex gap-3 flex-row'>
            {address && !isMismatched ? (
              <>
                <button
                  disabled={!isFormValid}
                  type='submit'
                  className={
                    'w-full items-center h-11 rounded-md bg-blue-600 font-semibold text-xl text-white ' +
                    (!isFormValid ? 'bg-blue-700/60 cursor-not-allowed' : 'bg-blue-60 hover:bg-blue-500')
                  }
                >
                  {props.claiming ? 'Minting...' : 'MINT'}
                </button>
                  <button
                  type='submit'
                  className='w-full items-center h-11 rounded-md bg-slate-800 text-gray-500 text-xl hover:bg-slate-700 hover:text-white'
                  onClick={() => restartProcess()}
                >
                  CANCEL
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-red-600 w-full items-center px-5 py-2 hover:bg-red-700 text-lg text-white font-semibold rounded-md"
                  onClick={(e) => switcher(e, props.chainId)}
                >
                  SWITCH CHAIN
                </button>
              </>
            )}
          </div>
        </form>
      )
    }
  }

  return (

    <div className='flex flex-col md:flex-row gap-10 justify-center'>
      <div className="flex flex-col">
        <div className='w-[300px] ring-1 ring-inset ring-gray-700/10 rounded-md mb-3'>
        {/* <div className={'w-[250px] ring-1 ring-inset ring-gray-700/10 rounded-md mb-3 ' + (!props.imgSrc ? 'h-max' : 'h-[320px]')}> */}

          {claiming ? (
            <>
            { croppedUrl ? (
              <div className="box">
                <span></span>
                <img src={croppedUrl} alt="Your cropped Nft preview"/>
              </div>
              ) : (
                <Spinner/>
              )}
            </>

          ) : (
            <ReactCrop
              crop={props.crop}
              onChange={(_, percentCrop) => props.setCrop(percentCrop)}
              onComplete={(c) => props.setCompletedCrop(c)}
              aspect={props.aspect}
            >
              <img
                ref={props.imgRef}
                alt="Crop me"
                src={props.imgSrc}
                style={{ transform: `scale(${props.scale}) rotate(${props.rotate}deg)` }}
                onLoad={props.onImageLoad}
              />
            </ReactCrop>
          )}
        </div>

        {!claiming && (
          <button onClick={props.handleToggleAspectClick}>
            <div className="flex items-center content-start">
              <span className="text-xl mr-2 text-gray-200">
                {props.aspect ? <ImCheckboxChecked/> : <ImCheckboxUnchecked/>}
              </span>
              <span className='text-gray-500'>
                Aspect ratio 1:1
              </span>
            </div>
          </button>
        )}

      </div>

      <div className='w-[300px]'>
        { !claiming ? (
          <NftForm chainId={props.chainId}/>
        ) : (
          <StatusNftCreation 
            status={status}
            restartProcess={restartProcess}
          />
        )}
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
}
export default FormMintNft;
