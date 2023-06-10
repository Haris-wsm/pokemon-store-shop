import { useCart } from "@/atom/cartState";
import { itemState, useItem, useItems } from "@/atom/items";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

const SummaryProduct = ({ handleSetTotal }) => {
  const [items, _] = useItems();
  const getTotal = useCallback(() => {
    const total = items.reduce((acc, item) => {
      const { price, qty, discount, sale } = item;

      if (!item.validItem) {
        return 0 + acc;
      }

      let toalPrice = 0;

      if (sale) {
        toalPrice = (Number(price) - Number(discount)) * Number(qty);
      } else {
        toalPrice = Number(price) * Number(qty);
      }

      return toalPrice + acc;
    }, 0);

    return total;
  }, [items]);

  useEffect(() => {
    handleSetTotal(getTotal());
  }, [items]);

  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const getPriceTag = useCallback((item) => {
    const { sale, price, discount } = item;

    if (sale) {
      return Number(price) - Number(discount);
    } else {
      return Number(price);
    }
  }, []);

  return (
    <>
      <Box className="flex justify-between">
        <Typography>รายการสินค้า</Typography>
        <Link href="/view-cart">
          <Typography className="text-xs text-slate-700 hover:underline">
            กลับไปยังตะกร้าสินค้า
          </Typography>
        </Link>
      </Box>
      <Box className="pt-5">
        {items.map((item, i) => (
          <Box key={i}>
            <Box className="flex justify-between">
              {/* Image and qty */}
              <Box className="relative mr-6">
                <Image
                  src={getStaticURL(item.image)}
                  alt="image-product"
                  width={50}
                  height={50}
                />
                <Box className="absolute bg-slate-700 w-[30px] h-[30px] flex justify-center items-center rounded-full text-white p-2 top-0 -right-5">
                  <Typography className="text-xs">{item.qty}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography className="text-slate-800 text-sm mb-2 px-1">
                  {item.name}
                </Typography>
                <Typography className="text-slate-800 text-sm font-semibold">
                  ฿{getPriceTag(item).toFixed(2)}
                </Typography>
              </Box>
              <Box>
                <Typography className="text-slate-800 text-sm font-semibold">
                  ฿{getPriceTag(item).toFixed(2) * item.qty}
                </Typography>
              </Box>
            </Box>
            <Divider className="my-2" />
          </Box>
        ))}
        <Box className="mt-10 text-slate-800 flex flex-col gap-2">
          <Box className=" flex justify-between gap-3">
            <Typography className="text-sm w-[220px] ">ยอดสินค้า</Typography>
            <Typography className="text-sm ">
              ฿{getTotal(items).toFixed(2)}
            </Typography>
          </Box>
          <Box className=" flex justify-between gap-3">
            <Typography className="text-sm w-[220px] ">ค่าจัดส่ง</Typography>
            <Typography className="text-sm ">฿0</Typography>
          </Box>
          <Box className=" flex justify-between gap-3">
            <Typography className="text-sm w-[220px] ">ภาษี</Typography>
            <Typography className="text-sm ">฿0</Typography>
          </Box>
        </Box>
        <Divider className="my-2" />

        <Box className="mt-5 flex justify-between ">
          <Typography className="text-slate-900 text-lg">
            ยอดรวมทั้งสิ้น
          </Typography>
          <Typography className="text-slate-900 text-lg">
            ฿{getTotal(items).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SummaryProduct;
