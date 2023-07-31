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
import { useRouter } from "next/router";
import React, { useState } from "react";

const options = [
  { label: "ค่าเริ่มต้น", value: "" },
  { label: "ราคา: น้อย -> มาก", value: "minprice" },
  { label: "ราคา: มาก -> น้อย", value: "maxprice" },
  { label: "ชื่อสินค้า", value: "name" },
  { label: "สินค้าล่าสุด", value: "newest" },
  { label: "สินค้าลดราคา", value: "onsale" },
];

const ProductByCategory = (props) => {
  const [sortedOption, setSortedOption] = useState(options[0].value);

  const handleChangeSortedOption = (e) => {
    const { value } = e.target;
    setTimeout(() => {
      setSortedOption(value);

      // const URL = correctURL(value);
      router.push({
        query: { ...router.query, sort: value, page: 1 },
      });
    }, 1000);
  };

  const router = useRouter();

  return (
    <Grid container spacing={3}>
      <Grid item md={6}>
        <Typography className="text-xs text-slate-600">
          ผลลัพธ์ทั้งหมด [{props.total}]
        </Typography>
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
