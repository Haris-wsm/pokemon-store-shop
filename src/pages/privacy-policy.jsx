import PageLayout from "@/components/Layouts/PageLayout";
import ApiReq from "@/utils/axios";
import { Box, Typography } from "@mui/material";
import React from "react";

export async function getServerSideProps() {
  const resposne = await ApiReq.get("/api/website/privacy-policy");

  const error = resposne.data.ok ? false : resposne.data.message;

  return { props: { error, content: resposne.data.data } };
}

const PrivacyPolicy = (props) => {
  return (
    <PageLayout title="PRIVACY POLICY">
      <Box className="pb-5 min-h-[500px]">
        <Box className="font-[Prompt] space-y-3 text-slate-700 px-3">
          <div dangerouslySetInnerHTML={{ __html: props?.content?.raw_html }} />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default PrivacyPolicy;
