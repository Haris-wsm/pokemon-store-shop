import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import ScrollToTopFab from "../ScrollToTopFab";
import CartSticky from "../CartSticky";
import Head from "next/head";
import Announcmennt from "../Announcmennt";

const Toolbar = dynamic(import("../Navbar"));
const SearchBar = dynamic(import("../SearchBar"));
const Footer = dynamic(import("../Footer"));
const CategoryList = dynamic(import("../CategoryList"));

const Container = styled(Box)(({ theme }) => ({}));

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>DTS STORE</title>
        <meta property="og:url" content="your url" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="your fb app id" />
        <meta
          property="og:title"
          content="ซื้อขาย ซอง แพ็ค แพค โค้ด pokemon tcg live"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Code Store Fun, Pokemon and Card desks"
        />
        <meta property="og:image" content="/logo.png" />
      </Head>
      <Container>
        <Announcmennt />
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
