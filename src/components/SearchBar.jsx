import React from "react";
import styled from "@emotion/styled";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import CartIcon from "@mui/icons-material/LocalMall";
import { useTheme } from "@emotion/react";
import clsx from "clsx";
import Link from "next/link";

const SearchBox = styled("input")(({ theme }) => ({}));

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

const SearchBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      className={clsx({
        ["w-screen justify-center h-[50px] md:h-[90px] flex bg-white z-[2000]"]: true,
        ["fixed top-[68px] left-0 right-0"]: matches,
      })}
    >
      <Box className="p-0 md:p-2.5 bg-white w-4/5 flex justify-between items-center mx-auto">
        <Typography className="min-w-[220px] hidden md:block lg:block">
          Logo
        </Typography>
        <SearchWrapper className="relative h-[40px] border-1 border-gray-200 rounded-3xl w-full md:w-[40%]">
          <SearchBox
            type="text"
            placeholder="ค้นหา"
            className="outline-none w-full pb-[16px] xs:pb-[8px] md:pb-[32px] lg:pb-[32px] text-md"
          />
          <SearchButton className="absolute w-[40px] h-[40px] rounded-full border-2 border-gray-500 text-gray-500 right-[-5px] top-1/2 transform -translate-y-1/2 cursor-pointer bg-white hover:bg-red-600 hover:text-white hover:border-red-500">
            <SearchIcon />
          </SearchButton>
        </SearchWrapper>

        <Box className="gap-4 px-2 ml-6 hidden md:flex lg:flex">
          <Link
            href="/my-account"
            className="flex gap-2 text-gray-500 cursor-pointer items-center"
          >
            <LoginIcon />
            <Typography className="text-sm">Login</Typography>
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link
            href="/create-an-account"
            className="flex gap-2 text-gray-500 cursor-pointer items-center"
          >
            <PersonAddIcon />
            <Typography className="text-sm">Register</Typography>
          </Link>
        </Box>

        <Box className="text-gray-500 hidden md:flex lg:flex gap-2 items-center justify-center ml-5">
          <CartIcon />
          <Box className="px-2.5 py-0.5 rounded-full bg-gray-500 text-white text-sm">
            0
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBar;
