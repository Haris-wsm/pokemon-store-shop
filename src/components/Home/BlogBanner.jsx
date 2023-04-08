import { Box, Typography } from "@mui/material";
import React from "react";
import BlogList from "./BlogList";

const BlogBanner = () => {
  return (
    <>
      <Box className="bg-background-dark py-3 mt-10 h-[86px] flex justify-center items-center">
        <Typography
          variant="h5"
          className="text-white font-semibold text-center"
        >
          Blog
        </Typography>
      </Box>
      <Box className="xs:w-[100%] md:w-4/5 mx-auto">
        <BlogList />
      </Box>
    </>
  );
};

export default BlogBanner;
