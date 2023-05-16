import { useCart } from "@/atom/cartState";
import CartList from "@/components/Cart/CartList";
import EmptyCart from "@/components/Cart/EmptyCart";
import PageLayout from "@/components/Layouts/PageLayout";
import { Box } from "@mui/material";
import React from "react";

const EMPTY = false;

const ViewCart = () => {
  const [cart, _] = useCart();

  return (
    <PageLayout title="ตะกร้าสินค้า">
      <Box className="pb-10">
        {cart.length === 0 ? <EmptyCart /> : <CartList />}
      </Box>
    </PageLayout>
  );
};

export default ViewCart;
