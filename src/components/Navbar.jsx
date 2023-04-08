import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from "next/link";

import MenuIcon from "@mui/icons-material/Menu";
import CartIcon from "@mui/icons-material/LocalMall";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

const NavbarWrapper = styled(Box)(({ theme }) => ({}));
const Navbar = styled(Box)(({ theme }) => ({}));
const Menu = styled(Typography)(({ theme }) => ({}));

const menus = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "My Account", link: "/my-account" },
  { name: "Contact Us", link: "/contact-us" },
  { name: "Blog  ", link: "/" },
];

const Toolbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => setOpenDrawer(false);

  const router = useRouter();
  const handleNavigate = (path) => {
    setOpenDrawer(false);
    router.push(path);
  };
  return (
    <>
      {/* Desktop Navbar */}
      <NavbarWrapper className="nav-warpper hidden md:block lg:block ">
        <Navbar className="w-4/5 h-full mx-auto flex justify-center items-center">
          {menus.map(({ name, link }, i) => (
            <Link href={link} className="nav-item-link " key={i}>
              <Menu className="text-white text-xs font-700 hover:underline font-semibold">
                {name}
              </Menu>
            </Link>
          ))}
        </Navbar>
      </NavbarWrapper>

      {/* Mobile Navbar */}
      <NavbarWrapper className="block md:hidden lg:hidden py-3 px-4 fixed top-0 left-0 right-0 bg-white z-[2000]">
        <Box className="w-full flex justify-between">
          <Box>
            <MenuIcon onClick={() => setOpenDrawer(true)} />
            <Typography className="text-xs text-gray-500">MENU</Typography>
          </Box>
          <Box>LOGO</Box>
          <Box>
            <CartIcon />
            <Typography className="text-xs text-gray-500">CART</Typography>
          </Box>
        </Box>

        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={handleCloseDrawer}
          className="z-[5000]"
          sx={{
            "& .MuiPaper-root": {
              width: "100%",
            },
          }}
        >
          <Box className="p-3 bg-neutral-500 h-screen text-white font-sans">
            <CloseIcon onClick={handleCloseDrawer} className="mb-5" />
            <Typography className="font-bold mb-2">MENU LINKS</Typography>
            <List className="text-sm uppercase font-">
              <Divider className="bg-white" />
              <ListItem onClick={() => handleNavigate("/")}>HOME</ListItem>
              <Divider className="bg-white" />
              <ListItem onClick={() => handleNavigate("/about-us")}>
                About Us
              </ListItem>
              <Divider className="bg-white" />
              <ListItem onClick={() => handleNavigate("/")}>
                My Account
              </ListItem>
              <Divider className="bg-white" />
              <ListItem onClick={() => handleNavigate("/contact-us")}>
                Contact Us
              </ListItem>
              <Divider className="bg-white" />
              <ListItem>Blog</ListItem>
              <Divider className="bg-white" />
            </List>
          </Box>
        </Drawer>
      </NavbarWrapper>
    </>
  );
};

export default Toolbar;
