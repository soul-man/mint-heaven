import React from 'react';

import Accordion from '@/components/_sections/FaqSection/Accordion';

const FaqSection = () => {

  return (
    <>
    <div className="App p-10">
      <h1 className="text-xl text-blue-700 mb-4">Accordion test</h1>

      <div>
        <Accordion index="1"> Test </Accordion>
        <Accordion index="2" />
      </div>
    </div>
    </>
  );
};

export default FaqSection;
