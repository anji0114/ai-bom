/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthenticatedUser = {
  __typename?: 'AuthenticatedUser';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isAuthenticated: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  tenant: Tenant;
};

export type Item = {
  __typename?: 'Item';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tenantId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getItems: Array<Item>;
  getMe: AuthenticatedUser;
};

export type Tenant = {
  __typename?: 'Tenant';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GetmeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetmeQuery = { __typename?: 'Query', getMe: (
    { __typename?: 'AuthenticatedUser' }
    & { ' $fragmentRefs'?: { 'MeFragment': MeFragment } }
  ) };

export type MeFragment = { __typename?: 'AuthenticatedUser', id: string, email: string, name: string, role: string, tenant: { __typename?: 'Tenant', id: string, name: string } } & { ' $fragmentName'?: 'MeFragment' };

export const MeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticatedUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"tenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MeFragment, unknown>;
export const GetmeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Getme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticatedUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"tenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetmeQuery, GetmeQueryVariables>;