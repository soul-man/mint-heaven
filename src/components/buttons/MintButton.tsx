import React from 'react';
import { uploadFileToIPFS } from "../../../src/lib/ipfs";
import { mintWithSignature } from "thirdweb/extensions/erc721";
import { mintHeavenContract } from "../../../src/constant/constants";
import useSWRMutation from 'swr/mutation';
import { TransactionButton, useActiveAccount } from 'thirdweb/react';
import { sendTransaction } from "thirdweb";

async function fetchSignature(url: string, { arg }: { arg: { address: string, imgSrc: string, name: string, prompt: string } }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return response.json();
}

interface MintButtonProps {
  currentImage: string;
  nftName: string;
  nftPrompt: string;
  onSuccess?: () => void;
  disabled?: boolean;
}

const MintButton: React.FC<MintButtonProps> = ({
  currentImage,
  nftName,
  nftPrompt,
  onSuccess,
  disabled
}) => {
  const { trigger: getSignature } = useSWRMutation('/api/generate-signature', fetchSignature);
  const activeAccount = useActiveAccount();

  const handleClaim = async () => {
    if (!activeAccount) {
      throw new Error("Please connect your wallet first");
    }

    if (!nftName.trim()) {
      throw new Error("Please enter a name for your NFT");
    }

    try {
      if (!currentImage) {
        console.error('No image selected for minting');
        throw new Error("No image selected for minting");
      }

      let ipfsUrl;
      try {
        ipfsUrl = await uploadFileToIPFS(currentImage);
      } catch (uploadError) {
        console.error("Failed to upload image to IPFS:", uploadError);
        throw new Error(`Failed to upload image: ${(uploadError as Error).message}`);
      }

      const signatureResponse = await getSignature({
        address: activeAccount.address,
        imgSrc: ipfsUrl,
        name: nftName,
        prompt: nftPrompt
      });

      if (signatureResponse && signatureResponse.payload && signatureResponse.signature) {
        const transaction = mintWithSignature({
          contract: mintHeavenContract,
          payload: signatureResponse.payload,
          signature: signatureResponse.signature,
        });

        const { transactionHash } = await sendTransaction({
          transaction,
          account: activeAccount
        });

        if (transactionHash) {
          return transactionHash;
        } else {
          throw new Error("Transaction failed");
        }
      } else {
        console.error('Failed to get signature', signatureResponse);
        throw new Error("Failed to get signature");
      }
    } catch (error) {
      console.error("Error during claim process:", error);
      throw error;
    }
  };

  return (
    <div className="group flex flex-col gap-5 items-center">
      <div className="w-full">
        <TransactionButton
          className={`!w-full !bg-blue-600 !min-w-fit !text-white !px-4 md:!px-8 !w-[10rem] !py-2 !rounded-md !font-normal !text-lg !duration-200 !transition-all !shadow-xl hover:shadow-2xl ${disabled ? 'cursor-not-allowed' : ''}`}
          transaction={async () => {
            try {
              const transaction = await handleClaim();
              // TransactionButton will handle the execution and waiting
              // We'll show the success message after the transaction is processed
              const result = await transaction;
              console.log('Transaction completed:', result);
              alert("NFT minted successfully!");
              onSuccess?.();
              return transaction;
            } catch (error) {
              alert(`Error: ${(error as Error).message}`);
              throw error;
            }
          }}
          disabled={disabled}
        >
          MINT
        </TransactionButton>
      </div>
    </div>
  );
};

export default MintButton;