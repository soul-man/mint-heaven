import { createContext } from "react";

interface chainContext {
  selectedChain: string;
  setSelectedChain: any;
}

const ChainContext = createContext<chainContext>({
  selectedChain: "goerli",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedChain: () => { },
});

export default ChainContext;