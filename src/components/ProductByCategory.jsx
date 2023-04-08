import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const options = [
  { label: "ค่าเริ่มต้น", value: "" },
  { label: "ราคา: น้อย -> มาก", value: "price=asc" },
  { label: "ราคา: มาก -> น้อย", value: "price=desc" },
  { label: "ชื่อสินค้า", value: "order=name" },
  { label: "สินค้าล่าสุด", value: "order=newest" },
  { label: "สินค้าลดราคา", value: "order=onsale" },
];

const ProductByCategory = (props) => {
  const [sortedOption, setSortedOption] = useState(options[0].value);
  const handleChangeSortedOption = (e) => setSortedOption(e.target.value);
  return (
    <Grid container spacing={3}>
      <Grid item md={6}>
        <Typography className=" text-sm">Products [{props.total}]</Typography>
      </Grid>
      <Grid item md={6}>
        <Box className="flex gap-3 items-center justify-end">
          <Typography className="text-gray-500 text-sm">เรียงตาม:</Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl className="text-sm">
              <NativeSelect
                value={sortedOption}
                inputProps={{
                  name: "sorted",
                  id: "uncontrolled-native",
                  className: "text-gray-500 text-sm",
                }}
                onChange={handleChangeSortedOption}
              >
                {options.map((option, i) => (
                  <option
                    key={i}
                    value={option.value}
                    className="text-gray-500 text-sm"
                  >
                    {option.label}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductByCategory;
