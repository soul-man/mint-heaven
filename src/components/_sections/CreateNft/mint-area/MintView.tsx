import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from "@phosphor-icons/react";
import MintButton from '@/components/buttons/MintButton';
import { useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { ChainOptions, base, scroll, blast, baseSepolia } from "thirdweb/chains";
import { ethMarketPriceTest } from '@/utils/ethMarketPrice';

interface MintViewProps {
  imageUrl: string;
  prompt: string;
  onClose: () => void;
  selectedChainId: number;
}

const chainMap: Record<number, Readonly<ChainOptions & { rpc: string }>> = {
  8453: base,
  84532: baseSepolia,
  534352: scroll,
  81457: blast,
};

export const MintView: React.FC<MintViewProps> = ({
  imageUrl,
  prompt,
  onClose,
  selectedChainId,
}) => {
  const [nftName, setNftName] = useState<string>('');
  const [ethPrice, setEthPrice] = useState<string>('0');
  const chain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [isChainSwitching, setIsChainSwitching] = useState(false);

  useEffect(() => {
    const fetchEthPrice = async () => {
      const price = await ethMarketPriceTest();
      if (price) {
        setEthPrice(price);
      }
    };
    fetchEthPrice();
  }, []);

  // Add effect to track chain changes
  useEffect(() => {
    if (chain?.id === selectedChainId) {
      setIsChainSwitching(false);
    }
  }, [chain?.id, selectedChainId]);

  const handleChainSwitch = async (id: number) => {
    const targetChain = chainMap[id];
    if (!targetChain) {
      console.error('Unsupported chain ID:', id);
      return;
    }
    try {
      setIsChainSwitching(true);
      await switchChain(targetChain);
    } catch (error) {
      console.error('Failed to switch chain:', error);
      setIsChainSwitching(false);
    }
  };

  console.log(prompt)

  return (
    <div className="flex flex-col h-full">
      {/* Image Preview with Overlay */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt="Selected NFT"
          fill
          className="object-cover"
        />

        {/* Top bar with mint price and close button */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-lg font-light text-white bg-black px-3 py-0.5 rounded-full">
              Mint Price: 0.0001 ETH (${(0.0001 * parseFloat(ethPrice)).toFixed(2)})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 text-white hover:text-white 
                   hover:bg-white/20 transition-all duration-200"
          >
            <X weight="bold" className="w-6 h-6" />
          </button>
        </div>

        {/* NFT Name Input Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-black/10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="nftName" className="text-md md:text-xl font-normal text-white">
                NFT Name
              </label>
              {nftName.length > 0 && nftName.length < 3 && (
                <span className="bg-red-500 text-xs text-white px-2 py-1 rounded-md">
                  Minimum 3 characters required
                </span>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-3/4 md:w-full">
                <input
                  type="text"
                  id="nftName"
                  value={nftName}
                  onChange={(e) => setNftName(e.target.value)}
                  placeholder="Enter a name for your NFT"
                  className={`w-full px-3 py-1.5 bg-white border rounded-md 
                    focus:ring-2 focus:ring-blue-600 focus:border-transparent
                    text-lg h-11 text-black placeholder-black/60
                    ${nftName.length > 0 && nftName.length < 3
                      ? 'border-red-500/50'
                      : 'border-blue-900/40'
                    }`}
                  minLength={3}
                />
              </div>
              <div className="w-1/4 md:w-fit">
                {chain?.id === selectedChainId && !isChainSwitching ? (
                  <div>
                    <MintButton
                      currentImage={imageUrl}
                      nftName={nftName}
                      nftPrompt={prompt}
                      onSuccess={() => {
                        setNftName('');
                        onClose();
                      }}
                      disabled={nftName.length < 3}
                    />
                  </div>
                ) : (
                  <button
                    className="w-full h-11 px-2 w-[10rem] rounded-md text-lg bg-red-500 font-normal text-white 
                      hover:bg-red-600 hover:text-white transition-all duration-200"
                    onClick={() => handleChainSwitch(selectedChainId)}
                    disabled={isChainSwitching}
                  >
                    {isChainSwitching ? 'Switching...' : 'Switch'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintView; 