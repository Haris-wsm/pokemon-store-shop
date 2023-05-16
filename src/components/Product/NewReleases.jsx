import { mockingProduct } from "@/data/products";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewReleaseProduct from "../Home/NewReleaseProduct";
import ApiReq from "@/utils/axios";

const NewReleases = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getNewReleasesProduct();
  }, []);

  const getNewReleasesProduct = async () => {
    try {
      const resposne = await ApiReq.get(`/api/products/newest?limit=3`);

      setProducts(resposne.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Typography className="text-xl font-semibold mt-5 mb-2">
        New Releases
      </Typography>
      <Box className="mb-7">
        <Divider className="relative" />
        <Divider className="absolute bg-black w-[5%]" />
      </Box>
      <Box className="mb-10">
        <Grid container>
          {products.map((prod, i) => {
            return (
              <Grid item key={i} md={12}>
                <NewReleaseProduct {...prod} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default NewReleases;
