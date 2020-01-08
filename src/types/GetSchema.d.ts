/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { __TypeKind } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSchema
// ====================================================

export interface GetSchema___schema_types_possibleTypes {
  readonly __typename: "__Type";
  readonly name: string | null;
}

export interface GetSchema___schema_types {
  readonly __typename: "__Type";
  readonly kind: __TypeKind;
  readonly name: string | null;
  readonly possibleTypes: ReadonlyArray<GetSchema___schema_types_possibleTypes> | null;
}

export interface GetSchema___schema {
  readonly __typename: "__Schema";
  /**
   * A list of all types supported by this server.
   */
  readonly types: ReadonlyArray<GetSchema___schema_types>;
}

export interface GetSchema {
  readonly __schema: GetSchema___schema;
}
