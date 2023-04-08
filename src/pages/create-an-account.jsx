import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import RegisterForm from "@/components/RegisterForm";

const RegisterAccount = () => {
  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-4/5 lg:w-4/5 mx-auto px-5 md:px-0">
        <NavbarBreadcrumb />
        <Typography className="text-3xl font-semibold mt-5 mb-2">
          CREATE AN ACCOUNT
        </Typography>
        <Box className="mb-7">
          <Divider className="relative" />
          <Divider className="absolute bg-black w-[5%]" />
        </Box>
        <Typography variant="body1" className="font-semibold inline-block">
          Note:
        </Typography>
        &nbsp;
        <Typography
          variant="body1"
          className="text-sm text-gray-700 inline-block"
        >
          ขั้นตอนการสั่งซื้อไม่จำเป็นต้องทำการลงทะเบียน เพียงแค่เลือกผลิตภัณฑ์
          หยิบใส่ตะกร้า และดำเนินการต่อไปยังขั้นตอนการชำระเงิน
        </Typography>
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default RegisterAccount;
