import { apiUrl } from "@/constants/url";
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`,
  credentials: "include",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
