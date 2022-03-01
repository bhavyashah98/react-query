import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { QueryClientProvider, QueryClient } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";

const PAGES = {
  HOME: "/home",
  STOCKS: "/stocks",
  REACT_QUERY_STOCKS: "/reactQueryStocks",
};

const pages = [PAGES.HOME, PAGES.STOCKS, PAGES.REACT_QUERY_STOCKS];

const reactQueryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link href={page} key={page} passHref>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ my: 2, mx: 2, color: "white", display: "block" }}
                  >
                    {page.substring(1)}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
