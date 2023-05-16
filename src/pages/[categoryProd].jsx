import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import ProductByCategory from "@/components/ProductByCategory";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Product from "@/components/Home/Product";
import TopSell from "@/components/Product/TopSell";
import NewReleases from "@/components/Product/NewReleases";
import ApiReq from "@/utils/axios";
import CustomPagination from "@/components/Pagination";

export async function getServerSideProps(context) {
  const { categoryProd, page = 1, limit = 30, sort = "" } = context.query;

  const resposne = await ApiReq.get(
    `/api/products/category/${categoryProd}?page=${page}&limit=${limit}&${sort}`
  );

  const error = resposne.data.ok ? false : resposne.data.message;

  return {
    props: {
      error,
      products: resposne.data.data.products,
      page,
      limit,
      total: resposne.data.data.total,
    },
  };
}

const CatrgoryProduct = (props) => {
  const router = useRouter();
  const { categoryProd } = router.query;

  const totalPages = Math.ceil(props.total / props.limit);

  const currentPage = parseInt(props.page);

  const handleChange = (event, value) => {
    const params = `?page=${value}&limit=${props.limit}`;

    router.replace(`/${categoryProd}${params}`);
  };

  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-[90%] lg:w-4/5 mx-auto px-5 md:px-0">
        <Grid container spacing={3}>
          <Grid xs={0} sm={0} md={0} lg={3} item className="hidden lg:block">
            <TopSell />
            <NewReleases />
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
            <ProductByCategory total={props.total} />
            {totalPages > 1 && (
              <CustomPagination
                count={totalPages}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                handleChange={handleChange}
              />
            )}
            <Divider className="relative my-8" />

            <Grid container className="pb-10">
              {props?.products?.map((prod, i) => (
                <Grid item md={4} sm={4} key={i}>
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
