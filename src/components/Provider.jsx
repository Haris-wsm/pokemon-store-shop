import React from "react";
import theme from "@/utils/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { RecoilRoot } from "recoil";

const Provider = ({ children }) => {
  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </RecoilRoot>
  );
};

export default Provider;
