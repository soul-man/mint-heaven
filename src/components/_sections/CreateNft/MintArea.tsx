/* eslint-disable @next/next/no-img-element */
import React, {useRef, useState } from "react";
import {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import FormMintNft from '@/components/_sections/CreateNft/mint-area/FormMintNft';
import SelectFile from '@/components/_sections/CreateNft/mint-area/SelectFile';

import { canvasPreview } from "./helpers/canvasPreview";
import { useDebounceEffect } from "./helpers/useDebounceEffect";

// Center a % aspect crop
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function MintArea() {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale] = useState(1);
  const [rotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);
  const [contractToMint, setContractToMint] = useState("0x03cd080A0C48D7820E48525F169B174Bf883BD08");
  const [chainId, setChainId] = useState(8453);
  const [isLoading, setIsLoading] = useState(false);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      e.preventDefault();
      setIsLoading(true);
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || ""),
      );
      reader.readAsDataURL(e.target.files[0]);
      setIsLoading(false);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(1 / 1);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 1 / 1);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <div className='flex flex-row gap-10 justify-center z-10'>
      {isLoading && (
        <div className='flex flex-col justify-center'>
          <div role="status">
            <svg aria-hidden="true" className="inline w-10 h-10 text-gray-700 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div className="text-blue-400 text-lg font-semibold">(Coming soon)</div>

      {!imgSrc && !isLoading && (
        <SelectFile 
          onSelectFile={onSelectFile} 
          setContractToMint={setContractToMint}
          setChainId={setChainId}
          />
      )}

      {imgSrc && !isLoading && (
        <FormMintNft 
          onImageLoad={onImageLoad}
          handleToggleAspectClick={handleToggleAspectClick}
          setCompletedCrop={setCompletedCrop}
          setCrop={setCrop}
          setImgSrc={setImgSrc}
          crop={crop}
          aspect={aspect}
          imgRef={imgRef}
          imgSrc={imgSrc}
          scale={scale}
          rotate={rotate}
          previewCanvasRef={previewCanvasRef}
          completedCrop={completedCrop}
          contractToMint={contractToMint}
          chainId={chainId}
        />
      )}
    </div>
  );
}