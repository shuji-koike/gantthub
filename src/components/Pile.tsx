import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  GetOrganizationPile,
  GetOrganizationPileVariables,
} from "../types/GetOrganizationPile";
import {
  GetRepositoryPile,
  GetRepositoryPileVariables,
} from "../types/GetRepositoryPile";
import { GithubItemFragmentRepository } from "../types/GithubItemFragmentRepository";
import { UserPile } from "../types/UserPile";
import { GithubItem, GithubItemFragment } from "./GithubItem";
import { PagerMore, PagerUtil } from "./Pager";

export const RepositoryPile: React.FC = function () {
  const params = useParams<{ owner: string; name: string }>();
  const search = new URLSearchParams(useLocation().search);
  const variables = {
    ...params,
    limit: Number(search.get("limit")) || undefined,
  };
  const query = gql`
    query GetRepositoryPile(
      $owner: String!
      $name: String!
      $limit: Int = 20
      $after: String
    ) {
      repository(owner: $owner, name: $name) {
        ...GithubItemFragmentRepository
        owner {
          login
        }
        collaborators(first: $limit, after: $after) {
          nodes {
            ...UserPile
          }
        }
      }
    }
    ${GithubItemFragment.Repository}
    ${fragments}
  `;
  const { data, loading, error } = useQuery<
    GetRepositoryPile,
    GetRepositoryPileVariables
  >(query, { variables });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>data is null</p>;
  return (
    <section>
      {data.repository?.collaborators?.nodes?.map(e => (
        <React.Fragment key={e?.id}>
          <p>
            <GithubItem frag={e} />
          </p>
          <Pile data={e!}></Pile>
        </React.Fragment>
      ))}
    </section>
  );
};

export const OrganizationPile: React.FC = function () {
  const params = useParams<{ login: string }>();
  const search = new URLSearchParams(useLocation().search);
  const variables = {
    ...params,
    limit: Number(search.get("limit")) || undefined,
  };
  const query = gql`
    query GetOrganizationPile(
      $login: String!
      $limit: Int = 20
      $after: String
    ) {
      organization(login: $login) {
        ...GithubItemFragmentOrganization
        repositories(
          first: 10
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            ...GithubItemFragmentRepository
          }
        }
        membersWithRole(first: $limit, after: $after) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ...UserPile
          }
        }
      }
    }
    ${fragments}
    ${GithubItemFragment.Organization}
    ${GithubItemFragment.Repository}
  `;
  const { data, loading, error } = useQuery<
    GetOrganizationPile,
    GetOrganizationPileVariables
  >(query, { variables });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data || !data.organization) return <p>data is null</p>;
  return (
    <section>
      <header>
        {data.organization.repositories.nodes?.map(e => (
          <GithubItem
            key={e?.id}
            frag={e}
            link={`/${e?.owner.login}/${e?.name}/pile`}
          />
        ))}
      </header>
      {data.organization.membersWithRole.nodes?.map(e => (
        <React.Fragment key={e?.id}>
          <p>
            <GithubItem frag={e} />
          </p>
          <Pile data={e!}></Pile>
        </React.Fragment>
      ))}
    </section>
  );
};

export const Pile: React.FC<{ data: UserPile }> = function ({ data }) {
  const { owner, name, login } = useParams<{
    owner?: string;
    name?: string;
    login?: string;
  }>();
  function getRepoLabel(repo: GithubItemFragmentRepository) {
    return [
      (owner || login) !== repo.owner.login ? repo.owner.login + "/" : "",
      name !== repo.name ? repo.name : "",
    ].join("");
  }
  return (
    <ul>
      {[...data.issues.nodes!, ...data.pullRequests.nodes!].map(e => (
        <li key={e?.id}>
          <GithubItem
            frag={e!}
            label={getRepoLabel(e?.repository!) + `#${e?.number}`}>
            {e?.title}
          </GithubItem>
        </li>
      ))}
      {(data.issues.pageInfo.hasNextPage ||
        data.pullRequests.pageInfo.hasNextPage) && (
        <li>
          <PagerMore frag={PagerUtil.reduce(data.issues, data.pullRequests)} />
        </li>
      )}
    </ul>
  );
};

const fragments = gql`
  fragment UserPile on User {
    ...GithubItemFragmentUser
    issues(
      first: 10
      states: OPEN
      orderBy: { field: CREATED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...GithubItemFragmentIssue
        repository {
          ...GithubItemFragmentRepository
        }
      }
    }
    pullRequests(
      first: 10
      states: OPEN
      orderBy: { field: CREATED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...GithubItemFragmentPullRequest
        repository {
          ...GithubItemFragmentRepository
        }
      }
    }
  }
  ${GithubItemFragment.Issue}
  ${GithubItemFragment.PullRequest}
  ${GithubItemFragment.Repository}
  ${GithubItemFragment.User}
`;
