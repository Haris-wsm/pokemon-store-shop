import { Box, Typography } from "@mui/material";
import React from "react";

const ErrorPage = () => {
  return (
    <Box>
      <Box className="py-10">
        <Typography className="text-3xl text-slate-700">
          เกิดข้อผิดพลาด
        </Typography>
        <Typography className="text-sm text-slate-500">
          โปรดลองอีกครั้งในภายหลัง
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorPage;
