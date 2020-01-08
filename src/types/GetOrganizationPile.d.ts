/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizationPile
// ====================================================

export interface GetOrganizationPile_organization_repositories_nodes {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
}

export interface GetOrganizationPile_organization_repositories {
  readonly __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetOrganizationPile_organization_repositories_nodes | null)> | null;
}

export interface GetOrganizationPile_organization_membersWithRole_pageInfo {
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

export interface GetOrganizationPile_organization_membersWithRole_nodes_issues_pageInfo {
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

export interface GetOrganizationPile_organization_membersWithRole_nodes_issues_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface GetOrganizationPile_organization_membersWithRole_nodes_issues_nodes_repository {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The User owner of the repository.
   */
  readonly owner: GetOrganizationPile_organization_membersWithRole_nodes_issues_nodes_repository_owner;
}

export interface GetOrganizationPile_organization_membersWithRole_nodes_issues_nodes {
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
  readonly repository: GetOrganizationPile_organization_membersWithRole_nodes_issues_nodes_repository;
  /**
   * Identifies the issue title.
   */
  readonly title: string;
}

export interface GetOrganizationPile_organization_membersWithRole_nodes_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GetOrganizationPile_organization_membersWithRole_nodes_issues_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetOrganizationPile_organization_membersWithRole_nodes_issues_nodes | null)> | null;
}

export interface GetOrganizationPile_organization_membersWithRole_nodes_pullRequests_pageInfo {
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

export interface GetOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface GetOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes_repository {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The User owner of the repository.
   */
  readonly owner: GetOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes_repository_owner;
}

export interface GetOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes {
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
  readonly repository: GetOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes_repository;
  /**
   * Identifies the pull request title.
   */
  readonly title: string;
}

export interface GetOrganizationPile_organization_membersWithRole_nodes_pullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GetOrganizationPile_organization_membersWithRole_nodes_pullRequests_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes | null)> | null;
}

export interface GetOrganizationPile_organization_membersWithRole_nodes {
  readonly __typename: "User";
  /**
   * The username used to login.
   */
  readonly login: string;
  /**
   * A list of issues associated with this user.
   */
  readonly issues: GetOrganizationPile_organization_membersWithRole_nodes_issues;
  /**
   * A list of pull requests associated with this user.
   */
  readonly pullRequests: GetOrganizationPile_organization_membersWithRole_nodes_pullRequests;
}

export interface GetOrganizationPile_organization_membersWithRole {
  readonly __typename: "OrganizationMemberConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GetOrganizationPile_organization_membersWithRole_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetOrganizationPile_organization_membersWithRole_nodes | null)> | null;
}

export interface GetOrganizationPile_organization {
  readonly __typename: "Organization";
  /**
   * The organization's login name.
   */
  readonly login: string;
  /**
   * A list of repositories that the user owns.
   */
  readonly repositories: GetOrganizationPile_organization_repositories;
  /**
   * A list of users who are members of this organization.
   */
  readonly membersWithRole: GetOrganizationPile_organization_membersWithRole;
}

export interface GetOrganizationPile {
  /**
   * Lookup a organization by login.
   */
  readonly organization: GetOrganizationPile_organization | null;
}

export interface GetOrganizationPileVariables {
  readonly login: string;
  readonly limit?: number | null;
  readonly after?: string | null;
}
