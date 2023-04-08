import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const TermsOfService = () => {
  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-4/5 lg:w-4/5 mx-auto">
        <NavbarBreadcrumb />
        <Typography className="text-3xl font-semibold mt-5 mb-2">
          TERMS OF SERVICE
        </Typography>
        <Box className="mb-7">
          <Divider className="relative" />
          <Divider className="absolute bg-black w-[5%]" />
        </Box>

        {/* Mocking Text */}

        <Typography variant="body1" className="text-sm text-gray-700">
          This website is operated by CCGCastle, LLC. CCGCastle, LLC is
          registered at 2 Craftsman Road, East Windsor, CT 06088, United States.
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsOfService;
