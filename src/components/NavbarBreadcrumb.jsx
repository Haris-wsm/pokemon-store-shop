import { Breadcrumbs, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const NavbarBreadcrumb = () => {
  const router = useRouter();

  const capitalizedTitle = (title) => {
    const words = title.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  const generateBreadcrumbs = () => {
    const asPathWithoutQuery = router.asPath.split("?")[0];

    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      const title = subpath.includes("-")
        ? subpath.replaceAll("-", " ")
        : subpath;
      return { href, text: capitalizedTitle(title) };
    });

    return [{ href: "/", text: "Home" }, ...crumblist];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon />}
      aria-label="breadcrumb"
      className="py-3"
    >
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
      ))}
    </Breadcrumbs>
  );
};

function Crumb({ text, href, last = false }) {
  if (last) {
    return (
      <Typography className="text-gray-700 text-sm">
        {decodeURI(text)}
      </Typography>
    );
  }

  return (
    <Link underline="hover" className="text-gray-500 text-sm" href={href}>
      {text}
    </Link>
  );
}

export default NavbarBreadcrumb;
