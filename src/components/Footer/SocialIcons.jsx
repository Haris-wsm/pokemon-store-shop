import { Box, Typography } from "@mui/material";
import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

const SocialIcons = ({ facebook, twitter, instagram }) => {
  return (
    <Box className="flex flex-col justify-center items-center">
      <Typography variant="h6">Our Social Medias</Typography>

      <Box className="flex gap-2 my-2 justify-center">
        <Link href={facebook} target="_blank" rel="noopener noreferrer">
          <FacebookOutlinedIcon className="cursor-pointer" />
        </Link>
        <Link href={twitter} target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="cursor-pointer" />
        </Link>
        <Link href={instagram} target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="cursor-pointer" />
        </Link>
      </Box>
    </Box>
  );
};

export default SocialIcons;
