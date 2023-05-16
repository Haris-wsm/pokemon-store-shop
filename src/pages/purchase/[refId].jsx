import TableAll from "@/components/Code/TableAll";
import ApiReq from "@/utils/axios";
import { Box, Typography } from "@mui/material";
import React from "react";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utcOffset from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utcOffset);
dayjs.extend(timezone);
dayjs.extend(duration);

// Set the timezone to Bangkok
dayjs.tz.setDefault("Asia/Bangkok");

export async function getServerSideProps(context) {
  const { refId } = context.query;

  const response = await ApiReq.get(`/api/orders/${refId}`);

  const error = response.data.ok ? false : response.data.message;

  const data = response.data.data;

  if (!data.sucesss) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Get the current date and time in Bangkok time zone
  const now = dayjs();

  // Get a date 30 days ago from the current date and time
  const thirtyDaysAgo = now.subtract(30, "day");

  // Get the createdAt date and time from your database or elsewhere
  const createdAt = dayjs(data.createdAt);

  const duration = dayjs.duration(now.diff(createdAt));

  // Check Expired 30 days
  if (duration.asDays() > 30) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order: response.data.data,
    },
  };
}

const PurchaseCodes = (props) => {
  const order = props.order;
  const products = order.products;

  const getExpiredDate = (date) => {
    // add 30 days to createdAt and set timezone to Bangkok
    const expirationDate = dayjs(date).utc().add(30, "day").tz("Asia/Bangkok");

    // format the expirationDate as dd/mm/yyyy
    const formattedExpirationDate = expirationDate.format("DD/MM/YYYY");

    return formattedExpirationDate;
  };

  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-[90%] lg:w-4/5 mx-auto px-5 md:px-0 font-sans">
        <Box className="py-10 text-center">
          <Typography className="text-xl">
            Order number {order.ref_no}
          </Typography>
          <Box className="flex gap-5 justify-center items-center my-1">
            <Typography className="text-sm">ลิงค์นี้จะหมดอายุภายใน</Typography>
            <Typography className="text-sm">
              {getExpiredDate(order.createdAt)}
            </Typography>
          </Box>
          <TableAll products={products} />
        </Box>
      </Box>
    </Box>
  );
};

export default PurchaseCodes;
