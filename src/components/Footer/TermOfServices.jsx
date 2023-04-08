import { Grid, List, ListItem } from "@mui/material";
import Link from "next/link";
import React from "react";

const TermOfServices = () => {
  return (
    <Grid
      container
      spacing={2}
      className="font-sans text-gray-500 font-semibold"
    >
      <Grid item>
        <List className="cursor-pointer">
          <ListItem>Blog</ListItem>
          <Link href="/terms-of-service">
            <ListItem>Terms of Service</ListItem>
          </Link>
          <Link href="/category-Index">
            <ListItem>Category Index</ListItem>
          </Link>
        </List>
      </Grid>
      <Grid item>
        <List className="cursor-pointer">
          <Link href="/privacy-policy">
            <ListItem>Privacy Policy</ListItem>
          </Link>
          <ListItem>Product Index</ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default TermOfServices;
