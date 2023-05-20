import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import CartIcon from "@mui/icons-material/LocalMall";
import { useTheme } from "@emotion/react";
import clsx from "clsx";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { useCart } from "@/atom/cartState";
import { usePayment } from "@/atom/paymentState";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import CodeIcon from "@mui/icons-material/Code";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";

const SearchBox = styled("input")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

const SearchButton = styled("button")(({ theme }) => ({}));

const SearchWrapper = styled("Box")(({ theme }) => ({
  position: "relative",
  height: "40px",
  outline: "1px solid rgba(0,0,0,0.1)",
  width: "50%",
  borderRadius: "15px",
  padding: "10px 15px",
  color: "#1E1E1E",
  [theme.breakpoints.down("md")]: {
    width: "70%",
  },
}));

const SearchBar = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [cartItem] = useCart();
  const [payment] = usePayment();

  const router = useRouter();
  const [search, setSearch] = useState("");

  // Session
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getCredentails();
  }, [router]);

  const getCredentails = async () => {
    try {
      const session = await getSession();
      if (session) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (search !== "") {
      router.push(`/search/${search}`);
      setSearch("");
    }
  };

  const hadleLogout = () => {
    signOut();
    setOepn(false);
  };

  // User login menu
  const [open, setOepn] = useState(false);

  const redirectTo = (url) => {
    router.push(url);
  };

  return (
    <Box
      className={clsx({
        ["w-screen justify-center h-[50px] md:h-[90px] flex bg-white z-[2000] py-4 md:py-0"]: true,
        ["fixed top-[68px] left-0 right-0"]: matches,
      })}
    >
      <Box className="p-0 md:p-2.5 bg-white w-4/5 flex justify-between items-center mx-auto">
        <Box className="hidden md:block lg:block">
          <Link href="/">
            <Image alt="logo" src="/logo.jpg" width={50} height={50} />
          </Link>
        </Box>
        <SearchWrapper className="relative h-[40px] border-1 border-gray-200 rounded-3xl w-full md:w-[40%]">
          <SearchBox
            type="text"
            placeholder="ค้นหา"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-sans outline-none w-full pb-[16px] xs:pb-[8px] md:pb-[32px] lg:pb-[32px] text-md"
          />
          <SearchButton
            onClick={handleSearch}
            className="absolute w-[40px] h-[40px] rounded-full border-2 border-gray-500 text-gray-500 right-[-5px] top-1/2 transform -translate-y-1/2 cursor-pointer bg-white hover:bg-red-600 hover:text-white hover:border-red-500"
          >
            <SearchIcon className="text-sm md:text-md" />
          </SearchButton>
        </SearchWrapper>

        {isLogin !== true ? (
          <Box className="gap-4 px-2 ml-6 hidden md:flex lg:flex">
            <Link
              href="/my-account"
              className="flex gap-2 text-gray-500 cursor-pointer items-center"
            >
              <LoginIcon className="text-sm" />
              <Typography className="text-xs">Login</Typography>
            </Link>
            <Divider orientation="vertical" flexItem />
            <Link
              href="/create-an-account"
              className="flex gap-2 text-gray-500 cursor-pointer items-center"
            >
              <PersonAddIcon className="text-sm" />
              <Typography className="text-xs">Register</Typography>
            </Link>
          </Box>
        ) : (
          <Box
            className="px-2 ml-6 hidden md:block cursor-pointer relative"
            onClick={() => setOepn(!open)}
            onBlur={() => setOepn(false)}
          >
            <Box className="  flex items-center gap-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-md">
              <AccountCircleIcon
                className="text-gray-500 "
                sx={{ fontSize: 30 }}
              />
              <Typography className="text-slate-600 text-xs">
                บัญชีผู้ใช้
              </Typography>
            </Box>

            <Box
              className={clsx({
                ["text-xs absolute top-[100%] w-full text-slate-700 bg-white rounded-md   shadow-2xl px-3 py-3 flex flex-col gap-3 items-start justify-center z-[5000]"]: true,
                ["hidden"]: !open,
                ["block"]: open,
              })}
            >
              <Box className="flex gap-2 items-center hover:text-gray-800 hover:bg-gray-100 py-2 w-full">
                <CodeIcon className="text-gray-500" style={{ fontSize: 12 }} />
                <Typography
                  className="text-xs text-gray-500"
                  onClick={() => redirectTo("/my-codes")}
                >
                  โค้ดของฉัน
                </Typography>
              </Box>
              <Box className="flex gap-2 items-center hover:text-gray-800 hover:bg-gray-100 py-2 w-full">
                <LogoutIcon
                  className="text-gray-500"
                  style={{ fontSize: 12 }}
                />
                <Typography
                  className="text-xs text-gray-500"
                  onClick={hadleLogout}
                >
                  Logout
                </Typography>
              </Box>
            </Box>
            {/* <Button startIcon={<PortraitIcon />}></Button> */}
          </Box>
        )}

        <Link
          href="/view-cart"
          className="text-gray-500 hidden md:flex lg:flex gap-2 items-center justify-center ml-5"
        >
          <CartIcon />
          <Box className="px-2.5 py-0.5 rounded-full bg-gray-500 text-white text-sm font-sans">
            {cartItem.length}
          </Box>
        </Link>
        {payment?.orderId && !router.asPath.includes("qrcode") && (
          <Link
            href={`/qrcode/${payment.orderId}`}
            className="text-gray-500 hidden md:flex lg:flex gap-2 items-center justify-center ml-5"
          >
            <Tooltip title="กลับไปยังหน้าชำระสินค้า">
              <ShoppingCartCheckoutOutlinedIcon className="text-gray-500" />
            </Tooltip>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
