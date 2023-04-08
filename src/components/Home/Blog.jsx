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
import Image from "next/image";
import React from "react";

const Blog = (props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const getPostAtMessage = (time) => `Posted At: ${time}`;
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
        {getPostAtMessage(props.timestamps)}
      </Typography>
      <CardContent className="flex justify-center cursor-pointer">
        <Image
          width={mobile ? 220 : 370}
          height={mobile ? 77 : 129}
          src={props.img}
          alt="blog image"
        />
      </CardContent>
      <CardActions className="w-full flex justify-center">
        <Button className="bg-gray-500 text-white hover:underline hover:bg-gray-700">
          read blog
        </Button>
      </CardActions>
    </Card>
  );
};

export default Blog;
