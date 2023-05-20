import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

import { ProvinceJson } from "@/data/json/province";
import { ThaiAll } from "@/data/json/thailand";

const FormAddress = (props) => {
  const { register, errors, setValue, setPolicy, policy, accept, setAccept } =
    props;

  const [province, setProvince] = useState("");
  const [amphoe, setAmphoe] = useState("");
  const [district, setDistrict] = useState("");
  const [zip, setZip] = useState("");

  const handleSelectProvince = (e) => {
    const { value } = e.target;
    setProvince(value);
    setAmphoe("");
  };

  const handleSelectAmphoe = (e) => {
    const { value } = e.target;
    setAmphoe(value);
    setDistrict("");
  };

  const handleSelectDistrict = (e) => {
    const { value } = e.target;
    setDistrict(value);
    setValue("zip", `${getZipCode(value)}`);
  };

  const getDistrict = () => {
    return ThaiAll.filter((state) => state.amphoe === amphoe).map(
      (state) => state.district
    );
  };

  const getAmphoe = () => {
    return [
      ...new Set(
        ThaiAll?.filter((state) => state.province === province).map(
          (state) => state.amphoe
        )
      ),
    ];
  };

  const getZipCode = (district) => {
    return ThaiAll.find(
      (state) => state.district === district && state.amphoe === amphoe
    )?.zipcode;
  };

  return (
    <Box className="pb-10">
      <Typography className="text-lg font-semibold mt-5 mb-2 text-gray-700">
        ที่อยู่ของฉัน
      </Typography>
      <Box className="mb-7">
        <Divider className="relative" />
        <Divider className="absolute bg-black w-[5%]" />
      </Box>
      <Grid container spacing={3} className="mb-5">
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            name="name"
            {...register("name")}
            fullWidth
            placeholder="ชื่อ"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="h5" className="text-red-500">
                    *
                  </Typography>
                </InputAdornment>
              ),
            }}
            error={errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            name="lastname"
            {...register("lastname")}
            fullWidth
            placeholder="นามสกุล"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="h5" className="text-red-500">
                    *
                  </Typography>
                </InputAdornment>
              ),
            }}
            error={errors.lastname}
            helperText={errors.lastname?.message}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl>
            <FormControlLabel
              control={<Checkbox />}
              value={policy}
              onChange={(e) => setPolicy(e.target.checked)}
              label={
                <Box className="flex gap-2 flex-wrap">
                  <Typography className="text-sm">I agree with the</Typography>
                  <Link
                    href="/privacy-policy"
                    className="underline text-sm text-blue-700 hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                  <Typography className="text-sm">and</Typography>
                  <Link
                    href="/terms-of-service"
                    className="underline text-sm text-blue-700 hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms Of Service
                  </Link>
                  <Typography className="text-sm text-red-500">*</Typography>
                </Box>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl>
            <FormControlLabel
              control={<Checkbox />}
              value={accept}
              onChange={(e) => setAccept(e.target.checked)}
              label={
                <Box className="flex gap-3 my-2">
                  <Typography className="text-slate-700 text-sm underline">
                    ยอมรับข้อเงื่อนไข:
                  </Typography>
                  <Typography className="text-slate-700 text-sm">
                    สินค้าเป็นโค้ดสำหรับเติมในเกม pokemon tcg live เท่านั้น
                    ไม่ใช่การ์ดจริง
                  </Typography>
                </Box>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormAddress;
