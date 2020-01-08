/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRepositoryPile
// ====================================================

export interface GetRepositoryPile_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface GetRepositoryPile_repository_collaborators_nodes_issues_pageInfo {
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

export interface GetRepositoryPile_repository_collaborators_nodes_issues_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface GetRepositoryPile_repository_collaborators_nodes_issues_nodes_repository {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The User owner of the repository.
   */
  readonly owner: GetRepositoryPile_repository_collaborators_nodes_issues_nodes_repository_owner;
}

export interface GetRepositoryPile_repository_collaborators_nodes_issues_nodes {
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
  readonly repository: GetRepositoryPile_repository_collaborators_nodes_issues_nodes_repository;
  /**
   * Identifies the issue title.
   */
  readonly title: string;
}

export interface GetRepositoryPile_repository_collaborators_nodes_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GetRepositoryPile_repository_collaborators_nodes_issues_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetRepositoryPile_repository_collaborators_nodes_issues_nodes | null)> | null;
}

export interface GetRepositoryPile_repository_collaborators_nodes_pullRequests_pageInfo {
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

export interface GetRepositoryPile_repository_collaborators_nodes_pullRequests_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface GetRepositoryPile_repository_collaborators_nodes_pullRequests_nodes_repository {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The User owner of the repository.
   */
  readonly owner: GetRepositoryPile_repository_collaborators_nodes_pullRequests_nodes_repository_owner;
}

export interface GetRepositoryPile_repository_collaborators_nodes_pullRequests_nodes {
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
  readonly repository: GetRepositoryPile_repository_collaborators_nodes_pullRequests_nodes_repository;
  /**
   * Identifies the pull request title.
   */
  readonly title: string;
}

export interface GetRepositoryPile_repository_collaborators_nodes_pullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GetRepositoryPile_repository_collaborators_nodes_pullRequests_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetRepositoryPile_repository_collaborators_nodes_pullRequests_nodes | null)> | null;
}

export interface GetRepositoryPile_repository_collaborators_nodes {
  readonly __typename: "User";
  /**
   * The username used to login.
   */
  readonly login: string;
  /**
   * A list of issues associated with this user.
   */
  readonly issues: GetRepositoryPile_repository_collaborators_nodes_issues;
  /**
   * A list of pull requests associated with this user.
   */
  readonly pullRequests: GetRepositoryPile_repository_collaborators_nodes_pullRequests;
}

export interface GetRepositoryPile_repository_collaborators {
  readonly __typename: "RepositoryCollaboratorConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetRepositoryPile_repository_collaborators_nodes | null)> | null;
}

export interface GetRepositoryPile_repository {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The User owner of the repository.
   */
  readonly owner: GetRepositoryPile_repository_owner;
  /**
   * A list of collaborators associated with the repository.
   */
  readonly collaborators: GetRepositoryPile_repository_collaborators | null;
}

export interface GetRepositoryPile {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  readonly repository: GetRepositoryPile_repository | null;
}

export interface GetRepositoryPileVariables {
  readonly owner: string;
  readonly name: string;
  readonly limit?: number | null;
  readonly after?: string | null;
}
