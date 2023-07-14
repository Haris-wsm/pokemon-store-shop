import ApiReq from "@/utils/axios";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BlogPostLayout = (props) => {
  const router = useRouter();

  const redirectTo = (query) => {
    router.push(`/blog-home/${query}`);
  };

  // Blogs
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getRecentBlog();
  }, []);

  const getRecentBlog = async () => {
    try {
      const resposne = await ApiReq.get(`/api/blog/newest?limit=5`);
      setBlogs(resposne.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={3} className="pb-5">
      <Grid item xs={12} sm={12} md={8}>
        {props.children}
      </Grid>
      <Grid item xs={0} sm={0} md={4}>
        <Box className="hidden md:block">
          <Box>
            <Typography className="text-xl font-semibold mt-5 mb-2">
              ข่าวล่าสุด
            </Typography>
            <Box className="mb-7">
              <Divider className="relative" />
              <Divider className="absolute bg-black w-[5%]" />
            </Box>
          </Box>
          <Box>
            {blogs?.map((post, i) => (
              <Box
                className="my-5 text-gray-700 cursor-pointer hover:underline"
                key={i}
                onClick={() => redirectTo(post.slug)}
              >
                <Typography className="text-xs">{post.title}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BlogPostLayout;
