import GetMilestones from "../types/GetMilestones";
import { GithubItemFragmentIssue } from "../types/GithubItemFragmentIssue";
import { GithubItemFragmentOrganization } from "../types/GithubItemFragmentOrganization";
import { GithubItemFragmentPullRequest } from "../types/GithubItemFragmentPullRequest";
import { GithubItemFragmentRepository } from "../types/GithubItemFragmentRepository";
import { GithubItemFragmentUser } from "../types/GithubItemFragmentUser";
import UserPile from "../types/UserPile";

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
  nodes: ReadonlyArray<T | null> | null;
}

export interface HasNextFragment {
  pageInfo: {
    hasNextPage: boolean;
  };
}
