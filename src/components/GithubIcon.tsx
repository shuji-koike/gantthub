import {
  IssueOpenedIcon,
  IssueClosedIcon,
  LockIcon,
  RepoIcon,
  RepoForkedIcon,
  GitPullRequestIcon,
  GitMergeIcon,
  MilestoneIcon,
  PersonIcon,
  OrganizationIcon,
  QuestionIcon,
} from "@primer/octicons-react";
import React from "react";
import styled from "styled-components";
import { GithubFragment } from ".";

// https://primer.style/octicons/

export const GithubIcon: React.FC<{
  frag: GithubFragment | null;
}> = ({ frag }) =>
  frag && (
    <StyledGithubIcon style={{ color: color(frag) }}>
      {renderIcon(icon(frag))}
    </StyledGithubIcon>
  );

const StyledGithubIcon = styled.span`
  & + * {
    margin-left: 0.25rem;
  }
`;

function icon(frag: GithubFragment) {
  switch (frag.__typename) {
    case "Issue":
      return frag.closed ? IssueClosedIcon : IssueOpenedIcon;
    case "PullRequest":
      return frag.closed ? GitMergeIcon : GitPullRequestIcon;
    case "User":
      return PersonIcon;
    case "Repository":
      if (frag.isFork) return RepoForkedIcon;
      if (frag.isPrivate) return LockIcon;
      return RepoIcon;
    case "Milestone":
      return MilestoneIcon;
    case "Organization":
      return OrganizationIcon;
    default:
      return QuestionIcon;
  }
}

function renderIcon(Icon: React.FC) {
  return <Icon />;
}

function color(frag: GithubFragment, defaultClolor: string = "#000") {
  switch (frag.__typename) {
    case "Issue":
      return frag.closed ? "#cb2431" : "#28a745";
    case "PullRequest":
      return frag.closed ? "#6f42c1" : frag.isDraft ? "#ffa500" : "#28a745";
    default:
      return defaultClolor;
  }
}
