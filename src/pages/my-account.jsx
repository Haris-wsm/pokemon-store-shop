import React from "react";
import Login from "@/components/Login";
import PageLayout from "@/components/Layouts/PageLayout";
import { withNoAuth } from "@/utils/auth";

const MyAccount = () => {
  return (
    <PageLayout title="MY ACCOUNT">
      <Login />
    </PageLayout>
  );
};

export const getServerSideProps = withNoAuth((context) => {
  return { props: {} };
});

export default MyAccount;
