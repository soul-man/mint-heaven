import { minidenticon } from 'minidenticons'
import React from 'react';
import { useEffect, useState } from 'react';
const { useMemo } = React;

import { getXataClient } from '../../xata';
const xata = getXataClient();

const TopMinter = () => {

  const [topMinterList, setTopMinterList] = useState<any[]>([]);

  const MinidenticonImg = ({ username, saturation, ...props }: { username: string, saturation: string, [key: string]: any }) => {
    const svgURI = useMemo(
      () =>
        "data:image/svg+xml;utf8," +
        encodeURIComponent(minidenticon(username, saturation)),
      [username, saturation]
    );
    return <img src={svgURI} alt={username} {...props} />;
  };

  const fetchData = async () => {
    try {
      const topMinterList: { mintCount: number, address: string }[] = [];
      const mints = await xata.db.mints.getAll();
      
      const mintsGroupedbyAddress = mints.reduce(function(result, mint) {
        (result[mint.address] = result[mint.address] || []).push(mint);
        return result;
      }, {})

      Object.keys(mintsGroupedbyAddress).forEach(function (key: string) {
        const address = mintsGroupedbyAddress[key][0].address;
        const address_start = address.slice(0, 6)
        const address_end = address.slice(37, address.length)
        const new_address = address_start + "..." + address_end
        topMinterList.push({
          mintCount: mintsGroupedbyAddress[key].length,
          address: new_address,
        })
      });

      let collectionData_sorted = topMinterList.sort((a, b) => b.mintCount - a.mintCount);
      collectionData_sorted = collectionData_sorted.slice(0, 8);
      setTopMinterList(collectionData_sorted);

    } catch (error) {
      console.log('Error:' + error);
    }
  };

  useEffect(() => {
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <div className='w-full pb-44 xl:px-0'>

      <h2 className="mb-3 text-2xl font-light md:text-3xl">TOP MINTERS</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-5">
        {topMinterList.map((minter, index) => {
          return (
            <div 
              key={index} 
              className='flex flex-row items-center text-white gap-1 md:gap-3'
            >
              <div className='p-1 md:p-2 rounded-full bg-blue-600/10 border-1 border-blue-600/60'>
                  <MinidenticonImg
                    username={minter.address}
                    saturation="90"
                    width="40"
                    height="40"
                    className='w-8 h-8 md:w-10 md:h-10'
                  />
              </div>
              <div className='flex flex-col p-2'>
                <span className='font-light text-md sm:text-xl text-blue-400'>{minter.address}</span>
                <span className='font-bold text-lg md:text-2xl'>{minter.mintCount}
                  <span className='text-blue-800/50'> NFTs</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopMinter;
