import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import TableProduct from "./TableProduct";
import TableCodeList from "./TableCodeList";

const TableAll = (props) => {
  const [codeList, setCodeList] = useState([]);
  const [name, setName] = useState(null);

  const handleSetCode = (codes, name) => {
    setCodeList(codes.map((code, i) => ({ ...code, number: i + 1 })));
    setName(name);
  };

  const clearSelect = () => {
    setCodeList([]);
    setName(null);
  };

  return (
    <Box className="py-10">
      {/* <TableCodeList data={codeList} /> */}
      <Box className="flex justify-between items-center my-5">
        {name && (
          <>
            <Button
              onClick={() => clearSelect()}
              className="bg-slate-700 hover:bg-slate-600 text-white"
              size="small"
            >
              กลับ
            </Button>
            <Typography className="text-rose-400 text-sm underline font-semibold">
              {name}
            </Typography>
          </>
        )}
      </Box>
      {codeList?.length > 0 ? (
        <Box>
          <TableCodeList data={codeList} name={name} />
        </Box>
      ) : (
        <Box>
          <TableProduct
            handleSetCode={handleSetCode}
            products={props.products}
          />
        </Box>
      )}
    </Box>
  );
};

export default TableAll;
