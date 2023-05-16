import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const FormEmail = ({ register, errors }) => {
  return (
    <Box className="pb-5">
      <Typography className="text-lg font-semibold mt-5 mb-2 text-gray-700">
        อิเมลรับสินค้า
      </Typography>
      <Box className="mb-7">
        <Divider className="relative" />
        <Divider className="absolute bg-black w-[5%]" />
      </Box>
      <Box className="flex flex-col gap-5">
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
        <TextField
          fullWidth
          {...register("confirmEmail")}
          name="confirmEmail"
          placeholder="ยืนยันอีเมล"
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
          error={errors.confirmEmail}
          helperText={errors.confirmEmail?.message}
        />
      </Box>
    </Box>
  );
};

export default FormEmail;
