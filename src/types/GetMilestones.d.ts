/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMilestones
// ====================================================

export interface GetMilestones_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface GetMilestones_repository_milestones_nodes_creator {
  readonly __typename: "EnterpriseUserAccount" | "Organization" | "User" | "Mannequin" | "Bot";
  /**
   * The username of the actor.
   */
  readonly login: string;
}

export interface GetMilestones_repository_milestones_nodes_issues_nodes_assignees_nodes {
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

export interface GetMilestones_repository_milestones_nodes_issues_nodes_assignees {
  readonly __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetMilestones_repository_milestones_nodes_issues_nodes_assignees_nodes | null)> | null;
}

export interface GetMilestones_repository_milestones_nodes_issues_nodes_labels_nodes {
  readonly __typename: "Label";
  /**
   * Identifies the label name.
   */
  readonly name: string;
  /**
   * Identifies the label color.
   */
  readonly color: string;
}

export interface GetMilestones_repository_milestones_nodes_issues_nodes_labels {
  readonly __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetMilestones_repository_milestones_nodes_issues_nodes_labels_nodes | null)> | null;
}

export interface GetMilestones_repository_milestones_nodes_issues_nodes {
  readonly __typename: "Issue";
  /**
   * Identifies the issue number.
   */
  readonly number: number;
  /**
   * The HTTP URL for this issue
   */
  readonly url: any;
  /**
   * Identifies the issue title.
   */
  readonly title: string;
  /**
   * Identifies the body of the issue.
   */
  readonly body: string;
  /**
   * Identifies the date and time when the object was created.
   */
  readonly createdAt: any;
  /**
   * Identifies the date and time when the object was closed.
   */
  readonly closedAt: any | null;
  /**
   * `true` if the object is closed (definition of closed may depend on type)
   */
  readonly closed: boolean;
  /**
   * A list of Users assigned to this object.
   */
  readonly assignees: GetMilestones_repository_milestones_nodes_issues_nodes_assignees;
  /**
   * A list of labels associated with the object.
   */
  readonly labels: GetMilestones_repository_milestones_nodes_issues_nodes_labels | null;
}

export interface GetMilestones_repository_milestones_nodes_issues {
  readonly __typename: "IssueConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetMilestones_repository_milestones_nodes_issues_nodes | null)> | null;
}

export interface GetMilestones_repository_milestones_nodes_pullRequests_nodes_assignees_nodes {
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

export interface GetMilestones_repository_milestones_nodes_pullRequests_nodes_assignees {
  readonly __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetMilestones_repository_milestones_nodes_pullRequests_nodes_assignees_nodes | null)> | null;
}

export interface GetMilestones_repository_milestones_nodes_pullRequests_nodes_labels_nodes {
  readonly __typename: "Label";
  /**
   * Identifies the label name.
   */
  readonly name: string;
  /**
   * Identifies the label color.
   */
  readonly color: string;
}

export interface GetMilestones_repository_milestones_nodes_pullRequests_nodes_labels {
  readonly __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetMilestones_repository_milestones_nodes_pullRequests_nodes_labels_nodes | null)> | null;
}

export interface GetMilestones_repository_milestones_nodes_pullRequests_nodes {
  readonly __typename: "PullRequest";
  /**
   * Identifies the pull request number.
   */
  readonly number: number;
  /**
   * The HTTP URL for this pull request.
   */
  readonly url: any;
  /**
   * Identifies the pull request title.
   */
  readonly title: string;
  /**
   * The body as Markdown.
   */
  readonly body: string;
  /**
   * Identifies the date and time when the object was created.
   */
  readonly createdAt: any;
  /**
   * Identifies the date and time when the object was closed.
   */
  readonly closedAt: any | null;
  /**
   * `true` if the pull request is closed
   */
  readonly closed: boolean;
  /**
   * A list of Users assigned to this object.
   */
  readonly assignees: GetMilestones_repository_milestones_nodes_pullRequests_nodes_assignees;
  /**
   * A list of labels associated with the object.
   */
  readonly labels: GetMilestones_repository_milestones_nodes_pullRequests_nodes_labels | null;
}

export interface GetMilestones_repository_milestones_nodes_pullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetMilestones_repository_milestones_nodes_pullRequests_nodes | null)> | null;
}

export interface GetMilestones_repository_milestones_nodes {
  readonly __typename: "Milestone";
  /**
   * Identifies the number of the milestone.
   */
  readonly number: number;
  /**
   * Identifies the title of the milestone.
   */
  readonly title: string;
  /**
   * The HTTP URL for this milestone
   */
  readonly url: any;
  /**
   * Identifies the date and time when the object was created.
   */
  readonly createdAt: any;
  /**
   * Identifies the due date of the milestone.
   */
  readonly dueOn: any | null;
  /**
   * Identifies the actor who created the milestone.
   */
  readonly creator: GetMilestones_repository_milestones_nodes_creator | null;
  /**
   * A list of issues associated with the milestone.
   */
  readonly issues: GetMilestones_repository_milestones_nodes_issues;
  /**
   * A list of pull requests associated with the milestone.
   */
  readonly pullRequests: GetMilestones_repository_milestones_nodes_pullRequests;
}

export interface GetMilestones_repository_milestones {
  readonly __typename: "MilestoneConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GetMilestones_repository_milestones_nodes | null)> | null;
}

export interface GetMilestones_repository {
  readonly __typename: "Repository";
  /**
   * Identifies the primary key from the database.
   */
  readonly databaseId: number | null;
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The User owner of the repository.
   */
  readonly owner: GetMilestones_repository_owner;
  /**
   * A list of milestones associated with the repository.
   */
  readonly milestones: GetMilestones_repository_milestones | null;
}

export interface GetMilestones_rateLimit {
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

export interface GetMilestones {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  readonly repository: GetMilestones_repository | null;
  /**
   * The client's rate limit information.
   */
  readonly rateLimit: GetMilestones_rateLimit | null;
}

export interface GetMilestonesVariables {
  readonly owner: string;
  readonly name: string;
}
