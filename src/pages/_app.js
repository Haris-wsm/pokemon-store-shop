import "@/styles/globals.css";
import theme from "@/utils/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import MainLayout from "@/components/Layouts/MainLayout";

// Carousel
import "react-multi-carousel/lib/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
