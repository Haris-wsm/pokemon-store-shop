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
  // Forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerForm) });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      address: "",
      city: "",
      zip: "",
      province: "",
      amphoe: "",
      district: "",
    };
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
