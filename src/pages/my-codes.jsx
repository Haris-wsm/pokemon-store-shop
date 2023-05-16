import PageLayout from "@/components/Layouts/PageLayout";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";

import { withAuth } from "@/utils/auth";
import ApiReq from "@/utils/axios";
import { getSession } from "next-auth/react";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export const getServerSideProps = withAuth(async (context) => {
  const session = await getSession(context);

  const response = await ApiReq.get(`/api/orders/my-codes`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  return {
    props: {
      orders: response.data.data,
    },
  };
});

const MyCodes = (props) => {
  const router = useRouter();
  const columns = useMemo(() => [
    {
      field: "ref_no",
      headerName: "Ref.",
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography className="text-slate-600 text-xs">
            {params.row.ref_no}
          </Typography>
        );
      },
    },
    {
      field: "timeout",
      headerName: "วันที่ชำระ",
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography className="text-slate-600 text-xs">
            {dayjs(params.row.timeout).format("YYYY-MM-DD HH:mm:ss")}
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
        return (
          <Box className="w-full flex justify-center my-3">
            <Button
              onClick={() => redirectTo(`/purchase/${params.row.ref_no}`)}
              className="bg-slate-700 text-white hover:bg-slate-800 text-xs"
            >
              เรียกดู
            </Button>
          </Box>
        );
      },
    },
  ]);

  const redirectTo = (url) => {
    router.push(url);
  };
  return (
    <PageLayout title="MY CODES">
      <Box className="py-10 my-10">
        <DataGrid
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          columns={columns}
          rows={props.orders}
          getRowId={(row) => row._id}
          // getRowHeight={() => "auto"}
        />
      </Box>
    </PageLayout>
  );
};

export default MyCodes;
