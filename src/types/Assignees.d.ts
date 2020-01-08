/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Assignees
// ====================================================

export interface Assignees_assignees_nodes {
  readonly __typename: "User";
  /**
   * A URL pointing to the user's public avatar.
   */
  readonly avatarUrl: any;
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface Assignees_assignees {
  readonly __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(Assignees_assignees_nodes | null)> | null;
}

export interface Assignees {
  readonly __typename: "Issue" | "PullRequest";
  /**
   * A list of Users assigned to this object.
   */
  readonly assignees: Assignees_assignees;
}
