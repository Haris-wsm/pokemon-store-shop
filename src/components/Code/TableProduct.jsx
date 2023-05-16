import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import React, { useMemo, useState } from "react";

const TableProduct = ({ handleSetCode, products }) => {
  const columns = useMemo(
    () => [
      {
        headerName: "รูปภาพ",
        field: "ref_product.image",
        width: 200,
        renderCell: (params) => {
          const url =
            process.env.NEXT_PUBLIC_BACKEND_DOMAIN +
            params.row.ref_product.image;
          return (
            <Box className="my-3">
              <Image
                priority
                src={url}
                height={200}
                width={100}
                className="h-auto"
                alt="image-product"
              />
            </Box>
          );
        },
      },
      {
        field: "ref_product.name",
        headerName: "ชื่อสินค้า",
        width: 250,
        renderCell: (params) => {
          return (
            <Typography className="text-slate-600 text-xs">
              {params.row.ref_product.name}
            </Typography>
          );
        },
      },
      {
        field: "actions",
        headerName: "",
        width: 200,
        flex: 1,
        renderCell: (params) => {
          const { codes, ref_product } = params.row;

          return (
            <Box className="w-full flex justify-center">
              <Button
                onClick={() => handleSetCode(codes, ref_product.name)}
                className="bg-slate-700 text-white text-xs py-2 px-3 hover:bg-slate-600"
              >
                เรียกดู Code
              </Button>
            </Box>
          );
        },
      },
    ],
    []
  );
  return (
    <DataGrid
      autoHeight
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      columns={columns}
      rows={products}
      getRowId={(row) => row.ref_product._id}
      getRowHeight={() => "auto"}
    />
  );
};

export default TableProduct;
