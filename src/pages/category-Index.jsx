import NavbarBreadcrumb from "@/components/NavbarBreadcrumb";
import { categories } from "@/data/products";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import React from "react";

const CategoryIndex = () => {
  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-4/5 lg:w-4/5 mx-auto">
        <NavbarBreadcrumb />
        <Typography className="text-3xl font-semibold mt-5 mb-2">
          STORE - CATEGORY INDEX
        </Typography>
        <Box className="mb-7">
          <Divider className="relative" />
          <Divider className="absolute bg-black w-[5%]" />
        </Box>

        {/* Mocking Cats */}
        <Box className="pl-3">
          <List className="font-sans text-sm cursor-pointer text-gray-700">
            {categories.map((cat, i) => (
              <ListItem className="hover:underline">{cat}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryIndex;
