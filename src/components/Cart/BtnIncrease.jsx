import { Box } from "@mui/material";
import React, { useState } from "react";

const BtnIncrease = (props) => {
  const [qty, setQty] = useState(props.qty);
  const handleCahnge = (e) => {
    const { value } = e.target;

    if (value <= props.max) {
      setQty(value);
      props.handleUpdateQty(value);
    } else {
      setQty(props.max);
      props.handleUpdateQty(props.max);
    }
  };

  const handleInc = (e) => {
    if (qty + 1 <= props.max) {
      setQty(qty + 1);
      props.handleUpdateQty(qty + 1);
    } else {
      setQty(props.max);
      props.handleUpdateQty(props.max);
    }
  };
  const handleDesc = (e) => {
    if (qty - 1 > 0) {
      setQty(qty - 1);
      props.handleUpdateQty(qty - 1);
    } else {
      setQty(1);
      props.handleUpdateQty(1);
    }
  };

  return (
    <>
      <Box>
        <input
          type="number"
          className="font-sans border-y border-l border-gray-300 rounded-l-md px-2 py-2 w-[50px] h-[43px] outline-none"
          onChange={handleCahnge}
          value={qty}
        ></input>
      </Box>

      <Box className="flex flex-col ">
        <Box
          className="rounded-tr-md border-gray-300 border-t border-x px-2 cursor-pointer text-sm font-semibold hover:bg-gray-200"
          onClick={handleInc}
        >
          +
        </Box>
        <Box
          className="rounded-br-md border-gray-300 border-y border-x px-2 cursor-pointer text-sm font-semibold hover:bg-gray-200"
          onClick={handleDesc}
        >
          -
        </Box>
      </Box>
    </>
  );
};

export default BtnIncrease;
