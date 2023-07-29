import { Box } from "@mui/material";
import CouroselBanner from "@/components/CouroselBanner";
import Banner from "@/components/Home/Banner";
import ProductList from "@/components/Home/ProductList";
import BlogBanner from "@/components/Home/BlogBanner";
import ApiReq from "@/utils/axios";
import TagList from "@/components/TagList";

export async function getServerSideProps(context) {
  const resposnse = await ApiReq.get("/api/banner");
  const error = resposnse.data.ok ? false : resposnse.data.message;

  return { props: { error, banners: resposnse.data.data } };
}

export default function Home(props) {
  return (
    <Box className="container-wrapper">
      <CouroselBanner bannerList={props.banners} />
      <Box className="xs:w-[100%] md:w-full lg:w-4/5 mx-auto">
        <Banner />
        <ProductList />
      </Box>
      <BlogBanner />
      <TagList />
    </Box>
  );
}
