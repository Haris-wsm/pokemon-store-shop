import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import "dayjs/locale/th";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { usePayment } from "@/atom/paymentState";
import { toast } from "react-toastify";

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Bangkok");

const CountdownTimer = ({ expiredTime, isExpired }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [_, setPayment] = usePayment();

  const router = useRouter();

  useEffect(() => {
    let expiredDateTime = dayjs(expiredTime)
      .utcOffset(7 * 60)
      .toDate();

    const intervalId = setInterval(() => {
      const now = dayjs().tz("Asia/Bangkok").toDate();

      const diff = dayjs(expiredDateTime).diff(now);

      const duration = dayjs.duration(diff);

      const minutes = duration.minutes();
      const seconds = duration.seconds();

      setTimeLeft(`${minutes} นาที ${seconds} วินาที`);

      if (now.getTime() > expiredDateTime.getTime() || isExpired) {
        clearInterval(intervalId);
        setPayment({});
        toast.warn("หมดเวลาชำระเงิน");
        toast.warn(`${now}`);
        router.replace("/");
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [expiredTime]);

  // useEffect(() => {
  //   window.dayjs = dayjs;
  //   const intervalId = setInterval(() => {
  //     const now = dayjs();
  //     const diff = dayjs(expiredTime).diff(now);

  //     const duration = dayjs.duration(diff);

  //     const minutes = duration.minutes();
  //     const seconds = duration.seconds();
  //     setTimeLeft(`${minutes} นาที ${seconds} วินาที`);

  //     if (diff <= 0 || isExpired) {
  //       clearInterval(intervalId);
  //       setPayment({});
  //       toast.warn("หมดเวลาชำระเงิน");
  //       router.replace("/");
  //     }
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, [expiredTime]);

  return (
    <>
      {timeLeft && (
        <Typography className="text-center my-2">
          เหลือเวลาอีก {timeLeft}
        </Typography>
      )}
    </>
  );
};

export default CountdownTimer;
