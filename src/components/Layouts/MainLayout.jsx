import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import ScrollToTopFab from "../ScrollToTopFab";
import CartSticky from "../CartSticky";
import Head from "next/head";

const Toolbar = dynamic(import("../Navbar"));
const SearchBar = dynamic(import("../SearchBar"));
const Footer = dynamic(import("../Footer"));
const CategoryList = dynamic(import("../CategoryList"));

const Container = styled(Box)(({ theme }) => ({}));

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Code Store Fun!</title>
        <meta property="og:url" content="your url" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="your fb app id" />
        <meta
          property="og:title"
          content="โค้ดโปเกม่อนการ์ดสุดโปรด เยี่ยมชม!"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Code Store Fun, Pokemon and Card desks"
        />
        <meta property="og:image" content="/logo.png" />
      </Head>
      <Container>
        <Toolbar />
        <SearchBar />
        <CategoryList />
        <Box className="h-[100%] ">{children}</Box>
        <Footer />
        {/* Scroll To Top Button */}
        <ScrollToTopFab />
        {/* Cart Sticky */}
        <CartSticky />
      </Container>
    </>
  );
};

export default MainLayout;
