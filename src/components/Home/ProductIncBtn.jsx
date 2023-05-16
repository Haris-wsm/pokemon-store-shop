import { Box } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductIncBtn = (props) => {
  const [total, setTotal] = useState(1);

  const stock = props.stock || props.unused;

  const handleChange = (e) => {
    const { value } = e.target;

    if (value < 1) {
      setTotal(1);
      props.handleAddQuntity(1);
      return;
    }

    if (Number(value) > Number(stock)) {
      setTotal(stock);
      props.handleAddQuntity(stock);
      return;
    }

    setTotal(value);
    props.handleAddQuntity(value);
  };

  const handleAdd = () => {
    if (total < stock) {
      setTotal(total + 1);
      props.handleAddQuntity(total + 1);
    }
  };

  const handleRemove = () => {
    if (total > 1) {
      setTotal(total - 1);
      props.handleAddQuntity(total - 1);
    }
  };

  const handleCompleteOut = () => {
    if (!total) {
      setTotal(1);
      props.handleAddQuntity(1);
    }
  };

  return (
    <Box className="flex justify-center items-center border border-gray-300 rounded-lg mr-1">
      <Box className="cursor-pointer p-px" onClick={handleAdd}>
        <AddIcon className="text-xs " />
      </Box>
      <Box className="font-sans">
        <input
          type="number"
          value={total}
          min={1}
          className="w-[35px] outline-none border-gray-300 border-l border-r text-center py-2 font-sans font-semibold text-sm"
          onChange={handleChange}
          onBlur={handleCompleteOut}
        />
      </Box>
      <Box className="cursor-pointer p-px" onClick={handleRemove}>
        <RemoveIcon className="text-xs cursor-pointer" />
      </Box>
    </Box>
  );
};

export default ProductIncBtn;
