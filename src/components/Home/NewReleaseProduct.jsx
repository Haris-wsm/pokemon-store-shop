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

  const getDiscountPrice = (data) => Number(data.price) - Number(data.discount);

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
        className="hover:opacity-75 hover:drop-shadow-2xl aspect-square object-contain"
      ></Image>
      <Box className="text-center">
        <Typography className="text-xs w-[180px] text-gray-500">
          {props.name}
        </Typography>
        {/* <Typography className="text-md font-semibold text-gray-600">
          ฿{props.price}
        </Typography> */}

        <Box className="flex justify-center gap-2 text-sm">
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
            <Typography className="font-semibold text-red-500 text-sm">
              ฿{getDiscountPrice(props).toFixed(2)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NewReleaseProduct;
