import { notify } from '@/components/_sections/MintSection/Card';
import { useAddress } from '@thirdweb-dev/react';
import React, { useEffect, useState } from 'react';
import basic from 'src/contracts/build/basic.json';
import Web3, { ContractAbi } from 'web3';

const TokenDeployer = () => {
  const [web3Instance, setWeb3Instance] = useState<Web3>(null);
  const address = useAddress();


  


  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const instance = new Web3(window.ethereum);
      setWeb3Instance(instance);
    }
  }, []);

  const CONTRACT_ABI: ContractAbi = basic.abi;

  const deployToken = async () => {
    //working with Base, Manta and Scroll - worksaround for zkSync, compile it differently.
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

      await tokenContract
        .deploy(deployOptions)
        .send({
          from: address,
          gas: gasLimit.toString(),
          gasPrice: gasPrice.toString(),
        }).then(() => notify('Contract successfully deployed. Congrats!')).catch(() => notify('Oooops... Try again.'));
    } 
    catch (error) {
      //
    }
  };

  return (
    <div>
      <p className="mb-6 px-10 text-center text-lg font-normal tracking-wide text-white opacity-80 md:px-40 md:text-2xl"><span className="font-white-100 font-bold">Deploy</span> a basic smart contract with just one click!
      <button onClick={deployToken} className="ml-2 w-32 items-center rounded-md bg-blue-500 py-1 font-semibold text-gray-200 hover:bg-blue-500 hover:text-white lg:w-32 xl:w-28">Deploy!</button>
      </p>
    </div>
  );
};

export default TokenDeployer;

