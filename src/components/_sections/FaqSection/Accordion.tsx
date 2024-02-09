import { motion } from "framer-motion";
import React, { useState } from "react";

const Accordion = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(!open)}>
      <AccordionParent
        onClick={() => setOpen(!open)}
        text={`Parent ${props.index}`}
      />
      {open ? (
        <motion.ul
          className="pl-4 accordion-list"
          initial={{ height: 0 }}
          animate={{ height: "90px", overflowY: "scroll" }}
          exit={{ height: 0 }}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
              transition: { duration: 0.9, ease: [0.1, 0.2, 0.8, 0.9] }
            },
            collapsed: {
              opacity: 0,
              height: 0,
              transition: { duration: 0.9, ease: [0.1, 0.2, 0.8, 0.9] }
            },
          }}
        >
          <AccordionChild parentIndex={props.index} index="1" />
          <AccordionChild parentIndex={props.index} index="2" />
        </motion.ul>
      ) : null}
    </div>
  );
};

const AccordionParent = (props: any) => (
  <p className="mt-1 cursor-pointer bg-blue-200 p-4 rounded text-lg text-blue-600 font-bold">
    {props.text}
  </p>
);

const AccordionChild = (props: any) => {
  return (
    <li className="mt-1 bg-teal-200 p-4 rounded text-md text-teal-600 font-bold">
      Child {props.parentIndex}.{props.index}
    </li>
  );
};

export default Accordion;
