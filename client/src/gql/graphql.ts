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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
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

export type CreateFileInput = {
  fileType: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['String']['input']>;
  itemId: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  s3Key: Scalars['String']['input'];
};

export type CreateItemInput = {
  attributes?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  kind: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime']['output'];
  fileType?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  itemId: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type GeneratePresignedUploadUrlInput = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['String']['input']>;
  itemId: Scalars['String']['input'];
};

export type Item = {
  __typename?: 'Item';
  attributes?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  files: Array<File>;
  id: Scalars['ID']['output'];
  kind: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  tenantId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFile: File;
  createItem: Item;
  generatePresignedUploadUrl: PresignedUploadUrlOutput;
};


export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationGeneratePresignedUploadUrlArgs = {
  input: GeneratePresignedUploadUrlInput;
};

export type PresignedUploadUrlOutput = {
  __typename?: 'PresignedUploadUrlOutput';
  presignedUrl: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getItem: Item;
  getItems: Array<Item>;
  getMe: AuthenticatedUser;
};


export type QueryGetItemArgs = {
  id: Scalars['String']['input'];
};

export type Tenant = {
  __typename?: 'Tenant';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ItemFragmentFragment = { __typename?: 'Item', id: string, name: string, kind: string, description?: string | null, createdAt: any } & { ' $fragmentName'?: 'ItemFragmentFragment' };

export type ItemListFragmentFragment = (
  { __typename?: 'Item', id: string }
  & { ' $fragmentRefs'?: { 'ItemFragmentFragment': ItemFragmentFragment } }
) & { ' $fragmentName'?: 'ItemListFragmentFragment' };

export type CreateItemMutationVariables = Exact<{
  input: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: string, name: string } };

export type GeneratePresignedUploadUrlMutationVariables = Exact<{
  input: GeneratePresignedUploadUrlInput;
}>;


export type GeneratePresignedUploadUrlMutation = { __typename?: 'Mutation', generatePresignedUploadUrl: { __typename?: 'PresignedUploadUrlOutput', presignedUrl: string, s3Key: string } };

export type CreateItemFileMutationVariables = Exact<{
  input: CreateFileInput;
}>;


export type CreateItemFileMutation = { __typename?: 'Mutation', createFile: { __typename?: 'File', id: string, itemId: string, s3Key: string, name: string, fileType?: string | null, folderId?: string | null, metadata?: any | null } };

export type GetItemQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetItemQuery = { __typename?: 'Query', getItem: { __typename?: 'Item', id: string, name: string, kind: string, description?: string | null, createdAt: any } };

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = { __typename?: 'Query', getItems: Array<(
    { __typename?: 'Item' }
    & { ' $fragmentRefs'?: { 'ItemListFragmentFragment': ItemListFragmentFragment } }
  )> };

export type GetmeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetmeQuery = { __typename?: 'Query', getMe: (
    { __typename?: 'AuthenticatedUser' }
    & { ' $fragmentRefs'?: { 'MeFragment': MeFragment } }
  ) };

export type MeFragment = { __typename?: 'AuthenticatedUser', id: string, email: string, name: string, role: string, tenant: { __typename?: 'Tenant', id: string, name: string } } & { ' $fragmentName'?: 'MeFragment' };

export const ItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ItemFragmentFragment, unknown>;
export const ItemListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ItemListFragmentFragment, unknown>;
export const MeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticatedUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"tenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MeFragment, unknown>;
export const CreateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateItemMutation, CreateItemMutationVariables>;
export const GeneratePresignedUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GeneratePresignedUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeneratePresignedUploadUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePresignedUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"s3Key"}}]}}]}}]} as unknown as DocumentNode<GeneratePresignedUploadUrlMutation, GeneratePresignedUploadUrlMutationVariables>;
export const CreateItemFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateItemFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"s3Key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"folderId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]}}]} as unknown as DocumentNode<CreateItemFileMutation, CreateItemFileMutationVariables>;
export const GetItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetItemQuery, GetItemQueryVariables>;
export const GetItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFragment"}}]}}]} as unknown as DocumentNode<GetItemsQuery, GetItemsQueryVariables>;
export const GetmeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Getme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticatedUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"tenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetmeQuery, GetmeQueryVariables>;