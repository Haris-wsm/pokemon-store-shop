import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import ApiReq from "@/utils/axios";

const BlogBanner = () => {
  const [newBlogList, setNewBlogList] = useState([]);
  useEffect(() => {
    getNewestBlog();
  }, []);

  const getNewestBlog = async () => {
    try {
      const resposne = await ApiReq.get("/api/blog/pin-page");

      setNewBlogList(resposne.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box className="bg-background-dark py-3 mt-10 h-[86px] flex justify-center items-center">
        <Typography
          variant="h5"
          className="text-white font-semibold text-center"
        >
          ข้อมูลข่าวสาร
        </Typography>
      </Box>
      <Box className="xs:w-[100%] md:w-4/5 mx-auto">
        <BlogList newBlog={newBlogList} />
      </Box>
    </>
  );
};

export default BlogBanner;
