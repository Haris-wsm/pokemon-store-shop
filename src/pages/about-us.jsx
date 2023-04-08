import React from "react";
import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import { Box, Divider, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-4/5 lg:w-4/5 mx-auto">
        <NavbarBreadcrumb />
        <Typography className="text-3xl font-semibold mt-5 mb-2">
          ABOUT US
        </Typography>
        <Box className="mb-7">
          <Divider className="relative" />
          <Divider className="absolute bg-black w-[5%]" />
        </Box>

        {/* Mocking Text */}

        <Typography variant="body1" className="text-sm text-gray-700">
          Hello! Welcome all to the PoTown Store! What we are is an online
          company that sells Pokemon TCG Online products at a fair and
          reasonable price. We strive to distribute exactly what you need for
          the popular online game as fast and efficient as possible anytime,
          anywhere during the day. We have all the Pokemon TCG online products
          all here in one website so you can spend less time searching for what
          you need. We offer not only amazing Pokemon TCG online products, but
          as well as an established blog page that is free to access. The blog
          page is there to keep all Pokemon TCG fans updated with recent
          tournament successes, Pokemon TCG news, and well written articles.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
