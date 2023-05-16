import { mockingProduct } from "@/data/products";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopSellProduct from "../Home/TopSellProduct";
import ApiReq from "@/utils/axios";

const TopSell = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getTopSellProduct();
  }, []);

  const getTopSellProduct = async () => {
    try {
      const response = await ApiReq.get(`/api/products/top-sell?limit=3`);

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Typography className="text-xl font-semibold mt-5 mb-2">
        Top Sellers
      </Typography>
      <Box className="mb-7">
        <Divider className="relative" />
        <Divider className="absolute bg-black w-[5%]" />
      </Box>
      <Box>
        <Grid container>
          {products.map((prod, i) => {
            const bestsell = i === 0 ? true : false;
            return (
              <Grid item key={i} md={12}>
                <TopSellProduct {...prod} bestsell={bestsell} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default TopSell;
