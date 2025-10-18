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
    "\n  fragment ItemFragment on Item {\n    id\n    name\n    kind\n    description\n    createdAt\n  }\n": typeof types.ItemFragmentFragmentDoc,
    "\n  fragment ItemListFragment on Item {\n    id\n    ...ItemFragment\n  }\n": typeof types.ItemListFragmentFragmentDoc,
    "\n  mutation CreateItem($input: CreateItemInput!) {\n    createItem(input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.CreateItemDocument,
    "\n  query GetItems {\n    getItems {\n      ...ItemListFragment\n    }\n  }\n": typeof types.GetItemsDocument,
    "\n  query Getme {\n    getMe {\n      ...Me\n    }\n  }\n": typeof types.GetmeDocument,
    "\n  fragment Me on AuthenticatedUser {\n    id\n    email\n    name\n    role\n    tenant {\n      id\n      name\n    }\n  }\n": typeof types.MeFragmentDoc,
};
const documents: Documents = {
    "\n  fragment ItemFragment on Item {\n    id\n    name\n    kind\n    description\n    createdAt\n  }\n": types.ItemFragmentFragmentDoc,
    "\n  fragment ItemListFragment on Item {\n    id\n    ...ItemFragment\n  }\n": types.ItemListFragmentFragmentDoc,
    "\n  mutation CreateItem($input: CreateItemInput!) {\n    createItem(input: $input) {\n      id\n      name\n    }\n  }\n": types.CreateItemDocument,
    "\n  query GetItems {\n    getItems {\n      ...ItemListFragment\n    }\n  }\n": types.GetItemsDocument,
    "\n  query Getme {\n    getMe {\n      ...Me\n    }\n  }\n": types.GetmeDocument,
    "\n  fragment Me on AuthenticatedUser {\n    id\n    email\n    name\n    role\n    tenant {\n      id\n      name\n    }\n  }\n": types.MeFragmentDoc,
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
export function graphql(source: "\n  fragment ItemFragment on Item {\n    id\n    name\n    kind\n    description\n    createdAt\n  }\n"): (typeof documents)["\n  fragment ItemFragment on Item {\n    id\n    name\n    kind\n    description\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ItemListFragment on Item {\n    id\n    ...ItemFragment\n  }\n"): (typeof documents)["\n  fragment ItemListFragment on Item {\n    id\n    ...ItemFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateItem($input: CreateItemInput!) {\n    createItem(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateItem($input: CreateItemInput!) {\n    createItem(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetItems {\n    getItems {\n      ...ItemListFragment\n    }\n  }\n"): (typeof documents)["\n  query GetItems {\n    getItems {\n      ...ItemListFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Getme {\n    getMe {\n      ...Me\n    }\n  }\n"): (typeof documents)["\n  query Getme {\n    getMe {\n      ...Me\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Me on AuthenticatedUser {\n    id\n    email\n    name\n    role\n    tenant {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment Me on AuthenticatedUser {\n    id\n    email\n    name\n    role\n    tenant {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;