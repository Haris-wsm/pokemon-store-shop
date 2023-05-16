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
import React, { useState } from "react";
import ProductIncBtn from "./ProductIncBtn";
import { useTheme } from "@emotion/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductSelect from "./ProductSelect";

import clsx from "clsx";
import { useRouter } from "next/router";
import { useCart } from "@/atom/cartState";
import { toast } from "react-toastify";

const Product = (props) => {
  console.log(props);
  // Cart
  const [cartItem, setCartItem] = useCart();

  const addToCart = () => {
    const existItem = cartItem.find((item) => item._id === props._id);

    if (existItem) {
      const totalStock = props.stock || props.unused;
      const quantity = Number(existItem.qty) + Number(qty);

      if (quantity > totalStock) {
        toast.error("สินค้าเกินจำนวนจำกัด");
      } else {
        setCartItem(
          cartItem.map((item) =>
            item._id === existItem._id ? { ...existItem, qty: quantity } : item
          )
        );
        toast.success("เพิ่มสินค้าใส่ตะกร้าสำเร็จ");
      }
    } else {
      setCartItem((prev) => [...prev, { _id: props._id, qty: qty }]);
      toast.success("เพิ่มสินค้าใส่ตะกร้าสำเร็จ");
    }
  };

  const [qty, setQty] = useState(1);

  const handleAddQuntity = (qty) => {
    setQty(qty);
  };

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const getDiscountPrice = (data) => Number(data.price) - Number(data.discount);

  const getStockMessage = (data) => {
    if (data.status === "in-stock" && (data.stock > 0 || data.unused > 0)) {
      return `${data.stock ?? data.unused} - In Stock.`;
    }
    return "Out Of Stock.";
  };

  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  // Router
  const router = useRouter();

  const redirectTo = (url) => {
    router.push(url);
  };

  const isAvailable = (data) =>
    data.status === "in-stock" && (data.stock > 0 || data.unused > 0)
      ? true
      : false;

  return (
    <Box>
      <Card elevation={0}>
        <Box className="flex justify-center relative">
          <Image
            priority
            src={getStaticURL(props.image)}
            alt="My Image"
            width={mobile ? 178 : 200}
            height={mobile ? 178 : 200}
            className={clsx({
              ["cursor-pointer hover:drop-shadow-2xl shadow-blue-400  mx-auto"]: true,

              ["opacity-60"]:
                props.status === "out-stock" ||
                props.stock === 0 ||
                props.unused <= 0,
              ["hover:opacity-75"]: props.status === "in-stock",
            })}
            onClick={() => redirectTo(`/product/${props._id}`)}
          />
          {props.sale && (
            <Box className="absolute top-0 right-0 drop-shadow-md bg-red-500 px-3 py-1 font-sans text-xs text-white">
              SALE
            </Box>
          )}
        </Box>
        <CardContent className="p-2">
          <Typography className="text-xs md:text-sm  font-sans font-semibold text-center h-[64px]  lg:h-[80px]">
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
              ["text-green-700"]:
                (props.status === "in-stock" && props.stock > 0) ||
                props.unused - props.used >= 0,
              ["text-red-500"]:
                props.status === "out-stock" ||
                props.stock <= 0 ||
                props.unused <= 0,
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
              <ProductIncBtn {...props} handleAddQuntity={handleAddQuntity} />
            )}
            <Button
              variant="contained"
              className="bg-gray-500 text-white text-xs md:text-sm  rounded-lg hover:bg-gray-700 flex items-center"
              disabled={!isAvailable(props)}
              onClick={addToCart}
            >
              {mobile ? (
                <ShoppingCartIcon className="text-sm ml-2" />
              ) : (
                "เพิ่มใส่ตะกร้า"
              )}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Product;
