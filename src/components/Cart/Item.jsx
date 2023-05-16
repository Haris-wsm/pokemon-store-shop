import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import BtnIncrease from "./BtnIncrease";
// import BtnSelect from "./BtnSelect";
import BtnSelect from "../Home/ProductSelect";
import { useRecoilState } from "recoil";
import { itemState } from "@/atom/items";
import { cartState } from "@/atom/cartState";
import clsx from "clsx";

const Item = (props) => {
  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const [qty, setQty] = useState(props.qty || 0);

  const [items, setItems] = useRecoilState(itemState);

  const currItem = useMemo(
    () => items.find((item) => item._id === props._id),
    []
  );

  const getTotalPrice = useCallback(
    (item) => {
      const { sale, price, discount } = item;

      if (sale) {
        return ((Number(price) - Number(discount)) * Number(qty)).toFixed(2);
      } else {
        return (Number(price) * Number(qty)).toFixed(2);
      }
    },
    [qty]
  );

  const getPriceTag = useCallback((item) => {
    const { sale, price, discount } = item;

    if (sale) {
      return (Number(price) - Number(discount)).toFixed(2);
    } else {
      return Number(price).toFixed(2);
    }
  }, []);

  const handleUpdateQty = (qty) => {
    setQty(qty);

    setItems(
      items.map((item) =>
        item._id === currItem._id ? { ...currItem, qty } : item
      )
    );
  };

  // Recoil State

  const [cart, setCart] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useRecoilState(itemState);

  const handleRemoveItem = () => {
    setCart(cart.filter((item) => item._id !== props._id));
    setCartItems(cartItems.filter((item) => item._id !== props._id));
  };

  return (
    <Box
      className={clsx({
        ["shadow-lg flex flex-wrap justify-between items-center mb-5 md:mb-3 py-5"]: true,
        ["opacity-60"]: !props.validItem,
      })}
    >
      <Box className="flex gap-4 w-[100%] md:w-[60%]">
        <Image
          src={getStaticURL(props.image)}
          width={100}
          height={100}
          alt="product-cart"
        />

        <Box className="flex flex-col gap-2  justify-start">
          <Box className="flex">
            <Typography className="text-gray-600 text-sm w-[250px]">
              {props.name}
            </Typography>
            <Typography
              className={clsx({
                ["text-red-500 text-sm w-[250px]"]: true,
                ["hidden"]: props.validItem,
              })}
            >
              สินค้าจำนวนไม่พอ
            </Typography>
          </Box>
          <Box
            className={clsx({
              ["flex items-center gap-2 cursor-pointer hover:underline"]: true,
            })}
            onClick={handleRemoveItem}
          >
            <DeleteSweepIcon className="text-red-500" />
            <Typography className="text-xs text-blue-500 cursor-pointer">
              นำออก
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="w-[33.33%] md:w-[13%] ">
        <Typography className="text-gray-500 text-sm text-center md:text-left">
          ฿ {getPriceTag(props)}
        </Typography>
      </Box>
      <Box
        className={clsx({
          ["pointer-events-none opacity-60"]: !props.validItem,
          ["w-[33.33%] md:w-[14%] flex"]: true,
        })}
      >
        {props.isSetPackage ? (
          <BtnSelect />
        ) : (
          <BtnIncrease
            qty={qty}
            handleUpdateQty={handleUpdateQty}
            max={props.stock}
          />
        )}
      </Box>
      <Box className="w-[33.33%] md:w-[13%]">
        <Typography className="text-gray-500 text-sm">
          ฿ {getTotalPrice(props)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
