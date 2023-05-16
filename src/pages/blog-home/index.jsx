import Blog from "@/components/Blog";
import BlogPostLayout from "@/components/Layouts/BlogPostLayout";
import PageLayout from "@/components/Layouts/PageLayout";
import CustomPagination from "@/components/Pagination";
import ApiReq from "@/utils/axios";
import { Box, Divider, Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export async function getServerSideProps(context) {
  const page = context.query.page || 1; // default to page 1 if not specified
  const limit = context.query.limit || 10; // default to 10 items per page if not specified
  const response = await ApiReq.get(
    `/api/blog/all?page=${page}&limit=${limit}`
  );

  const error = response.data.ok ? false : response.data.message;

  return {
    props: {
      error,
      blog: response.data.data.blogs,
      page,
      limit,
      total: response.data.data.total,
    },
  };
}

const BlogHome = (props) => {
  const totalPages = Math.ceil(props.total / props.limit);
  const currentPage = parseInt(props.page);

  // Router
  const router = useRouter();

  const handleChange = (event, value) => {
    const params = `?page=${value}&limit=${props.limit}`;

    router.replace(`/blog-home/${params}`);
  };

  return (
    <PageLayout title="Blog Home">
      <BlogPostLayout>
        {props.blog.map((blog, i) => {
          return (
            <Box key={i} className="px-2">
              <Blog {...blog} />
              {i !== props.blog - 1 && <Divider className="mb-5" />}
            </Box>
          );
        })}

        {totalPages > 1 && (
          <CustomPagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            handleChange={handleChange}
          />
        )}
      </BlogPostLayout>
    </PageLayout>
  );
};

export default BlogHome;
