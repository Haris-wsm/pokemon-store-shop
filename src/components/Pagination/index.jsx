import { Box, Pagination } from "@mui/material";
import React from "react";

const CustomPagination = ({ count, page, handleChange }) => {
  return (
    <Box display="flex" justifyContent="center" className="my-10">
      <Pagination
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        size="small"
      />
    </Box>
  );
};

export default CustomPagination;
