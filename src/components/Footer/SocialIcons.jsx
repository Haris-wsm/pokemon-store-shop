import { Box, Typography } from "@mui/material";
import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const SocialIcons = () => {
  return (
    <Box className="flex flex-col justify-center items-center">
      <Typography variant="h6">Our Social Medias</Typography>

      <Box className="flex gap-2 my-2 justify-center">
        <FacebookOutlinedIcon className="cursor-pointer" />
        <TwitterIcon className="cursor-pointer" />
        <InstagramIcon className="cursor-pointer" />
      </Box>
    </Box>
  );
};

export default SocialIcons;
