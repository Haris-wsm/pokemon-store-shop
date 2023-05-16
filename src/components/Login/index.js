import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import LockResetIcon from "@mui/icons-material/LockReset";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);

      const status = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: "/",
      });

      if (status.error) {
        reset();
        toast.error("เข้าสู่ระบบล้มเหลว");
        setLoading(false);
        return;
      } else {
        router.replace("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error("เข้าสู่ระบบล้มเหลว");
      reset();
    }
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const redirectTo = (url) => {
    router.push(url);
  };
  return (
    <Grid container className="mb-5">
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        className="border-r-0 md:border-r  border-gray-300"
      >
        <Box className="flex justify-end flex-col items-center md:items-end  px-10">
          <Typography className="font-semibold">NEW CUSTOMERS</Typography>
          <Typography className="my-2 w-[300px] text-left md:text-right font-thin text-sm text-gray-500">
            หากคุณไม่มีบัญชี
            โปรดดำเนินการต่อโดยคลิกปุ่มต่อไปนี้เพื่อดำเนินการลงทะเบียนครั้งแรกต่อไป
          </Typography>
          <Button
            onClick={() => redirectTo(`/create-an-account`)}
            startIcon={<CreateIcon />}
            className="bg-gray-600 text-white hover:bg-gray-700 w-[100%] sm:w-[50%] md:w-[60%] my-10"
          >
            สร้างบัญชี
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Box className="flex justify-start flex-col items-center md:items-start  px-10">
          <Typography className="font-semibold">RETURNING CUSTOMERS</Typography>
          <Typography className="my-2 w-[300px] text-center md:text-left font-thin text-sm text-gray-500">
            เข้าสู่ระบบ
          </Typography>

          <Grid container className="my-3">
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                className="mb-5 md:max-w-[300px] w-[100%]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                type="email"
                name="email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="h5" className="text-red-500">
                        *
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                placeholder="Password"
                size="small"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="md:max-w-[300px] w-[100%]"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="h5" className="text-red-500">
                        *
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Butons */}
          <Box className="w-[100%] md:w-[300px] flex flex-col items-center md:items-start justify-center">
            <Button
              disabled={loading ? true : false}
              onClick={handleLogin}
              startIcon={<LoginIcon />}
              className="bg-red-600 hover:bg-red-700 md:max-w-[300px] disabled:bg-gray-400 text-white w-[100%]  my-5"
            >
              เข้าสู่ระบบ
            </Button>

            {/* <Box className="w-[100%]">
              <Typography className="text-center font-thin text-gray-500">
                or
              </Typography>
            </Box> */}
            {/* <Button
              startIcon={<LockResetIcon />}
              className=" bg-red-600 hover:bg-red-700  hover:outline md:max-w-[300px] text-white  w-[100%] my-5"
            >
              RESET รหัสผ่าน
            </Button> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
