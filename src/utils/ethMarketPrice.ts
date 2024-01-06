import axios from 'axios';
import cache from 'memory-cache';

export const ethMarketPrice = async () => {
  try {
    const urlEthMarketPrice =
      'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';
    const value = cache.get(urlEthMarketPrice);

    if (value) {
      return value;
    } else {
      const response = await axios.get(urlEthMarketPrice);
      const data = response.data.USD;
      cache.put(urlEthMarketPrice, data, 1000);
      return ethMarketPrice;
    }
  } catch (error) {
    console.log('Error:' + error);
  }
};
