"use client";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/graphql/client";
import { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "@/lib/theme";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
