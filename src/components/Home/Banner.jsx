import { Box, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    <Box className="font-sans px-5 py-6 mb-10">
      <Typography
        // variant="h4"
        className="font-semibold text-center mb-5  text-xl sm:text-xl md:text-2xl lg:text-4xl"
      >
        PoTown Store - PTCGO and PTCGL Codes - Instant Email Delivery
      </Typography>
      <Typography className="text-gray-600 px-3 text-sm sm:text-md md:text-lg lg:text-lg">
        Best online place to buy PTCGO and PTCGL Codes with automatic e-mail
        delivery instantly! Pokemon TCG code cards store for all your needs.
        Crown Zenith, Silver Tempest, Lost Origin, Pokemon GO, Astral Radiance,
        Brilliant Stars, Fusion Strike, Celebrations, Evolving Skies, Chilling
        Reign, Battle Styles, Shining Fates, Vivid Voltage, Champion's Path,
        Darkness Ablaze, Rebel Clash, Sword & Shield codes you name it! We have
        it all. Get them with trust and confidence. Checkout with Paypal or any
        Credit Card you desire. Use Pokemon Trading Card Game Online and Live
        codes to create any deck and go to the top right away. Buy yours and get
        Pokemon TCG Online and Live Cards in any Country and any language!
      </Typography>
    </Box>
  );
};

export default Banner;
