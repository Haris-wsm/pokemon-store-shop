import { categories } from "@/data/products";
import { useTheme } from "@emotion/react";
import { Tooltip, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
    slidesToSlide: 10, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    slidesToSlide: 8, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 4,
  },
};

export async function getServerSideProps() {
  return { props: {} };
}

const CategoryList = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const matchesWord = (word, match) => match.toUpperCase() === word;

  const [clientWindowHeight, setClientWindowHeight] = useState("");

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <Box
      className={clsx({
        ["bg-background-dark text-white z-[3000]"]: true,
        ["fixed top-[118px] left-0 right-0"]: matches,
        ["fixed top-0 left-0 right-0"]: clientWindowHeight > 136,
      })}
    >
      <Carousel
        ssr={true}
        responsive={responsive}
        autoPlay={matches ? true : false}
        autoPlaySpeed={5000}
        transitionDuration={250}
        containerClass="carousel-container"
        className="md:w-4/5 w-full sm:w-full lg:w-4/5 mx-auto font-sans category"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        keyBoardControl={true}
        itemClass="carousel-item-padding-40-px"
      >
        {categories.map((cat, i) => (
          <Tooltip title={cat.toUpperCase()} placement="bottom" key={i}>
            <Typography
              className={clsx({
                ["cursor-pointer text-xs sm:text-[0.875rem] px-2 xs:px-3 sm:px-3 hover:underline text-center h-[42px] leading-[42px]"]: true,
                ["bg-[#f35b68]"]: matchesWord(cat, "ON SALE"),
                ["bg-background-dark"]: !matchesWord(cat, "ON SALE"),
              })}
            >
              {cat.toUpperCase()}
            </Typography>
          </Tooltip>
        ))}
      </Carousel>
    </Box>
  );
};

export default CategoryList;
