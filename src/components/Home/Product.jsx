import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import ProductIncBtn from "./ProductIncBtn";
import { useTheme } from "@emotion/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductSelect from "./ProductSelect";

import clsx from "clsx";

const Product = (props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const getDiscountPrice = (data) => Number(data.price) - Number(data.discount);
  // const haveStock = (data) => data.status === "in-stock";

  const getStockMessage = (data) => {
    if (data.status === "in-stock") {
      return `${data.stock} - In Stock.`;
    }
    return "Out Of Stock.";
  };

  return (
    <Box>
      <Card elevation={0}>
        <Box className="flex justify-center relative">
          <Image
            //   loader={props.image}
            src={props.image}
            alt="My Image"
            width={mobile ? 178 : 200}
            height={mobile ? 178 : 200}
            className={clsx({
              ["cursor-pointer hover:drop-shadow-2xl shadow-blue-400  mx-auto"]: true,

              ["opacity-60"]: props.status === "out-stock",
              ["hover:opacity-75"]: props.status === "in-stock",
            })}
          />
          {props.sale && (
            <Box className="absolute top-0 right-0 drop-shadow-md bg-red-500 px-3 py-1 font-sans text-xs text-white">
              SALE
            </Box>
          )}
        </Box>
        <CardContent className="p-2">
          <Typography className="text-sm font-sans font-semibold text-center h-[64px]  lg:h-[80px]">
            {props.name}
          </Typography>
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
          <Box
            className={clsx({
              ["font-semibold"]: true,
              ["text-green-700"]: props.status === "in-stock",
              ["text-red-500"]: props.status === "out-stock",
            })}
          >
            <Typography className="text-center text-xs my-2">
              {getStockMessage(props)}
            </Typography>
          </Box>
          <CardActions className="p-0 flex justify-center">
            {props.isSetPackage ? (
              <ProductSelect />
            ) : (
              <ProductIncBtn {...props} />
            )}
            <Button
              variant="contained"
              className="bg-gray-500 text-white text-xs md:text-sm  rounded-lg hover:bg-gray-700 flex items-center"
            >
              ADD TO{" "}
              {mobile ? <ShoppingCartIcon className="text-sm ml-2" /> : "CART"}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Product;
