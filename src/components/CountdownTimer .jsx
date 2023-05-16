import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import duration from "dayjs/plugin/duration";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { usePayment } from "@/atom/paymentState";
import { toast } from "react-toastify";

dayjs.extend(duration);

const CountdownTimer = ({ expiredTime, isExpired }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [_, setPayment] = usePayment();

  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = dayjs();
      const diff = dayjs(expiredTime).diff(now);

      const duration = dayjs.duration(diff);

      const minutes = duration.minutes();
      const seconds = duration.seconds();
      setTimeLeft(`${minutes} นาที ${seconds} วินาที`);

      if (diff <= 0 || isExpired) {
        clearInterval(intervalId);
        setPayment({});
        toast.warn("หมดเวลาชำระเงิน");
        router.replace("/");
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [expiredTime]);

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
