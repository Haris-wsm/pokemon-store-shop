import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const ProductSelect = (props) => {
  const [selected, setSelected] = useState(props.total || 50);

  const handleChange = (e) => {
    const { value } = e.target;
    setSelected(value);
  };
  return (
    <Box className="mr-1">
      <FormControl>
        <NativeSelect
          value={selected}
          inputProps={{
            name: "total",
            id: "uncontrolled-native",
          }}
          onChange={handleChange}
          className="w-[65px] text-sm"
        >
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={200}>200</option>
          <option value={250}>250</option>
          <option value={300}>300</option>
          <option value={350}>350</option>
          <option value={400}>400</option>
          <option value={450}>450</option>
          <option value={500}>500</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default ProductSelect;
