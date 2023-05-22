import SummaryProduct from "@/components/Checkout/SummaryProduct";
import FormAddress from "@/components/Checkout/FormAddress";
import Form from "@/components/Checkout/FormEmail";
import PageLayout from "@/components/Layouts/PageLayout";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema as formSchema } from "@/utils/validation/checkout";
import { useRouter } from "next/router";
import ApiReq from "@/utils/axios";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useCart } from "@/atom/cartState";
import { usePayment } from "@/atom/paymentState";
import { useItems } from "@/atom/items";
import { getSession } from "next-auth/react";

const Checkout = (props) => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Recoil State
  const [cart, setCart] = useCart();
  const [items, setItems] = useItems();
  const [paymentInfo, setPaymentInfo] = usePayment();

  const [policy, setPolicy] = useState(false);
  const [accept, setAccept] = useState(false);

  const router = useRouter();

  const handleSetTotal = (val) => {
    setTotal(val);
  };

  // Forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(formSchema) });

  useEffect(() => {
    if (props.profile) {
      setValue("email", props.profile.email);
      setValue("confirmEmail", props.profile.email);
      setValue("name", props.profile.name);
      setValue("name", props.profile.name);
      setValue("lastname", props.profile.lastname);
    }
  }, [props]);

  const onSubmit = (data) => {
    const address = {
      name: data.name,
      lastname: data.lastname,
      address: "",
      city: "",
      province: "",
      amphoe: "",
      district: "",
    };

    const payload = {
      email: data.email,
      address,
    };
    handlePaymentInfo(payload);
  };

  const handlePaymentInfo = async (data) => {
    setLoading(true);
    try {
      // Check Item status
      await getApiCheckCart();

      // Payment info creation
      const payload = {
        amount: total,
        email: data.email,
        address: data.address,
        items: cart,
        ref_user: props?.profile?._id || undefined,
      };

      const paymentInfo = await postPaymentInfo(payload);
      setPaymentInfo(paymentInfo);
      setCart([]);
      setItems([]);

      router.replace(`/qrcode/${paymentInfo.ref_no}`);
    } catch (error) {
      console.log(error);
      router.push("/view-cart");
    }
  };

  const postPaymentInfo = async (data) => {
    const response = await ApiReq.post("/api/payment/info", data);

    return response.data.data;
  };

  const getApiCheckCart = async () => {
    const paylaod = { cart };
    const response = await ApiReq.post("/api/products/user-cart", paylaod);

    const product = response.data.data;
    const hasOutOfStock = product.some((prod) => prod.validItem === false);

    if (hasOutOfStock) {
      throw new Error();
    }
  };

  return (
    <PageLayout title="ชำระสินค้า">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8} className="px-0 md:px-5">
            <Form register={register} errors={errors} />
            <FormAddress
              register={register}
              errors={errors}
              setValue={setValue}
              policy={policy}
              setPolicy={setPolicy}
              accept={accept}
              setAccept={setAccept}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SummaryProduct handleSetTotal={handleSetTotal} />
          </Grid>
        </Grid>
        <Box className="my-10">
          <Button
            className="text-white bg-gray-700 hover:bg-gray-800 disabled:bg-gray-300"
            type="submit"
            startIcon={
              loading ? <AutorenewIcon className="animate-spin" /> : ""
            }
            disabled={loading || !policy || !accept ? true : false}
          >
            ยืนยัน
          </Button>
        </Box>
      </form>
    </PageLayout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let profile;

  if (session) {
    try {
      const response = await ApiReq.get("/api/auth/user-profile", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      profile = response.data.data;

      return {
        props: { profile: profile },
      };
    } catch (error) {
      return {
        props: { profile: null },
      };
    }
  }

  return {
    props: { profile: null },
  };
}

export default Checkout;
