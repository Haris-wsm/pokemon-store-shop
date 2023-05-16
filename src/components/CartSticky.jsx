import React from "react";
import { Box, Typography } from "@mui/material";

import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/atom/cartState";

const CartSticky = () => {
  const router = useRouter();

  if (router.pathname === "/view-cart") return <></>;
  if (router.pathname === "/checkout") return <></>;
  if (router.pathname === "/my-account") return <></>;
  if (router.pathname === "/create-an-account") return <></>;
  if (router.pathname.includes("qrcode")) return <></>;

  const [cartItem, setCartItem] = useCart();
  return (
    <Link
      href="/view-cart"
      className="bg-background-dark w-[90px] h-[83px] rounded-l-xl cursor-pointer group xs:hidden md:fixed top-[60%] right-0"
    >
      <Box className="flex gap-2 flex-col justify-center items-center h-[100%]">
        <LocalMallOutlinedIcon
          className="text-white group-hover:text-gray-500"
          fontSize="large"
        />
        <Typography className="text-white group-hover:text-gray-500">
          {cartItem.length} ชิ้น
        </Typography>
      </Box>
    </Link>
  );
};

export default CartSticky;
