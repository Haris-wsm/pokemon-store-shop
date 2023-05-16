import { cards } from "@/data/products";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import ApiReq from "@/utils/axios";

const ProductList = () => {
  useEffect(() => {
    getNewestProduct();
  }, []);

  const [products, setProduct] = useState([]);

  const getNewestProduct = async () => {
    try {
      const resposne = await ApiReq.get("/api/products/newest");

      setProduct(resposne.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box className="w-full pb-10 p-2 md:p-5">
      <Grid container spacing={1}>
        {products?.map((card, i) => (
          <Grid item key={i} xs={6} sm={6} md={3} lg={2.4} className="pl-0">
            <Product {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
