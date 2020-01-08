import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { GetViewer } from "../types/GetViewer";
import { GithubItem, GithubItemFragment } from "./GithubItem";
import { PagerMore } from "./Pager";
import { PullRequestItem, PullRequestItemFragment } from "./PullRequestItem";
import { Repositories, RepositoriesFragment } from "./Repositories";

export const Home: React.FC = () => {
  const { data, loading, error } = useQuery<GetViewer>(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>data is null</p>;
  return (
    <StyledSection>
      <ul>
        <li>
          <GithubItem frag={data.viewer} />
          <Repositories frag={data.viewer.repositories} />
        </li>
        {data.viewer.organizations.nodes?.map(
          org =>
            org && (
              <li key={org.login}>
                <GithubItem frag={org} link={`/org/${org.login}/pile`} />
                <Repositories frag={org.repositories} />
              </li>
            )
        )}
        <li>
          <GithubItem frag={data.viewer} label="pr" />
          <ul>
            {data.viewer.pullRequests.nodes?.map(e => (
              <li key={e?.id}>
                <PullRequestItem frag={e!} />
              </li>
            ))}
            <li>
              <PagerMore frag={data.viewer.pullRequests} />
            </li>
          </ul>
          <GithubItem frag={data.viewer} label="issues" />
          <ul>
            {data.viewer.issues.nodes?.map(e => (
              <li key={e?.id}>
                <GithubItem frag={e} />
              </li>
            ))}
            <li>
              <PagerMore frag={data.viewer.issues} />
            </li>
          </ul>
        </li>
      </ul>
    </StyledSection>
  );
};

const query = gql`
  query GetViewer(
    $first: Int = 30
    $orderBy: RepositoryOrder = { field: UPDATED_AT, direction: DESC }
  ) {
    viewer {
      ...GithubItemFragmentUser
      issues(
        first: 10
        orderBy: { field: UPDATED_AT, direction: DESC }
        states: [OPEN]
      ) {
        totalCount
        pageInfo {
          hasNextPage
        }
        nodes {
          ...GithubItemFragmentIssue
        }
      }
      pullRequests(
        first: 10
        orderBy: { field: UPDATED_AT, direction: DESC }
        states: [OPEN]
      ) {
        totalCount
        pageInfo {
          hasNextPage
        }
        nodes {
          ...GithubItemFragmentPullRequest
          ...PullRequestFragment
        }
      }
      repositories(first: $first, orderBy: $orderBy) {
        ...RepositoriesFragmentConnection
      }
      organizations(first: $first) {
        nodes {
          ...GithubItemFragmentOrganization
          repositories(first: $first, orderBy: $orderBy) {
            ...RepositoriesFragmentConnection
          }
        }
      }
    }
  }
  ${GithubItemFragment.PullRequest}
  ${GithubItemFragment.Issue}
  ${GithubItemFragment.Organization}
  ${GithubItemFragment.User}
  ${PullRequestItemFragment}
  ${RepositoriesFragment}
`;

const StyledSection = styled.section`
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  li {
    max-width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  > ul > li {
    display: inline-block;
    margin-right: 2rem;
    vertical-align: top;
  }
  > ul > li > ul {
    margin-top: 0.4rem;
    padding-inline-start: 1em;
  }
  > ul > li > ul > li {
    margin-bottom: 0.2rem;
  }
`;
