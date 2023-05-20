import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React, { useCallback, useEffect, useState } from "react";
import Item from "./Item";
import Link from "next/link";
import { useRouter } from "next/router";
import { cartState, useCart } from "@/atom/cartState";
import ApiReq from "@/utils/axios";
import { useRecoilState } from "recoil";
import { itemState, useItems } from "@/atom/items";
import { toast } from "react-toastify";

const CartList = () => {
  const [cartItems, _] = useCart();
  const [loading, setLoading] = useState(false);

  // Items from server

  const [items, setItems] = useItems();

  useEffect(() => {
    if (cartItems.length) {
      getCartItem();
    }
  }, [cartItems]);

  const getCartItem = async () => {
    try {
      const paylaod = { cart: cartItems };
      const response = await ApiReq.post("/api/products/user-cart", paylaod);

      const product = response.data.data;

      const hasOutOfStock = product.some((prod) => prod.validItem === false);

      if (hasOutOfStock) toast.warn("สินค้าบางชิ้นหมด");

      setItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = useCallback(() => {
    const total = items.reduce((acc, item) => {
      const { price, qty, discount, sale } = item;

      if (!item.validItem) {
        return 0 + acc;
      }

      let toalPrice = 0;

      if (sale) {
        toalPrice = (Number(price) - Number(discount)) * Number(qty);
      } else {
        toalPrice = Number(price) * Number(qty);
      }

      return toalPrice + acc;
    }, 0);

    return total;
  }, [items]);

  const router = useRouter();

  const redirectToCheckout = () => {
    router.push("/checkout");
  };

  const verifyToCheckoutPage = async () => {
    setLoading(true);

    const paylaod = { cart: cartItems };
    const response = await ApiReq.post("/api/products/user-cart", paylaod);

    const product = response.data.data;

    const hasOutOfStock = product.some((prod) => prod.validItem === false);

    if (hasOutOfStock) {
      toast.warn("สินค้าบางชิ้นหมด");
      router.reload(window.location.pathname);
    } else {
      redirectToCheckout();
    }

    try {
    } catch (error) {
      setLoading(false);
    }
  };

  // Recoil State

  const [cart, setCart] = useRecoilState(cartState);
  // const [cartItem, setCartItem] = useRecoilState(itemState);

  const handleDeleteAll = () => {
    setCart([]);
    setItems([]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={8}>
        <Box className="hidden md:flex text-gray-700 mb-2">
          <Box className="w-[60%] ">
            <Typography className="text-sm font-semibold">สินค้า</Typography>
          </Box>
          <Box className="w-[13%]">
            <Typography className="text-sm font-semibold">ราคา</Typography>
          </Box>
          <Box className="w-[14%]">
            <Typography className="text-sm font-semibold">จำนวน</Typography>
          </Box>
          <Box className="w-[13%]">
            <Typography className="text-sm font-semibold">ราคารวม</Typography>
          </Box>
        </Box>
        <Divider />
        {items.map((item, i) => (
          <Item {...item} key={i} />
        ))}
        <Box className="flex justify-end">
          <Typography className="inline-block text-gray-600">
            ยอดรวม ({items.length} ชิ้น):
          </Typography>
          &nbsp;&nbsp;
          <Typography className="inline-block font-semibold">
            ฿ {getTotal(items).toFixed(2)}
          </Typography>
        </Box>
        <Box>
          <Button
            startIcon={<DeleteSweepIcon />}
            className="bg-gray-600 hover:bg-gray-500 text-white px-5"
            onClick={handleDeleteAll}
          >
            ล้างทั้งหมด
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Card className="p-3">
          <Typography className="text-lg text-gray-600 py-2 font-semibold">
            ORDER SUMMARY
          </Typography>
          <Divider />
          <CardContent>
            <Box className="flex justify-between py-4 ">
              <Typography className=" text-gray-700">ยอดรวมทั้งสิ้น</Typography>
              <Typography className=" text-gray-700">
                ฿ {getTotal().toFixed(2)}
              </Typography>
            </Box>
            <Divider className="my-2" />
            <Button
              startIcon={
                loading === false ? (
                  <QrCode2Icon />
                ) : (
                  <CircularProgress
                    color="inherit"
                    className="mx-2"
                    size={20}
                  />
                )
              }
              className="bg-neutral-600 hover:bg-neutral-500 text-white mt-2 text-center"
              fullWidth
              onClick={verifyToCheckoutPage}
            >
              ชำระเงิน
            </Button>
          </CardContent>
        </Card>
        <Link
          href="/"
          className="flex gap-3 items-center justify-center py-5 cursor-pointer hover:underline"
        >
          <ArrowBackIcon
            fontSize="small"
            className="inline-block text-gray-500"
          />
          <Typography className="text-xs text-gray-500 inline-block">
            กลับไปยังหน้าหลัก
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default CartList;
