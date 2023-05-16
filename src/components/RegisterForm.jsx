import { ProvinceJson } from "@/data/json/province";
import { ThaiAll } from "@/data/json/thailand";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  NativeSelect,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { validationSchema as registerForm } from "@/utils/validation/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorOutlineSharp } from "@mui/icons-material";
import ApiReq from "@/utils/axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [province, setProvince] = useState("");
  const [amphoe, setAmphoe] = useState("");
  const [district, setDistrict] = useState("");
  const [zip, setZipCode] = useState("");

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

  const getZipCode = () => {
    const zipCode = ThaiAll.find(
      (state) => state.district === district && state.amphoe === amphoe
    )?.zipcode;

    return zipCode;
  };

  // Forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(registerForm) });

  const onSubmit = async (data) => {
    await handleRegister(data);
    await handleLogin(data);
  };

  const router = useRouter();

  const handleLogin = async (data) => {
    try {
      const status = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (status.error) {
        toast.error("เข้าสู่ระบบล้มเหลว");
        setLoading(false);
        return;
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (payload) => {
    try {
      await ApiReq.post("/api/auth/register/user", payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="max-w-[700px] pb-5" onSubmit={handleSubmit(onSubmit)}>
        <Box className="my-10">
          <Typography className="text-xl font-semibold mt-5 mb-2 text-gray-700">
            NEW CUSTOMERS
          </Typography>

          <Box className="mb-7">
            <Divider className="relative w-[70%]" />
            <Divider className="absolute bg-black w-[5%]" />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                {...register("name")}
                name="name"
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
                fullWidth
                {...register("lastname")}
                name="lastname"
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                fullWidth
                {...register("email")}
                name="email"
                placeholder="อีเมล"
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
                error={errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                {...register("password")}
                fullWidth
                placeholder="รหัสผ่าน"
                type="password"
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
                error={errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
        </Box>

        <Box className="my-10">
          <Typography className="text-xl font-semibold mt-5 mb-2 text-gray-700">
            CUSTOMER INFORMATION
          </Typography>

          <Box className="mb-7">
            <Divider className="relative w-[70%]" />
            <Divider className="absolute bg-black w-[5%]" />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
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
              <FormControl fullWidth>
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
                  value={province}
                  {...register("province")}
                  onChange={handleSelectProvince}
                  className="min-w-[220px]"
                >
                  <option value="" disabled></option>
                  {ProvinceJson?.map((province) => (
                    <option value={province.name_th}>{province.name_th}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
                <InputLabel
                  variant="standard"
                  htmlFor="uncontrolled-native-amphoe"
                >
                  อำเภอ
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "amphoe",
                    id: "uncontrolled-native-amphoe",
                  }}
                  disabled={province === "" ? true : false}
                  value={amphoe}
                  {...register("amphoe")}
                  className="min-w-[220px]"
                  onChange={handleSelectAmphoe}
                >
                  <option value="" disabled></option>
                  {getAmphoe().map((amphoe) => (
                    <option value={amphoe}>{amphoe}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  variant="standard"
                  label="รหัสไปรษณีย์"
                  disabled
                  // {...register("zip")}
                  value={getZipCode() ?? ""}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box className="flex gap-2 flex-wrap">
                      <Typography className="text-sm">
                        I agree with the
                      </Typography>
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
                      <Typography className="text-sm text-red-500">
                        *
                      </Typography>
                    </Box>
                  }
                />

                {/* <FormHelperText> {errors?.policy?.message}</FormHelperText> */}
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box className="flex justify-end mt-5 mb-[5em]">
          <Button
            variant="contained"
            className="bg-gray-600 text-white"
            type="submit"
          >
            REGISTER
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
