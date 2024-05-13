import MintAreaComingSoon from "@/components/_sections/CreateNft/MintAreaComingSoon";

const CreateNft = () => {

  return (
    <div className="flex items-center justify-center min-h-[92vh] relative z-1 pb-44">
      <div className='flex flex-col items-center justify-center z-1'>
        <h1 className="mb-10 text-4xl md:text-6xl font-light lg:text-7xl xl:text-8xl">
          Mint your <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">own</span> NFTs
        </h1>
        <MintAreaComingSoon/>
      </div>
    </div>
  );
};

export default CreateNft;
