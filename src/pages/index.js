import { Box } from "@mui/material";
import CouroselBanner from "@/components/CouroselBanner";
import Banner from "@/components/Home/Banner";
import ProductList from "@/components/Home/ProductList";
import BlogBanner from "@/components/Home/BlogBanner";

export default function Home() {
  return (
    <Box className="container-wrapper">
      <CouroselBanner />
      <Box className="xs:w-[100%] md:w-full lg:w-4/5 mx-auto">
        <Banner />
        <ProductList />
      </Box>
      <BlogBanner />
    </Box>
  );
}
