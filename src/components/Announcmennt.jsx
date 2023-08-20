import ApiReq from "@/utils/axios";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Announcmennt = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    handleGetAnnoucment();
  }, []);

  const handleGetAnnoucment = () => {
    ApiReq.get("/api/announcement")
      .then((response) => {
        const { data } = response.data;
        setText(data.data);
        setStatus(data.status);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (!status) {
    return null;
  }

  return (
    <Box className="w-full bg-yellow-300 py-3 px-2 overflow-hidden">
      <Box className="flex">
        <Typography className="min-w-full shrink-0 whitespace-nowrap animate-textRun px-[15px]">
          {text}
        </Typography>
        <Typography className="min-w-full shrink-0 whitespace-nowrap animate-textRun px-[15px]">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Announcmennt;
