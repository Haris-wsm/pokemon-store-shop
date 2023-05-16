import Product from "@/components/Home/Product";
import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import CustomPagination from "@/components/Pagination";
import ProductByCategory from "@/components/ProductByCategory";
import ApiReq from "@/utils/axios";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export async function getServerSideProps(context) {
  const { word, page = 1, limit = 30, sort = "" } = context.query;

  const resposne = await ApiReq.get(
    `/api/products/search/${word}?page=${page}&limit=${limit}&${sort}`
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

const Search = (props) => {
  const router = useRouter();
  const { word } = router.query;

  const totalPages = Math.ceil(props.total / props.limit);

  const currentPage = parseInt(props.page);

  const handleChange = (event, value) => {
    const params = `?page=${value}&limit=${props.limit}`;

    router.replace(`/search/${word}${params}`);
  };
  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-[90%] lg:w-4/5 mx-auto px-5 md:px-0">
        <NavbarBreadcrumb />
        <Typography className="text-3xl font-semibold mt-5 mb-2">
          {word?.toUpperCase()}
        </Typography>
        <Box className="mb-7">
          <Divider className="relative" />
          <Divider className="absolute bg-black w-[5%]" />
        </Box>
        <Typography className="text-xs text-gray-500 my-10">
          ผลการค้นหาคำว่า "{word}" ผลลัพธ์ดังนี้
        </Typography>

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
            <Grid item md={3} sm={4} key={i}>
              <Product {...prod} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Search;
