import { Box, Grid } from "@mui/material";
import React from "react";
import Blog from "./Blog";
import { blogs } from "@/data/blog";

const BlogList = () => {
  return (
    <Grid container className="mt-10 mb-20">
      {blogs.map((blog, i) => (
        <Grid item xs={12} sm={6} md={6} lg={4} key={i} className="mb-5">
          <Blog {...blog} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogList;
