import React from "react";
import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";

const NewReleaseProduct = (props) => {
  return (
    <Box
      className={clsx({
        ["flex  gap-3 mb-5 cursor-pointer"]: true,
        [" items-center"]: true,
      })}
    >
      <Image
        src={props.image}
        width={70}
        height={70}
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
