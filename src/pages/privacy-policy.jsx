import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-4/5 lg:w-4/5 mx-auto">
        <NavbarBreadcrumb />
        <Typography className="text-3xl font-semibold mt-5 mb-2">
          PRIVACY POLICY
        </Typography>
        <Box className="mb-7">
          <Divider className="relative" />
          <Divider className="absolute bg-black w-[5%]" />
        </Box>

        {/* Mocking Text */}

        <Typography variant="body1" className="text-sm text-gray-700">
          Privacy Policy describes how we handle personal information collected,
          used, and shared when a visitor or customer accesses PoTown Store. The
          data controller of your personal data is Shift4Shop, LLC and doing
          business as "Shift4Shop". Shift4Shop, LLC is registered at 6691 Nob
          Hill Road, Tamarac, FL 33321, United States of America (USA).
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
