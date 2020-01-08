/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserPile
// ====================================================

export interface UserPile_issues_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  readonly endCursor: string | null;
}

export interface UserPile_issues_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface UserPile_issues_nodes_repository {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The User owner of the repository.
   */
  readonly owner: UserPile_issues_nodes_repository_owner;
}

export interface UserPile_issues_nodes {
  readonly __typename: "Issue";
  readonly id: string;
  /**
   * Identifies the issue number.
   */
  readonly number: number;
  /**
   * The HTTP URL for this issue
   */
  readonly url: any;
  /**
   * The repository associated with this node.
   */
  readonly repository: UserPile_issues_nodes_repository;
  /**
   * Identifies the issue title.
   */
  readonly title: string;
}

export interface UserPile_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: UserPile_issues_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(UserPile_issues_nodes | null)> | null;
}

export interface UserPile_pullRequests_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  readonly endCursor: string | null;
}

export interface UserPile_pullRequests_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface UserPile_pullRequests_nodes_repository {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The User owner of the repository.
   */
  readonly owner: UserPile_pullRequests_nodes_repository_owner;
}

export interface UserPile_pullRequests_nodes {
  readonly __typename: "PullRequest";
  readonly id: string;
  /**
   * Identifies the pull request number.
   */
  readonly number: number;
  /**
   * The HTTP URL for this pull request.
   */
  readonly url: any;
  /**
   * The repository associated with this node.
   */
  readonly repository: UserPile_pullRequests_nodes_repository;
  /**
   * Identifies the pull request title.
   */
  readonly title: string;
}

export interface UserPile_pullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: UserPile_pullRequests_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(UserPile_pullRequests_nodes | null)> | null;
}

export interface UserPile {
  readonly __typename: "User";
  /**
   * The username used to login.
   */
  readonly login: string;
  /**
   * A list of issues associated with this user.
   */
  readonly issues: UserPile_issues;
  /**
   * A list of pull requests associated with this user.
   */
  readonly pullRequests: UserPile_pullRequests;
}
