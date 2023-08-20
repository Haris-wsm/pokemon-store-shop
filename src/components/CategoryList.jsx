// import { categories } from "@/data/products";
import ApiReq from "@/utils/axios";
import { useTheme } from "@emotion/react";
import { Tooltip, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
    slidesToSlide: 2, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    slidesToSlide: 2, // optional, default to 1.
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
  const resposne = await ApiReq.get("/api/categories");

  const error = resposne.data.ok ? false : resposne.data.message;
  return { props: { error, categories: resposne.data.data } };
}

const CategoryList = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();

  const matchesWord = (word, match) => match.toUpperCase() === word;

  const [clientWindowHeight, setClientWindowHeight] = useState("");

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // Categories

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getListCategory();
  }, []);

  const getListCategory = async () => {
    try {
      const resposne = await ApiReq.get("/api/categories");
      setCategories(resposne.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectTo = (name) => {
    if (name === "ON SALE") {
      router.push(`/on-sale`);
    } else if (name === "HOME") {
      router.push(`/`);
    } else {
      router.push(`/${name}`);
    }
  };

  return (
    <Box
      className={clsx({
        ["bg-background-dark text-white z-[3000]"]: true,
        ["fixed top-[118px] left-0 right-0"]: matches,
        ["fixed top-0 left-0 right-0"]: clientWindowHeight > 136,
      })}
    >
      <Carousel
        autoPlay={false}
        autoPlaySpeed={3000}
        centerMode={false}
        className="md:w-4/5 w-full sm:w-full lg:w-4/5 mx-auto font-sans category"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="carousel-item-padding-40-px"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        ssr
      >
        {[{ name: "HOME" }, { name: "ON SALE" }, ...categories]?.map(
          (category, i) => (
            <>
              <Tooltip
                title={category.name.toUpperCase()}
                placement="bottom"
                key={i}
              >
                <Typography
                  className={clsx({
                    ["cursor-pointer text-xs sm:text-[0.875rem] px-2 xs:px-3 sm:px-3 hover:underline text-center h-[42px] leading-[42px]"]: true,
                    ["bg-[#f35b68]"]: matchesWord(category.name, "ON SALE"),
                    ["bg-background-dark"]: !matchesWord(
                      category.name,
                      "ON SALE"
                    ),
                  })}
                  onClick={() => redirectTo(category.name)}
                >
                  {category.name.toUpperCase()}
                </Typography>
              </Tooltip>
            </>
          )
        )}
      </Carousel>
    </Box>
  );
};

export default CategoryList;
