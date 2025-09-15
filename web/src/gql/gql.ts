/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateVoicing($input: CreateVoicingInput!) {\n    createVoicing(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateVoicingDocument,
    "\n  fragment VoiceInfo on Voicing {\n    id\n    content\n    source\n    createdAt\n    summary\n    impactScore\n    tags {\n      id\n      name\n    }\n  }\n": typeof types.VoiceInfoFragmentDoc,
    "\n  fragment ProductFragment on Product {\n    id\n    name\n    description\n    content\n    createdAt\n    updatedAt\n    userId\n  }\n": typeof types.ProductFragmentFragmentDoc,
    "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      description\n      content\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateProductDocument,
    "\n  query Getme {\n    getMe {\n      ...Me\n    }\n  }\n": typeof types.GetmeDocument,
    "\n  fragment Me on User {\n    id\n  }\n": typeof types.MeFragmentDoc,
    "\n  query GetProducts {\n    getProducts {\n      data {\n        id\n        name\n        description\n        content\n        createdAt\n        updatedAt\n        userId\n      }\n      total\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
};
const documents: Documents = {
    "\n  mutation CreateVoicing($input: CreateVoicingInput!) {\n    createVoicing(input: $input) {\n      id\n    }\n  }\n": types.CreateVoicingDocument,
    "\n  fragment VoiceInfo on Voicing {\n    id\n    content\n    source\n    createdAt\n    summary\n    impactScore\n    tags {\n      id\n      name\n    }\n  }\n": types.VoiceInfoFragmentDoc,
    "\n  fragment ProductFragment on Product {\n    id\n    name\n    description\n    content\n    createdAt\n    updatedAt\n    userId\n  }\n": types.ProductFragmentFragmentDoc,
    "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      description\n      content\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateProductDocument,
    "\n  query Getme {\n    getMe {\n      ...Me\n    }\n  }\n": types.GetmeDocument,
    "\n  fragment Me on User {\n    id\n  }\n": types.MeFragmentDoc,
    "\n  query GetProducts {\n    getProducts {\n      data {\n        id\n        name\n        description\n        content\n        createdAt\n        updatedAt\n        userId\n      }\n      total\n    }\n  }\n": types.GetProductsDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateVoicing($input: CreateVoicingInput!) {\n    createVoicing(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateVoicing($input: CreateVoicingInput!) {\n    createVoicing(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment VoiceInfo on Voicing {\n    id\n    content\n    source\n    createdAt\n    summary\n    impactScore\n    tags {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment VoiceInfo on Voicing {\n    id\n    content\n    source\n    createdAt\n    summary\n    impactScore\n    tags {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductFragment on Product {\n    id\n    name\n    description\n    content\n    createdAt\n    updatedAt\n    userId\n  }\n"): (typeof documents)["\n  fragment ProductFragment on Product {\n    id\n    name\n    description\n    content\n    createdAt\n    updatedAt\n    userId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      description\n      content\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      description\n      content\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Getme {\n    getMe {\n      ...Me\n    }\n  }\n"): (typeof documents)["\n  query Getme {\n    getMe {\n      ...Me\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Me on User {\n    id\n  }\n"): (typeof documents)["\n  fragment Me on User {\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts {\n    getProducts {\n      data {\n        id\n        name\n        description\n        content\n        createdAt\n        updatedAt\n        userId\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query GetProducts {\n    getProducts {\n      data {\n        id\n        name\n        description\n        content\n        createdAt\n        updatedAt\n        userId\n      }\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;