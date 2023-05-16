import React from "react";
import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";

const NewReleaseProduct = (props) => {
  const router = useRouter();
  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const redirectTo = (url) => {
    router.push(url);
  };
  return (
    <Box
      className={clsx({
        ["flex  gap-3 mb-5 cursor-pointer"]: true,
        [" items-center"]: true,
      })}
      onClick={() => redirectTo(`/product/${props._id}`)}
    >
      <Image
        src={getStaticURL(props.image)}
        width={70}
        height={70}
        alt="new-releases"
        className="hover:opacity-75 hover:drop-shadow-2xl"
      ></Image>
      <Box className="text-center">
        <Typography className="text-xs w-[180px] text-gray-500">
          {props.name}
        </Typography>
        <Typography className="text-md font-semibold text-gray-600">
          ฿{props.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewReleaseProduct;
