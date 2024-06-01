import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FaqSection = () => {

  const Question = (props: any) => {
    const [isActive, setActive] = React.useState(false);
    const handleClick = () => {
      setActive(!isActive);
    };
    return (
      <div className="w-11/12 md:w-9/12 lg:w-8/12 question-wrapper">
        <div className="question" id={props.id} onClick={() => handleClick()}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{props.question}</h3>
          <button>
            {isActive ? <IoIosArrowUp className="text-2xl" /> : <IoIosArrowDown className="text-2xl" />}
          </button>
        </div>
        <div className={(isActive ? "answer active" : "answer") + ' text-md text-gray-200/90 pr-10'}>
          {props.answer}
        </div>
      </div>
    );
  };  

  const Q1 = () => {
    return (
      <>
        <p className="mb-3">
          Mint Heaven is a creative hub where airdrop farmers can mint unique digital assets to enhance their smart contract interactions (e.g. mint nfts onchain).
        </p>
        <p className="mb-3">
          By participating in this innovative space, users can unlock eligibilities for future cryptocurrency airdrops. 
        </p>
        <p>
          We've streamlined our interface to give farmers the easiest and fastest ways to expand their interactions across multiple blockchains with airdrop potential.
        </p>
      </>
    );
  }; 
  
  const Q2 = () => {
    return (
      <>
        <p className="mb-3">
          ...because it's literally free money! All you have to do is invest some time.
        </p>
        <p className="mb-3">
          People engage in farming airdrops to receive free tokens distributed by blockchain projects. 
          These free tokens can be sold on cryptocurrency exchanges for a profit!
        </p>
        <p className="mb-3">
          Airdrops are a marketing strategy wherein projects give free tokens to users who meet specific criteria.
          Airdrop farmers actively participating in the project's ecosystem, such as minting NFTs, staking or providing liquidity, 
          to increase their chances of being eligible to receive an airdrop. 
        </p>
      </>
    );
  };

  const Q3 = () => {
    return (
      <>
        <p className="mb-3">
          This practice is adopted to ensure compliance with regulatory standards, particularly to avoid any potential issues with 
          the Securities and Exchange Commission (e.q. SEC).
        </p>
        <p className="mb-3">
          According to guidelines, tokens should have investors who willingly 
          invest (spending money) in them with the intention of making a profit. However, the distribution of tokens through airdrops, 
          where they are provided free of charge, falls outside the scope of this requirement. 
          This saves the projects a lot of regulatory hurdles and a lot of money.
        </p>
        <p>
          Projects also leverage a valuable opportunity to test and explore the functionality of the blockchain through the engagement of airdrop farmers. 
          This engagement often leads to the identification of potential errors or inefficiencies, contributing to the overall improvement and robustness of the project. 
        </p>
      </>
    );
  };

  const Q4 = () => {
    return (
      <>
        <p className="mb-3">
          Yes when you look at Airdrops like from Arbitrum, they gave early adopters tokens worth thousands of dollars. 
          Arbitrum dropped every eligible user at least 1,600 ARB tokens, worth when they were dropped $2,400. 
          It is hard to decide which airdrops to farm, because 2024 is the Airdrop Year and you can farm a lot.
        </p>
        <p className="mb-3">
          But rember, airdrop farming involves many blockchain interactions. You will need a bit seat flesh to build a footprint! ;)
        </p>
      </>
    );
  };

  const Q5 = () => {
    return (
      <>
        <p className="mb-3">
        Becoming an airdrop farmer involves engaging with cryptocurrency projects that might distribute 
        tokens through airdrops.
        </p>
        <p className="mb-3">
        First of all you need to go through an onboarding process to connect your web browser to a blockchain. 
        Here's a general guide on how to get started and start your onchain journey.
        </p>
        <ul>
          <li>
            <p><b>1. Install browser extension</b></p>
            <p className="mb-2">Install an Ethereum compatible browser extension 
              like <a href="https://rabby.io/" target="_blank" className="underline"> Rabby Wallet </a> 
              or <a href="https://metamask.io/" target="_blank" className="underline">Metamask </a>. 
              You can add it to your browser (available for Chrome, Firefox, Brave...). Visit 
              the Rabby Wallet website to install it.
            </p>
          </li>
          <li>
            <p><b>2. Create a Wallet</b></p>
            <p className="mb-2">
              Open your browser extension and follow the on-screen instructions to set up your wallet by creating a password and saving the 
              recovery phrase securely. Once your wallet is set up, you'll be able to see your Ethereum wallet address within the browser extension. 
              It starts with "0x".
            </p>
          </li>
          <li>
            <p><b>3. Buy Ethereum</b></p>
            <p className="mb-1">
              You need to obtain Ethereum (ETH) to fund your wallet and to cover the transactions fees. You can do this through cryptocurrency exchanges 
              like Coinbase, Binance, or others. Create an account on a suitable exchange, complete the necessary verification processes and purchase Ethereum.
            </p>
          </li>
          <li>
            <p><b>4. Fund your Wallet</b></p>
            <p className="mb-2">
              After purchasing Ethereum, withdraw it to your wallet. To do this, find the "Withdraw" or "Send" option on the exchange 
              platform and enter your wallet address (it starts with "0x") as the destination.
            </p>
          </li>
          <li>
            <p><b>4. Use a Bridge</b></p>
            <p className="mb-2">
              To transfer funds from blockchain to blockchain airdrop farmers use bridges. Mostly every project got a native bridge. We recomment to use the native bridge 
              but you can also use a provider like orbiter finance to send ETH from Ethereum to your desired blockchain. After briging your are set to start 
              your airdrop farming carrer.
            </p>
          </li>
          <li>
            <p><b>5. Start airdrop farming!</b></p>
            <p className="mb-2">
              Go to <a href='./mint-nfts' target="_self" className="underline">Mint section</a>, select your Chain/Project and mint your first NFT. When you starting out try to have a daily transaction (mint, deployment), 
              later you can switch to 1 transaction/week. Grow your footprint for a higher Airdrop chance.
            </p>
          </li>
        </ul>
        
      </>
    );
  };

  const questions = [
    {
      id: 0,
      question: "What is Mint Heaven?",
      answer: <Q1 />
    },
    {
      id: 1,
      question: "Why do people farm airdrops?",
      answer: <Q2/>
    },
    {
      id: 2,
      question: "Why would a project give tokens for free?",
      answer: <Q3/>
    },
    {
      id: 3,
      question: "Can you really make money with it?",
      answer: <Q4/>
    },
    {
      id: 4,
      question: "How to become an airdrop farmer?",
      answer: <Q5/>
    }
  ];
  


  return (
    <div className="flex flex-col mb-44">
      <h2 className="text-center font-thin text-4xl md:text-7xl mb-3">FAQ</h2>
      <p className="text-center font-thin text-xl lg:text-3xl text-blue-400 mb-12">Frequently Asked Questions</p>
      {/* <Searchbar onSearchChange={handleSearchChange} /> */}
      <section className="faq">
        {questions.map((item: any, index: number) => (
          <Question key={index} question={item.question} answer={item.answer} />
        ))}
      </section>
    </div>
  );
};

export default FaqSection;
