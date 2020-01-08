/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentAssignees
// ====================================================

export interface FragmentAssignees_assignees_nodes {
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

export interface FragmentAssignees_assignees {
  readonly __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(FragmentAssignees_assignees_nodes | null)> | null;
}

export interface FragmentAssignees {
  readonly __typename: "Issue" | "PullRequest";
  /**
   * A list of Users assigned to this object.
   */
  readonly assignees: FragmentAssignees_assignees;
}
