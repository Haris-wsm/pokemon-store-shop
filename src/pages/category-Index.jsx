import PageLayout from "@/components/Layouts/PageLayout";
import ApiReq from "@/utils/axios";
import { Box, List, ListItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export async function getServerSideProps() {
  const resposne = await ApiReq.get("/api/categories");

  const error = resposne.data.ok ? false : resposne.data.message;

  return { props: { error, categories: resposne.data.data } };
}

const CategoryIndex = (props) => {
  const router = useRouter();

  const redirectTo = (url) => {
    router.push(url);
  };
  return (
    <PageLayout title="STORE - CATEGORY INDEX">
      <Box className="pl-3 pb-5 min-h-[500px]">
        <List className="font-sans text-sm cursor-pointer text-gray-700">
          {props.categories.map((category, i) => (
            <ListItem
              className="hover:underline"
              onClick={() => redirectTo(`/${category.name}`)}
            >
              {category.name}
            </ListItem>
          ))}
        </List>
      </Box>
    </PageLayout>
  );
};

export default CategoryIndex;
