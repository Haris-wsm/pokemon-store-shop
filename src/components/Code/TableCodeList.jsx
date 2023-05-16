import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

const TableCodeList = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        field: "number",
        headerName: "#",
        headerAlign: "center",
        align: "center",
        width: 200,
        renderCell: (params) => {
          return (
            <Typography className="text-slate-600 text-xs">
              {params.row.number}
            </Typography>
          );
        },
      },
      {
        field: "code",
        headerName: "รหัส",
        width: 250,
        renderCell: (params) => {
          return (
            <Typography className="text-slate-600 text-xs">
              {params.row.code}
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
          const { code } = params.row;
          return (
            <Box className="w-full flex justify-center my-3">
              <Button
                onClick={() => copyToClipBoard(code)}
                endIcon={<ContentCopyIcon />}
                className="bg-slate-700 text-white text-xs py-2 px-3 hover:bg-slate-600"
              >
                คัดลอก
              </Button>
            </Box>
          );
        },
      },
    ],
    []
  );

  const copyToClipBoard = (value) => {
    navigator.clipboard.writeText(value);
    toast.success("คัดลอกข้อความสำเร็จ");
  };
  return (
    <DataGrid
      autoHeight
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      columns={columns}
      rows={data}
      getRowId={(row) => row._id}
      getRowHeight={() => "auto"}
    />
  );
};

export default TableCodeList;
