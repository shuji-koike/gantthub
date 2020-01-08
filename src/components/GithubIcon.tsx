import React from "react";
import Octicon, {
  IssueOpened,
  IssueClosed,
  GitPullRequest,
  GitMerge,
  Milestone,
  Question
} from "@primer/octicons-react";
import {
  GetMilestones_repository_milestones_nodes,
  GetMilestones_repository_milestones_nodes_issues_nodes,
  GetMilestones_repository_milestones_nodes_pullRequests_nodes
} from "../types/GetMilestones";

type IssueLike =
  | GetMilestones_repository_milestones_nodes
  | GetMilestones_repository_milestones_nodes_issues_nodes
  | GetMilestones_repository_milestones_nodes_pullRequests_nodes;

export const GithubIcon: React.FC<{
  issue: IssueLike;
}> = function({ issue }) {
  return (
    <span style={{ color: color(issue) }}>
      <Octicon icon={icon(issue)} />
    </span>
  );
};

function icon(e: IssueLike) {
  if (e.__typename === "Milestone") {
    return Milestone;
  } else if (e.__typename === "Issue") {
    return e.closed ? IssueClosed : IssueOpened;
  } else if (e.__typename === "PullRequest") {
    return e.closed ? GitPullRequest : GitMerge;
  }
  return Question;
}

function color(e: IssueLike) {
  if (e.__typename === "Issue") {
    return e.closed ? "#cb2431" : "#28a745";
  } else if (e.__typename === "PullRequest") {
    return e.closed ? "#6f42c1" : "#28a745";
  }
  return "#000";
}
