import axios from 'axios';

import { endpoints } from '@/constant/config';

export const ethMarketPriceTest = async () => {
  try {
    const urlEthMarketPrice = endpoints.price_eth;      
    const response = await axios.get(urlEthMarketPrice);
    const data = response.data.USD.toFixed(2);
    return data;
  } catch (error) {
    console.log('Error:' + error);
  }
};
