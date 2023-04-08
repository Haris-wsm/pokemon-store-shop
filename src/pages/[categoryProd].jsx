import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import ProductByCategory from "@/components/ProductByCategory";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { mockingProduct } from "@/data/products";
import Product from "@/components/Home/Product";
import TopSellProduct from "@/components/Home/TopSellProduct";
import NewReleaseProduct from "@/components/Home/NewReleaseProduct";

const CatrgoryProduct = () => {
  const router = useRouter();
  const { categoryProd } = router.query;

  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-[90%] lg:w-4/5 mx-auto px-5 md:px-0">
        <Grid container spacing={3}>
          <Grid xs={0} sm={0} md={0} lg={3} item className="hidden lg:block">
            <Typography className="text-xl font-semibold mt-5 mb-2">
              Top Sellers
            </Typography>
            <Box className="mb-7">
              <Divider className="relative" />
              <Divider className="absolute bg-black w-[5%]" />
            </Box>
            <Box>
              <Grid container>
                {mockingProduct?.topsell.map((prod, i) => {
                  const bestsell = i === 0 ? true : false;
                  return (
                    <Grid item key={i} md={12}>
                      <TopSellProduct {...prod} bestsell={bestsell} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <Typography className="text-xl font-semibold mt-5 mb-2">
              New Releases
            </Typography>
            <Box className="mb-7">
              <Divider className="relative" />
              <Divider className="absolute bg-black w-[5%]" />
            </Box>
            <Box className="mb-10">
              <Grid container>
                {mockingProduct?.topsell.map((prod, i) => {
                  return (
                    <Grid item key={i} md={12}>
                      <NewReleaseProduct {...prod} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={9} item>
            <NavbarBreadcrumb />
            <Typography className="text-3xl font-semibold mt-5 mb-2">
              {categoryProd?.toUpperCase()}
            </Typography>
            <Box className="mb-7">
              <Divider className="relative" />
              <Divider className="absolute bg-black w-[5%]" />
            </Box>
            <ProductByCategory total={56} />
            <Divider className="relative my-8" />

            <Grid container>
              {mockingProduct?.onslae.map((prod) => (
                <Grid item md={4} sm={4}>
                  <Product {...prod} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CatrgoryProduct;
