import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Blog = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const getPostAtMessage = (time) =>
    `Posted At: ${dayjs(time).format("YYYY-MM-DD HH:mm")}`;

  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const redirectTo = (url) => {
    router.push(`/blog-home/${url}`);
  };

  return (
    <Card className="px-2" elevation={0}>
      <Tooltip title={props.title}>
        <Typography
          noWrap
          className="text-xl text-blue-600 font-semibold cursor-pointer mb-2"
        >
          {props.title}
        </Typography>
      </Tooltip>
      <Typography className="text-sm font-thin text-gray-600">
        {getPostAtMessage(props.createdAt)}
      </Typography>
      <CardContent className="flex justify-center cursor-pointer">
        <Image
          width={mobile ? 220 : 370}
          height={mobile ? 77 : 129}
          className="w-full md-w-[220px] h-auto max-h-[129px] object-cover"
          src={getStaticURL(props.image)}
          alt="blog image"
        />
      </CardContent>
      <CardActions className="w-full flex justify-center">
        <Button
          className="bg-gray-500 text-white hover:underline hover:bg-gray-700"
          onClick={() => redirectTo(props.slug)}
        >
          read blog
        </Button>
      </CardActions>
    </Card>
  );
};

export default Blog;
