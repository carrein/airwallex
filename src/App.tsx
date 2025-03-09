import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { ThemeProvider } from "styled-components";
import { Home } from "./Home";
import { GlobalStyles } from "./styles/globalStyles";
import { theme } from "./styles/theme";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyles />
      <StrictMode>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Home />
          </QueryClientProvider>
        </ThemeProvider>
      </StrictMode>
    </>
  );
};
