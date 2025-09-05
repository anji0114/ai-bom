"use client";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/graphql/client";
import { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
