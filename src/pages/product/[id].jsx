import CouroselProduct from "@/components/CouroselProduct";
import ApiReq from "@/utils/axios";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ProductIncBtn from "@/components/Home/ProductIncBtn";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { useCart } from "@/atom/cartState";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const response = await ApiReq.get(`/api/products/${id}`);

  const error = response.data.ok ? false : response.data.message;

  return { props: { error, product: response.data.data } };
}

const Product = (props) => {
  const getStaticURL = (url) => process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url;

  const product = props.product;

  console.log(product);

  const isAvailable = (data) =>
    data.status === "in-stock" && (data.stock > 0 || data.unused > 0)
      ? true
      : false;

  const getDiscoutPrice = (product) =>
    Number(product.price) - Number(product.discount);

  const getStatus = (product) => {
    if (product.status === "in-stock" && product.unused > 0) {
      return `${product.unused} In Stock.`;
    }

    return `Out Of Stock.`;
  };
  const [cartItem, setCartItem] = useCart();

  const [qty, setQty] = useState(1);
  const handleAddQuntity = (qty) => {
    setQty(qty);
  };

  const addToCart = () => {
    const existItem = cartItem.find((item) => item._id === product._id);

    if (existItem) {
      // const totalStock = product.unused - product.used;
      const totalStock = product.unused;
      const quantity = Number(existItem.qty) + Number(qty);

      if (quantity > totalStock) {
        toast.error("สินค้าเกินจำนวนจำกัด");
      } else {
        setCartItem(
          cartItem.map((item) =>
            item._id === existItem._id ? { ...existItem, qty: quantity } : item
          )
        );
        toast.success("เพิ่มสินค้าใส่ตะกร้าสำเร็จ");
      }
    } else {
      setCartItem((prev) => [...prev, { _id: product._id, qty: qty }]);
      toast.success("เพิ่มสินค้าใส่ตะกร้าสำเร็จ");
    }
  };

  return (
    <Box className="container-wrapper">
      <Box className="xs:w-[100%] md:w-[90%] lg:w-4/5 mx-auto px-5 md:px-0">
        <Grid container spacing={3} className="my-10">
          <Grid item xs={12} sm={12} md={6}>
            <Box className="min-w-[100%] flex md:block justify-center mb-5">
              <Image
                width={300}
                height={455}
                src={getStaticURL(product.image)}
                alt="Image-product"
                className=" h-[auto] pointer-events-none"
              />
            </Box>
            <Box>
              <CouroselProduct gallery={product.gallery} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <Typography className="text-slate-800 text-xl md:text-3xl text-center md:text-left font-semibold">
                {product.name}
              </Typography>
              {product.sale === true ? (
                <Box className="flex gap-3 items-center mt-2">
                  <Typography className="text-green-700 text-lg">
                    ลดราคา:
                  </Typography>
                  <Typography
                    className={clsx({
                      ["text-center font-semibold"]: true,
                      ["line-through text-slate-700"]: product.sale,
                      // ["text-blue-500"]: !product.sale,
                    })}
                  >
                    ฿{product.price}
                  </Typography>
                  <Typography className="text-blue-500 font-semibold">
                    ฿{getDiscoutPrice(product).toFixed(2)}
                  </Typography>
                </Box>
              ) : (
                <Box className="flex gap-3 items-center mt-2">
                  <Typography className="text-green-700 text-lg">
                    ราคา:
                  </Typography>
                  <Typography className="text-blue-500 font-semibold">
                    ฿{product.price}
                  </Typography>
                </Box>
              )}

              <Box className="my-2 flex items-center gap-3">
                <Typography className="text-xs text-slate-700 font-semibold ">
                  สถานะ:
                </Typography>
                <Typography
                  className={clsx({
                    ["text-xs "]: true,
                    ["text-red-500"]: product.unused <= 0,
                    ["text-slate-700"]: product.unused > 0,
                  })}
                >
                  {getStatus(product)}
                </Typography>
              </Box>

              <Box className="flex gap-3 items-center my-10">
                <Typography className="text-slate-600 text-xs font-semibold">
                  จำนวน
                </Typography>
                <ProductIncBtn
                  {...product}
                  handleAddQuntity={handleAddQuntity}
                  stock={product.unused}
                />

                <Button
                  variant="contained"
                  className="bg-gray-500 text-white text-xs md:text-sm  rounded-lg hover:bg-gray-700 flex items-center"
                  disabled={!isAvailable(product)}
                  onClick={addToCart}
                >
                  เพิ่มใส่ตะกร้า
                </Button>
              </Box>

              <Box className="bg-gray-200 py-5 px-4 rounded-sm my-10 text-slate-600 border ">
                <EmailOutlinedIcon className="mr-2" fontSize="small" />
                <Typography className="text-xs inline-block">
                  คุณจะได้รับรหัส code ผ่านทางอีเมลหลังจากทำการชำระ
                </Typography>

                <Box>
                  <WarningAmberOutlinedIcon className="mr-2" fontSize="small" />
                  <Typography className="text-xs inline-block">
                    บางครั้งอีเมลที่มีรหัส code
                    จะถูกส่งไปยังโฟลเดอร์สแปมหรือโปรโมชัน!
                  </Typography>
                </Box>
                <Box className="mt-5">
                  <Typography className="text-xs inline-block">
                    หากคุณมีปัญหาใด ๆ เกี่ยวกับรหัสโปเกมอน โปรดติดต่อเราได้ที่:
                  </Typography>
                </Box>
                <Box className="">
                  <Link href="/contact-us">
                    <Typography className="text-xs inline-block font-semibold underline cursor-pointer">
                      contact us
                    </Typography>
                  </Link>
                </Box>
              </Box>

              <Box>
                <ScrollLink to="product-desc" smooth={true} duration={500}>
                  <Button
                    className="text-slate-800 text-xs border"
                    endIcon={<ArrowDownwardOutlinedIcon fontSize="small" />}
                  >
                    รายละเอียดสินค้า
                  </Button>
                </ScrollLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Box className="product-desc pt-10 pb-20 px-5 mb-10 ">
          <Typography className="text-sm text-slate-700">
            รายละเอียดสินค้า
          </Typography>
          <Box className="px-2">
            <div dangerouslySetInnerHTML={{ __html: product.desc }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
