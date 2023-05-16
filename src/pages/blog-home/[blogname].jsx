import BlogPostLayout from "@/components/Layouts/BlogPostLayout";
import PageLayout from "@/components/Layouts/PageLayout";
import ApiReq from "@/utils/axios";
import { Box, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ViewBlog = () => {
  const { query } = useRouter();

  const [blog, setBlog] = useState({});

  useEffect(() => {
    getBlogBySlug();
  }, [query.blogname]);

  const getBlogBySlug = async () => {
    try {
      const resposne = await ApiReq.get(`/api/blog/${query.blogname}`);

      setBlog(resposne.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  return (
    <PageLayout title={query.blogname}>
      <BlogPostLayout>
        <Box className="my-2 px-2 ">
          {blog?.image && (
            <Image
              src={getStaticURL(blog.image)}
              width={450}
              height={170}
              alt="blog-image"
              className="h-auto w-full md:w-[450px]"
            />
          )}
          <Typography className="text-xs my-2 mb-5 text-slate-700">
            Posted at {dayjs(blog?.createdAt).format("YYYY-MM-DD HH:MM")}
          </Typography>
        </Box>
        <Divider className="my-3 w-3/5" />
        <Box className="font-[Prompt] space-y-3 text-slate-700 px-3 py-5">
          <div dangerouslySetInnerHTML={{ __html: blog?.raw_html }} />
        </Box>
      </BlogPostLayout>
    </PageLayout>
  );
};

export default ViewBlog;
