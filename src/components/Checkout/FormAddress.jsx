import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

import { ProvinceJson } from "@/data/json/province";
import { ThaiAll } from "@/data/json/thailand";

const FormAddress = ({ register, errors, setValue }) => {
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
          <TextField
            name="address"
            {...register("address")}
            fullWidth
            placeholder="ที่อยู่"
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
            error={errors.address}
            helperText={errors.address?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            name="city"
            {...register("city")}
            fullWidth
            placeholder="เมื่อง"
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
            error={errors.city}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth error={errors.province}>
            <InputLabel
              variant="standard"
              htmlFor="uncontrolled-native-province"
            >
              จังหวัด
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "province",
                id: "uncontrolled-native-province",
              }}
              {...register("province")}
              value={province}
              onChange={handleSelectProvince}
              className="min-w-[220px]"
              name="province"
            >
              <option value="" disabled></option>
              {ProvinceJson?.map((province) => (
                <option value={province.name_th}>{province.name_th}</option>
              ))}
            </NativeSelect>
            <FormHelperText> {errors?.province?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth error={errors.amphoe}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native-amphoe">
              อำเภอ
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "amphoe",
                id: "uncontrolled-native-amphoe",
              }}
              disabled={province === "" ? true : false}
              defaultValue=""
              className="min-w-[220px]"
              {...register("amphoe")}
              value={amphoe}
              onChange={handleSelectAmphoe}
              name="amphoe"
            >
              <option value="" disabled></option>
              {getAmphoe().map((amphoe) => (
                <option value={amphoe}>{amphoe}</option>
              ))}
            </NativeSelect>
            <FormHelperText> {errors?.amphoe?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth error={errors.district}>
            <InputLabel
              variant="standard"
              htmlFor="uncontrolled-native-district"
            >
              ตำบล
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "district",
                id: "uncontrolled-native-district",
              }}
              disabled={amphoe === "" ? true : false}
              defaultValue=""
              className="min-w-[220px]"
              {...register("district")}
              value={district}
              onChange={handleSelectDistrict}
            >
              <option value="" disabled></option>
              {getDistrict().map((district) => (
                <option value={district}>{district}</option>
              ))}
            </NativeSelect>
            <FormHelperText> {errors?.district?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <TextField
              name="zip"
              variant="standard"
              label="รหัสไปรษณีย์"
              {...register("zip", { defaultValue: getZipCode() ?? "" })}
              // {...register("zip")}
              value={getZipCode(district) ?? ""}
              error={errors.zip}
              helperText={errors.zip?.message}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormAddress;
