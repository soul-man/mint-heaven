import type { IPFSHTTPClient } from 'ipfs-http-client';

let ipfs: IPFSHTTPClient | null = null;
let ipfsClient: typeof import('ipfs-http-client') | null = null;

async function getIpfsClient() {
  if (!ipfs) {
    // Dynamically import ipfs-http-client only on client side
    ipfsClient = await import('ipfs-http-client');

    const projectId = '418d094bb9eb4008a81446e36a1e8b54';
    const projectSecret = '20961e217911454db99cbd8a6ead397d';
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

    ipfs = ipfsClient.create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });
  }
  return ipfs;
}

export const uploadFileToIPFS = async (file: string) => {
  if (typeof window === 'undefined') {
    throw new Error('This function can only be called on the client side');
  }

  if (!file) {
    throw new Error('No file provided for upload');
  }

  try {
    const ipfs = await getIpfsClient();
    const response = await fetch(file);
    const buffer = await response.arrayBuffer();
    const added = await ipfs.add(Buffer.from(buffer));
    return `ipfs://${added.path}`;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
};