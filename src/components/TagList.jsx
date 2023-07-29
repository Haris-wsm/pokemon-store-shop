import ApiReq from "@/utils/axios";
import { Box, Chip, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    requrstGetTags();
  }, []);

  const requrstGetTags = async () => {
    try {
      const response = await ApiReq.get("/api/tags");

      setTags(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box className="w-full pb-10 p-2 md:p-5 mt-5">
      <div className="mx-auto max-w-screen-lg">
        {tags.map((tag) => (
          <Chip label={tag.name} variant="outlined" className="m-1" />
        ))}
      </div>
    </Box>
  );
};

export default TagList;
