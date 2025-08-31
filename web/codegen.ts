import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/src/schema.gql",
  documents: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
  generates: {
    "src/gql/": {
      preset: "client",
    },
  },
  ignoreNoDocuments: true,
};

export default config;
