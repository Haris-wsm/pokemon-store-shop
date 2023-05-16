import React from "react";
import { Box, Typography } from "@mui/material";
import PageLayout from "@/components/Layouts/PageLayout";
import ApiReq from "@/utils/axios";

export async function getServerSideProps() {
  const resposne = await ApiReq.get("/api/website/aboutus");

  const error = resposne.data.ok ? false : resposne.data.message;

  return { props: { error, content: resposne.data.data } };
}

const AboutUs = (props) => {
  return (
    <PageLayout title="ABOUT US">
      <Box className="pb-5 min-h-[500px]">
        <Box className="font-[Prompt] space-y-3 text-slate-700 px-3">
          <div dangerouslySetInnerHTML={{ __html: props?.content?.raw_html }} />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default AboutUs;
