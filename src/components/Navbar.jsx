import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { useCart } from "@/atom/cartState";
import { getSession, signOut } from "next-auth/react";

const NavbarWrapper = styled(Box)(({ theme }) => ({}));
const Navbar = styled(Box)(({ theme }) => ({}));
const Menu = styled(Typography)(({ theme }) => ({}));

const menus = [
  { name: "About Us", link: "/about-us" },
  {
    name: "Contact Us",
    link: "https://web.facebook.com/profile.php?id=100049204909367",
  },
];

const Toolbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => setOpenDrawer(false);

  const router = useRouter();
  const handleNavigate = (path) => {
    setOpenDrawer(false);
    router.push(path);
  };

  const [cartItem, setCartItem] = useCart();

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

  const hadleLogout = () => {
    signOut();
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
          <Box>
            <Link href="/">
              <Image
                alt="logo"
                src="/logo.png"
                width={120}
                height={50}
                className="object-contain h-auto"
              />
            </Link>
          </Box>
          <Box>
            <Link href="/view-cart">
              <CartIcon className="relative" />
              {cartItem.length > 0 ? (
                <Box className="absolute w-[10px] h-[10px] top-2 right-5 p-1 text-center rounded-full bg-red-500 text-white text-xs font-sans"></Box>
              ) : (
                <></>
              )}
            </Link>

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
              <ListItem onClick={() => handleNavigate("/contact-us")}>
                Contact Us
              </ListItem>
              <Divider className="bg-white" />
              <ListItem onClick={() => handleNavigate("/blog-home")}>
                Blog
              </ListItem>
              <Divider className="bg-white" />
              {isLogin !== true ? (
                <>
                  <ListItem onClick={() => handleNavigate("/my-account")}>
                    Login
                  </ListItem>
                  <Divider className="bg-white" />
                  <ListItem
                    onClick={() => handleNavigate("/create-an-account")}
                  >
                    Register
                  </ListItem>
                  <Divider className="bg-white" />
                </>
              ) : (
                <>
                  <ListItem onClick={() => handleNavigate("/my-codes")}>
                    โค้ดของฉัน
                  </ListItem>
                  <Divider className="bg-white" />
                  <ListItem onClick={hadleLogout}>Logout</ListItem>
                  <Divider className="bg-white" />
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </NavbarWrapper>
    </>
  );
};

export default Toolbar;
