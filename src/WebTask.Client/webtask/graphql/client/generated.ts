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
  DateTime: { input: unknown; output: unknown; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type CreateTaskDtoInput = {
  assignedToUserId?: InputMaybe<Scalars['Int']['input']>;
  categoryId: Scalars['Int']['input'];
  createdByUserId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  status: WebTaskStatus;
  title: Scalars['String']['input'];
};

export type CreateUserDtoInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  createTask: TaskDto;
  login: Scalars['Boolean']['output'];
  registerUser: UserDto;
};


export type MutationCreateTaskArgs = {
  taskDto: CreateTaskDtoInput;
};


export type MutationLoginArgs = {
  username: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  createUserDto: CreateUserDtoInput;
};

export type Query = {
  __typename: 'Query';
  secondVersion: Scalars['Int']['output'];
  taskById: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
};


export type QueryTaskByIdArgs = {
  id: Scalars['Int']['input'];
};

export type TaskDto = {
  __typename: 'TaskDto';
  assignedToUserId: Maybe<Scalars['Int']['output']>;
  categoryId: Scalars['Int']['output'];
  createdByUserId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  dueDate: Maybe<Scalars['DateTime']['output']>;
  projectId: Maybe<Scalars['Int']['output']>;
  status: WebTaskStatus;
  title: Scalars['String']['output'];
  userTaskId: Scalars['Int']['output'];
};

export type UserDto = {
  __typename: 'UserDto';
  email: Scalars['String']['output'];
};

export enum WebTaskStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Unclaimed = 'UNCLAIMED'
}

export type CreateTaskMutationVariables = Exact<{
  taskDto: CreateTaskDtoInput;
}>;


export type CreateTaskMutation = { createTask: { __typename: 'TaskDto', title: string, description: string, categoryId: number, status: WebTaskStatus, createdByUserId: number, assignedToUserId: number | null, userTaskId: number } };

export type GetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataQuery = { version: number, secondVersion: number };


export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskDtoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToUserId"}},{"kind":"Field","name":{"kind":"Name","value":"userTaskId"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const GetDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"secondVersion"}}]}}]} as unknown as DocumentNode<GetDataQuery, GetDataQueryVariables>;