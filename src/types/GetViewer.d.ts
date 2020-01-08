/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetViewer
// ====================================================

export interface GetViewer_viewer_organizations_nodes_repositories_nodes {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The repository's name with owner.
   */
  readonly nameWithOwner: string;
}

export interface GetViewer_viewer_organizations_nodes_repositories {
  readonly __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetViewer_viewer_organizations_nodes_repositories_nodes | null)> | null;
}

export interface GetViewer_viewer_organizations_nodes {
  readonly __typename: "Organization";
  /**
   * The organization's login name.
   */
  readonly login: string;
  /**
   * A list of repositories that the user owns.
   */
  readonly repositories: GetViewer_viewer_organizations_nodes_repositories;
}

export interface GetViewer_viewer_organizations {
  readonly __typename: "OrganizationConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetViewer_viewer_organizations_nodes | null)> | null;
}

export interface GetViewer_viewer_repositories_nodes {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The repository's name with owner.
   */
  readonly nameWithOwner: string;
}

export interface GetViewer_viewer_repositories {
  readonly __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetViewer_viewer_repositories_nodes | null)> | null;
}

export interface GetViewer_viewer {
  readonly __typename: "User";
  /**
   * The username used to login.
   */
  readonly login: string;
  /**
   * A list of organizations the user belongs to.
   */
  readonly organizations: GetViewer_viewer_organizations;
  /**
   * A list of repositories that the user owns.
   */
  readonly repositories: GetViewer_viewer_repositories;
}

export interface GetViewer_rateLimit {
  readonly __typename: "RateLimit";
  /**
   * The maximum number of points the client is permitted to consume in a 60 minute window.
   */
  readonly limit: number;
  /**
   * The point cost for the current query counting against the rate limit.
   */
  readonly cost: number;
  /**
   * The number of points remaining in the current rate limit window.
   */
  readonly remaining: number;
  /**
   * The time at which the current rate limit window resets in UTC epoch seconds.
   */
  readonly resetAt: any;
}

export interface GetViewer {
  /**
   * The currently authenticated user.
   */
  readonly viewer: GetViewer_viewer;
  /**
   * The client's rate limit information.
   */
  readonly rateLimit: GetViewer_rateLimit | null;
}
