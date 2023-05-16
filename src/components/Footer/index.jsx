import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SocialIcons from "./SocialIcons";

import Subscribe from "./Subscribe";
import TermOfServices from "./TermOfServices";
import ApiReq from "@/utils/axios";

const Footer = () => {
  const [social, setSocial] = useState(null);

  useEffect(() => {
    handleGetLinks();
  }, []);

  const handleGetLinks = async () => {
    console.log("fired footer");
    try {
      const resposne = await ApiReq.get(`/api/social`);
      console.log(resposne.data.data);

      setSocial(resposne.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(social);
  return (
    <Box className="w-full bg-background-dark flex flex-col justify-center py-5 pb-7">
      <Grid
        container
        spacing={2}
        className="text-white px-5 py-8 w-full xs:w-full sm:w-full md:w-4/5 mx-auto"
      >
        <Grid item md={6} xs={12}>
          <SocialIcons
            facebook={social?.facebook || ""}
            twitter={social?.twitter || ""}
            instagram={social?.instagram || ""}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TermOfServices />
        </Grid>
        {/* <Grid item md={4} xs={12}>
          <Subscribe />
        </Grid> */}
      </Grid>
      <Divider
        style={{
          backgroundColor: "gray",
          height: 1,
          width: "50%",
          margin: "1em auto",
        }}
        variant="middle"
      />
      <Typography
        variant="body2"
        className="text-gray-500 text-center w-4/5 md:w-2/5 mx-auto"
      >
        © 2023 Card Game Store. This website is in no way affiliated with TPCi,
        Nintendo, Creatures, or Game Freak.
      </Typography>
    </Box>
  );
};

export default Footer;
