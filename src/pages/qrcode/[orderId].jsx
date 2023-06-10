import { usePayment } from "@/atom/paymentState";
import CountdownTimer from "@/components/CountdownTimer ";
import PageLayout from "@/components/Layouts/PageLayout";
import socketInit from "@/socket";
import ApiReq from "@/utils/axios";
import { Box, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Bangkok");

export async function getServerSideProps(context) {
  const { orderId } = context.query;

  if (!orderId) {
    return {
      redirect: {
        destination: "/",
        permanent: false, // Set to true if it's a permanent redirect
      },
    };
  }

  const session = await getSession(context);
  let profile = { profile: null };

  if (session) {
    try {
      const response = await ApiReq.get("/api/auth/user-profile", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const resData = response.data.data;

      profile = { profile: resData };
    } catch (error) {
      profile = { profile: null };
    }
  }

  const response = await ApiReq.get(`/api/orders/${orderId}`);

  const data = response.data.data;

  if (Object.keys(data).length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false, // Set to true if it's a permanent redirect
      },
    };
  }

  if (data.sucesss) {
    return {
      redirect: {
        destination: "/",
        permanent: false, // Set to true if it's a permanent redirect
      },
    };
  }

  const options = {
    timeZone: "Asia/Bangkok",
    hour12: false,
  };

  const timeout = dayjs(data.timeout)
    .utcOffset(7 * 60)
    .toDate()
    .getTime();
  // const timeout = new Date(data.timeout).getTime();
  // const bangkokDate = new Date().toLocaleString("en-US", options);
  const now = dayjs().tz("Asia/Bangkok").toDate().getTime();

  return {
    props: {
      info: data,
      user: { ...profile },
      isTimeout: timeout < now || data.sucesss ? true : false,
    },
  };
}

const QrcodeScan = (props) => {
  const { info } = props;

  const router = useRouter();
  const [_, setPayment] = usePayment();

  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const socket = useRef(null);

  useEffect(() => {
    initSocketConnection();
  }, []);

  const initSocketConnection = () => {
    socket.current = socketInit();

    socket.current.on("connect", () => {
      socket.current.emit("store-client", { paymentId: router.query.orderId });
    });

    socket.current.on("payment-success", (data) => {
      setPayment({});

      if (props.user.profile) {
        router.replace("/my-codes");
      } else {
        router.replace("/");
      }

      toast.success("ชำระสินค้าสำเร็จ");
    });

    return () => {
      socket.current.off("payment-success");
      socket.current.close();
    };
  };

  return (
    <PageLayout title="ชำระสินค้า">
      <Box className="mx-auto w-4/5 px-5 py-10 mb-10">
        <Typography className="text-center text-xl text-slate-700">
          Scan ชำระสินค้า
        </Typography>
        <Typography className="text-center text-xs text-red-600">
          กรุณาชำระภายในระยะเวลาที่กำหนด
        </Typography>
        <CountdownTimer
          expiredTime={info.timeout}
          isExpired={props.isTimeout}
        />
        <Box className="flex justify-center items-center my-10">
          <Image
            src={getStaticURL(info.qrcode_image)}
            width={300}
            height={500}
            alt="qrcode_image"
            className="h-auto object-cover shadow-md hover:translate-y-[-5px] duration-500"
          />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default QrcodeScan;
