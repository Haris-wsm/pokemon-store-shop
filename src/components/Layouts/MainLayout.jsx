import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import ScrollToTopFab from "../ScrollToTopFab";

const Toolbar = dynamic(import("../Navbar"));
const SearchBar = dynamic(import("../SearchBar"));
const Footer = dynamic(import("../Footer"));
const CategoryList = dynamic(import("../CategoryList"));

const Container = styled(Box)(({ theme }) => ({}));

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Toolbar />
      <SearchBar />
      <CategoryList />
      <Box className="h-[100%] min-h-[100vh]">{children}</Box>
      <Footer />

      {/* Scroll To Top Button */}
      <ScrollToTopFab />
    </Container>
  );
};

export default MainLayout;
