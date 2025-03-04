import { NextApiRequest, NextApiResponse } from 'next';
import { privateKeyToAccount } from "thirdweb/wallets";
import { generateMintSignature } from "thirdweb/extensions/erc721";
import { mintHeavenContract, client } from "../../src/constant/constants";

// Helper function to serialize BigInt
function serializeBigInt(key: string, value: any) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { address, imgSrc, name, prompt } = req.body;

    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    if (!imgSrc) {
      return res.status(400).json({ message: 'Image source is required' });
    }

    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      console.error('Missing PRIVATE_KEY environment variable');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const account = privateKeyToAccount({
      client,
      privateKey: privateKey,
    });

    const { payload, signature } = await generateMintSignature({
      account,
      contract: mintHeavenContract,
      mintRequest: {
        to: address,
        metadata: {
          name: name,
          description: "Mint Heaven - AI Generated NFTs Collection",
          image: imgSrc,
          attributes: [
            {
              trait_type: "Prompt",
              value: prompt
            }
          ]
        },
        price: "0.0001",
        royaltyRecipient: address,
        royaltyBps: 250,
        primarySaleRecipient: address,
      },
    });

    // Serialize the response, handling BigInt values
    const serializedResponse = JSON.parse(JSON.stringify({ payload, signature }, serializeBigInt));
    return res.status(200).json(serializedResponse);
  } catch (error) {
    console.error('Error generating mint signature:', error);
    return res.status(500).json({
      message: 'Error generating mint signature',
      error: (error as Error).message
    });
  }
}