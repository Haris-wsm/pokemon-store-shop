import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const TopSellProduct = (props) => {
  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const router = useRouter();
  const redirectTo = (url) => router.push(url);
  return (
    <Box
      className={clsx({
        ["flex gap-3 mb-5 justify-center cursor-pointer overflow-hidden"]: true,
        ["flex-col items-center"]: props.bestsell,
      })}
      onClick={() => redirectTo(`/product/${props._id}`)}
    >
      <Image
        src={getStaticURL(props.image)}
        width={props.bestsell ? 200 : 70}
        height={props.bestsell ? 200 : 70}
        alt="tip-sell"
        className="hover:opacity-75 hover:drop-shadow-2xl"
      />
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

export default TopSellProduct;
