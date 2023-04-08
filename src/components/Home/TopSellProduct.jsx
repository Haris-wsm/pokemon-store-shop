import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const TopSellProduct = (props) => {
  return (
    <Box
      className={clsx({
        ["flex gap-3 mb-5 justify-center cursor-pointer overflow-hidden"]: true,
        ["flex-col items-center"]: props.bestsell,
      })}
    >
      <Image
        src={props.image}
        width={props.bestsell ? 200 : 70}
        height={props.bestsell ? 200 : 70}
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

export default TopSellProduct;
