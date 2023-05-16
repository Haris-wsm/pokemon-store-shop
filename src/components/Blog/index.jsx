import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Blog = (props) => {
  const router = useRouter();
  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const redirectTo = (url) => router.push(url);

  return (
    <Box className="mb-5">
      <Image
        src={getStaticURL(props.image)}
        width={870}
        height={330}
        className="w-full md:w-[870] h-auto max-h-[220px] object-cover"
        alt="Blog image"
      />
      <Typography className="text-xl font-semibold">{props.title}</Typography>
      <Typography className="text-xs text-gray-500 my-2">
        Posted on {dayjs(props.createdAt).format("YYYY-MM-DD HH:mm")}
      </Typography>
      <Button
        className="bg-background-dark hover:bg-background-dark text-white px-5 my-5"
        onClick={() => redirectTo(`/blog-home/${props.slug}`)}
      >
        อ่านต่อ
      </Button>
    </Box>
  );
};

export default Blog;
