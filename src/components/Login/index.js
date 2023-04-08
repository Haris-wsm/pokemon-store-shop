import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import LockResetIcon from "@mui/icons-material/LockReset";

const Login = () => {
  return (
    <Grid container>
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
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                placeholder="Password"
                size="small"
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
              startIcon={<LoginIcon />}
              className="bg-gray-600 md:max-w-[300px] text-white hover:bg-gray-700 w-[100%]  my-5"
            >
              เข้าสู่ระบบ
            </Button>

            <Box className="w-[100%]">
              <Typography className="text-center font-thin text-gray-500">
                or
              </Typography>
            </Box>
            <Button
              startIcon={<LockResetIcon />}
              className=" bg-red-600 hover:bg-red-700  hover:outline md:max-w-[300px] text-white  w-[100%] my-5"
            >
              RESET รหัสผ่าน
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
