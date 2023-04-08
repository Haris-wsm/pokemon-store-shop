import { cards } from "@/data/products";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Product from "./Product";

const ProductList = () => {
  return (
    <Box className="w-full pb-10 p-2 md:p-5">
      <Grid container spacing={1}>
        {cards.map((card, i) => (
          <Grid item key={i} xs={6} sm={6} md={4} lg={2.4} className="pl-0">
            <Product {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
