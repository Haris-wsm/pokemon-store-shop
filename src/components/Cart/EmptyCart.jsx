import React from "react";
import ReportIcon from "@mui/icons-material/Report";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <Box className="mb-10 px-5">
      <ReportIcon fontSize="large" className="mr-3 text-gray-600" />
      <Typography className="inline-block text-gray-600">
        ยังไม่มีสินค้าในตะกร้า
      </Typography>
      <Link href="/">
        <Button className="block bg-gray-700 hover:bg-background-dark text-white my-5 w-[240px]">
          กลับสู่หน้าหลัก
        </Button>
      </Link>
    </Box>
  );
};

export default EmptyCart;
