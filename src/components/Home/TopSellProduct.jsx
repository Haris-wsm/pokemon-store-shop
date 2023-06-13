import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const TopSellProduct = (props) => {
  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const router = useRouter();
  const redirectTo = (url) => router.push(url);

  const getDiscountPrice = (data) => Number(data.price) - Number(data.discount);
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
        className="hover:opacity-75 hover:drop-shadow-2xl aspect-square object-contain"
      />
      <Box className="text-center">
        <Typography className="text-xs w-[180px] text-gray-500">
          {props.name}
        </Typography>
        {/* <Typography className="text-md font-semibold text-gray-600">
          ฿{props.price}
        </Typography> */}

        <Box className="flex justify-center gap-2">
          <Typography
            className={clsx({
              ["text-center font-semibold"]: true,
              ["line-through text-black"]: props.sale,
              ["text-blue-500"]: !props.sale,
            })}
          >
            ฿{props.price}
          </Typography>
          {props.sale && (
            <Typography className="font-semibold text-red-500">
              ฿{getDiscountPrice(props).toFixed(2)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TopSellProduct;
