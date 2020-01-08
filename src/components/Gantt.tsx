import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import React, { useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetMilestones } from "../types/GetMilestones";
import { GanttHeader } from "./GanttHeader";
import { GithubItem } from "./GithubItem";
import { GithubItemFragment } from "./GithubItem";
import { ScrollBox } from "./ScrollBox";
import { ZenhubContext } from "./ZenhubProvider";

export const Gantt: React.FC = function () {
  const ref = useRef<HTMLTableElement>(null);
  const zenhub = useContext(ZenhubContext);
  const params = useParams<{ owner: string; name: string }>();
  const { data, loading, error } = useQuery<GetMilestones>(query, {
    variables: params,
  });
  useEffect(() => {
    if (data?.repository?.databaseId) {
      zenhub.fetch(`/p1/repositories/${data?.repository?.databaseId}/epics`);
    }
  }, [data, zenhub]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (
    !data ||
    !data.repository ||
    !data.repository.milestones ||
    !data.repository.milestones.nodes
  )
    return <p>data is null</p>;
  const dates = [
    ...data.repository.milestones.nodes.map(e => e?.createdAt),
    ...data.repository.milestones.nodes.map(e => e?.dueOn),
    ...data.repository.milestones.nodes
      .map(e => e!.issues.nodes!.map(e => e!.createdAt))
      .flat(),
    ...data.repository.milestones.nodes
      .map(e => e!.pullRequests.nodes!.map(e => e!.createdAt))
      .flat(),
  ]
    .map(e => new Date(e))
    .sort((a, b) => a.getTime() - b.getTime());
  const columns = getDateArray(dates[0], dates[dates.length - 1]);
  const active = {
    milestone: data.repository.milestones.nodes[0],
    issue: (data.repository.milestones.nodes[0]?.issues.nodes || [])[0],
  };
  return (
    <ScrollBox>
      <StyledTable ref={ref}>
        <GanttHeader columns={columns}>
          <GithubItem
            frag={data.repository!}
            label={`${data.repository.owner.login}/${data.repository.name}`}
          />
        </GanttHeader>
        <tbody>
          {data.repository.milestones.nodes.map(
            milestone =>
              milestone && (
                <React.Fragment key={milestone.number}>
                  <tr>
                    <th onClick={() => console.debug(milestone)}>
                      <GithubItem frag={milestone} />
                    </th>
                    <td
                      colSpan={
                        columns.findIndex(
                          e => e > new Date(milestone.createdAt)
                        ) - 1
                      }></td>
                    <th
                      colSpan={
                        columns.findIndex(e => e > new Date(milestone.dueOn)) -
                        columns.findIndex(
                          e => e > new Date(milestone.createdAt)
                        ) +
                        1
                      }>
                      <GithubItem
                        frag={milestone}
                        label={dayjs(milestone.dueOn).format("YYYY/MM/DD")}
                      />
                    </th>
                    <td
                      colSpan={
                        columns.length -
                        columns.findIndex(e => e > new Date(milestone.dueOn))
                      }></td>
                  </tr>
                  {[
                    ...milestone.issues.nodes!,
                    ...milestone.pullRequests.nodes!,
                  ].map(issue => (
                    <tr key={issue?.number}>
                      <td onClick={() => console.debug(issue)}>
                        <GithubItem frag={issue!} label={`#${issue?.number}`}>
                          {issue?.title}
                        </GithubItem>
                      </td>
                      <td
                        colSpan={
                          columns.findIndex(
                            e => e > new Date(issue?.createdAt)
                          ) - 1
                        }></td>
                      <td
                        colSpan={
                          columns.findIndex(
                            e => e > new Date(milestone.dueOn)
                          ) -
                          columns.findIndex(
                            e => e > new Date(issue?.createdAt)
                          ) +
                          1
                        }>
                        <Section
                          active={
                            active.milestone === milestone &&
                            active.issue === issue
                          }>
                          {issue?.assignees?.nodes?.map(e => (
                            <span key={e?.login}>
                              <img
                                src={e?.avatarUrl}
                                alt={e?.login}
                                width={16}
                              />
                              <span>{e?.login}</span>
                            </span>
                          ))}
                          <GithubItem
                            frag={issue!}
                            label={`#${issue?.number}`}
                          />
                        </Section>
                      </td>
                      <td
                        colSpan={
                          columns.length -
                          columns.findIndex(e => e > new Date(milestone.dueOn))
                        }>
                        {issue?.labels?.nodes?.map(e => (
                          <span
                            key={e?.name}
                            style={{ background: "#" + e?.color }}>
                            {e?.name}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )
          )}
        </tbody>
      </StyledTable>
    </ScrollBox>
  );
};

export const Section: React.FC<{
  active: boolean;
}> = function ({ active, children }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (active)
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
  }, [active]);
  return <div ref={ref}>{children}</div>;
};

const query = gql`
  query GetMilestones($owner: String!, $name: String!, $first: Int = 25) {
    repository(owner: $owner, name: $name) {
      databaseId
      ...GithubItemFragmentRepository
      milestones(first: 10, orderBy: { field: DUE_DATE, direction: DESC }) {
        nodes {
          ...GithubItemFragmentMilestone
          issues(first: $first) {
            nodes {
              ...GithubItemFragmentIssue
              ...FragmentAssignees
              ...FragmentLabels
            }
          }
          pullRequests(first: $first) {
            nodes {
              ...GithubItemFragmentPullRequest
              ...FragmentAssignees
              ...FragmentLabels
            }
          }
        }
      }
    }
  }
  fragment FragmentAssignees on Assignable {
    assignees(first: 10) {
      nodes {
        avatarUrl
        login
      }
    }
  }
  fragment FragmentLabels on Labelable {
    labels(first: 10) {
      nodes {
        name
        color
      }
    }
  }
  ${GithubItemFragment.PullRequest}
  ${GithubItemFragment.Issue}
  ${GithubItemFragment.Repository}
  ${GithubItemFragment.Milestone}
`;

const StyledTable = styled.table`
  border-spacing: 0;
  > thead > tr > * {
    position: sticky;
    top: 0;
    min-width: 3rem;
    background: #fff;
    z-index: 2;
  }
  > thead > tr > th {
    left: 0;
    min-width: 3rem;
    z-index: 3;
  }
  > tbody > tr > :first-child {
    position: sticky;
    left: 0;
    padding: 8px;
    min-width: 200px;
    max-width: 400px;
    background: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
    z-index: 1;
  }
  > tbody > tr > th:nth-child(3) {
    text-align: right;
  }
  > tbody > tr > td:nth-child(3) {
    text-align: right;
  }
`;

function getDateArray(start: Date, end: Date) {
  return Array(dayjs(end).startOf("d").diff(dayjs(start).endOf("d"), "d") + 90)
    .fill(null)
    .map((_, i) => dayjs(start).startOf("d").add(i, "d").toDate());
}
