import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import Login from "@/components/Login";

const MyAccount = () => {
  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-4/5 lg:w-4/5 mx-auto px-5 md:px-0">
        <NavbarBreadcrumb />
        <Typography className="text-3xl font-semibold mt-5 mb-2">
          MY ACCOUNT
        </Typography>
        <Box className="mb-7">
          <Divider className="relative" />
          <Divider className="absolute bg-black w-[5%]" />
        </Box>
        <Login />
      </Box>
    </Box>
  );
};

export default MyAccount;
