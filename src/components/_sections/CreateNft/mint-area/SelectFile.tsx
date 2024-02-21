/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useContext, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";

import ChainContext from "@/lib/context/Chain";

import { selectFileProps } from "@/constant/models/selectFileProps";

const chains: any[] = [
  {
    name: 'Base',
    slug: 'base',
    chainId: 8453,
    contract: '0x03cd080A0C48D7820E48525F169B174Bf883BD08',
    image: '/images/Base_color.png',
  },
  {
    name: 'Scroll',
    slug: 'scroll',
    chainId: 534352,
    contract: '0xE458D69B8EdE7c84B1CC0d484945c901BF87FEF5',
    image: '/images/Scroll_color.png',
  },
  {
    name: 'Linea',
    slug: 'linea',
    chainId: 59144,
    contract: '0x89203Ab0998E681Ed2C5D8d8CfddC93F8B633ecd',
    image: '/images/Linea.png',
  }
];

const SelectFile: React.FC<selectFileProps> = (props) => {

  // Wird für später benötigt, um zu prüfen, wie groß die Datei ist.
  // if (typeof window !== "undefined") {
  //   const aScript = document.createElement('script');
  // }

  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const selectChainToMint = (e: any, slug: any, contract: string, chainId: number) => {
    e.preventDefault();
    setSelectedChain(slug);
    props.setContractToMint(contract);
    props.setChainId(chainId);
  }

  useEffect(() => {
    setSelectedChain('base');
}, [setSelectedChain]);
 
  return (
    <div className='flex flex-col items-center justify-center'>

      <div className="flex justify-center gap-3 mb-2">
        {chains.map((chain) => {
          return (
            <div 
              key={chain.slug} 
              className={
                'relative mix-blend-multiply flex flex-row p-2 text-center items-center justify-center text-white gap-1 rounded-md hover:bg-blue-600/40 ' +
                (chain.slug === selectedChain ? 'bg-blue-600/40' : 'bg-blue-200/10')
              }
              onClick={(e) => selectChainToMint(e, chain.slug, chain.contract, chain.chainId)}
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

      <div className="text-xl text-white/90 mb-5">
        {selectedChain.toUpperCase()}
      </div>

      <div className="w-[300px] md:w-[500px] flex flex-col items-center justify-center">
        <label className="flex flex-col rounded-lg border-1 border-dashed border-blue-500/20 w-full h-full p-2 group text-center bg-blue-700/10">
          <div className="Crop-Controls text-center">
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/gif, image/webp" 
              onChange={props.onSelectFile} 
              className="block w-full text-sm text-gray-400 rounded-lg border border-gray-800/40 cursor-pointer bg-blue-500/20 file:bg-stone-500 focus:outline-none placeholder-blue-700 pr-3" 
            />
          </div>
        </label>
      </div>
      <p className="mt-1 text-xs text-blue-300/70" id="file_input_help">JPG, PNG, GIF, WEBP (max. 1200x1200px)</p>

    </div>
  );
}
export default SelectFile;
