import GetMilestones from "../types/GetMilestones";
import { GithubItemFragmentOrganization } from "../types/GithubItemFragmentOrganization";
import { GithubItemFragmentRepository } from "../types/GithubItemFragmentRepository";
import UserPile from "../types/UserPile";
import { GithubItemFragmentIssue } from "./../types/GithubItemFragmentIssue.d";
import { GithubItemFragmentPullRequest } from "./../types/GithubItemFragmentPullRequest";
import { GithubItemFragmentUser } from "./../types/GithubItemFragmentUser";

export type GithubFragment =
  | GithubItemFragmentOrganization
  | GithubItemFragmentUser
  | GithubItemFragmentRepository
  | GithubItemFragmentIssue
  | GithubItemFragmentPullRequest
  | GetMilestones.GetMilestones_repository_milestones_nodes
  | GetMilestones.GetMilestones_repository_milestones_nodes_issues_nodes
  | GetMilestones.GetMilestones_repository_milestones_nodes_pullRequests_nodes
  | UserPile.UserPile_issues_nodes
  | UserPile.UserPile_pullRequests_nodes;

export interface GithubConnectionFragment<T = any> {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
  };
  nodes: ReadonlyArray<T> | null;
}

export interface HasNextFragment {
  pageInfo: {
    hasNextPage: boolean;
  };
}
