import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import { gql, useQuery } from "@apollo/client";
import { GetMilestones } from "../types/GetMilestones";
import { ScrollBox } from "./ScrollBox";
import { GanttHeader } from "./GanttHeader";
import { GithubIcon } from "./GithubIcon";

export const Gantt: React.FC = function() {
  const ref = React.useRef<HTMLTableElement>(null);
  const params = useParams<{ owner: string; name: string }>();
  const { data, loading, error } = useQuery<GetMilestones>(query, {
    variables: params
  });
  React.useEffect(
    function() {
      if (data?.repository?.databaseId) {
        getEpics(data?.repository?.databaseId!);
      }
    },
    [data]
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(data?.rateLimit);
  const dates = [
    ...data?.repository?.milestones?.nodes!.map(e => e?.createdAt),
    ...data?.repository?.milestones?.nodes!.map(e => e?.dueOn),
    ...data?.repository?.milestones
      ?.nodes!.map(e => e!.issues.nodes!.map(e => e!.createdAt))
      .flat(),
    ...data?.repository?.milestones
      ?.nodes!.map(e => e!.pullRequests.nodes!.map(e => e!.createdAt))
      .flat()
  ]
    .map(e => new Date(e))
    .sort((a, b) => a.getTime() - b.getTime());
  const columns = getDateArray(dates[0], dates[dates.length - 1]);
  const active = {
    milestone: (data?.repository?.milestones?.nodes || [])[0],
    issue: ((data?.repository?.milestones?.nodes || [])[0]?.issues.nodes ||
      [])[0]
  };
  return (
    <ScrollBox>
      <StyledTable ref={ref}>
        <GanttHeader columns={columns}>
          {data?.repository?.owner.login}/{data?.repository?.name}
        </GanttHeader>
        <tbody>
          {data?.repository?.milestones?.nodes?.map(milestone => (
            <React.Fragment key={milestone?.number}>
              <tr>
                <th onClick={() => console.log(milestone)}>
                  <a href={milestone?.url}>
                    <GithubIcon issue={milestone!} />
                    <span>{milestone?.title}</span>
                  </a>
                </th>
                <td
                  colSpan={
                    columns.findIndex(e => e > new Date(milestone?.createdAt)) -
                    1
                  }></td>
                <th
                  colSpan={
                    columns.findIndex(e => e > new Date(milestone?.dueOn)) -
                    columns.findIndex(e => e > new Date(milestone?.createdAt)) +
                    1
                  }>
                  <span>
                    <GithubIcon issue={milestone!} />
                    <span>{dayjs(milestone!.dueOn).format("YYYY/MM/DD")}</span>
                  </span>
                </th>
                <td
                  colSpan={
                    columns.length -
                    columns.findIndex(e => e > new Date(milestone?.dueOn))
                  }></td>
              </tr>
              {[
                ...milestone?.issues.nodes!,
                ...milestone?.pullRequests.nodes!
              ].map((issue, i) => (
                <tr key={issue?.number}>
                  <td onClick={() => console.log(issue)}>
                    <a href={issue?.url} title={issue?.title}>
                      <GithubIcon issue={issue!} />
                      <span>#{issue?.number}</span>
                      <span>{issue?.title}</span>
                    </a>
                  </td>
                  <td
                    colSpan={
                      columns.findIndex(e => e > new Date(issue?.createdAt)) - 1
                    }></td>
                  <td
                    colSpan={
                      columns.findIndex(e => e > new Date(milestone?.dueOn)) -
                      columns.findIndex(e => e > new Date(issue?.createdAt)) +
                      1
                    }>
                    <Section
                      active={
                        active.milestone === milestone && active.issue === issue
                      }>
                      <a href={issue?.url} title={issue?.title}>
                        <GithubIcon issue={issue!} />
                        <span>#{issue?.number}</span>
                      </a>
                      {issue?.assignees?.nodes?.map(e => (
                        <span key={e?.login}>
                          <img src={e?.avatarUrl} alt={e?.login} width={16} />
                          <span>{e?.login}</span>
                        </span>
                      ))}
                      {issue?.labels?.nodes?.map(e => (
                        <span
                          key={e?.name}
                          style={{ background: "#" + e?.color }}>
                          {e?.name}
                        </span>
                      ))}
                    </Section>
                  </td>
                  <td
                    colSpan={
                      columns.length -
                      columns.findIndex(e => e > new Date(milestone?.dueOn))
                    }></td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </StyledTable>
    </ScrollBox>
  );
};

export const Section: React.FC<{
  active: boolean;
}> = function({ active, children }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(
    function() {
      if (active) ref.current?.scrollIntoView(true);
      // if (active) ref.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
    },
    [active]
  );
  return <div ref={ref}>{children}</div>;
};

const query = gql`
  query GetMilestones($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      databaseId
      name
      owner {
        login
      }
      milestones(first: 10, orderBy: { field: DUE_DATE, direction: DESC }) {
        nodes {
          number
          title
          url
          createdAt
          dueOn
          creator {
            login
          }
          issues(first: 25) {
            nodes {
              number
              url
              title
              body
              createdAt
              closedAt
              closed
              ...Assignees
              ...Labels
            }
          }
          pullRequests(first: 25) {
            nodes {
              number
              url
              title
              body
              createdAt
              closedAt
              closed
              ...Assignees
              ...Labels
            }
          }
        }
      }
    }
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
  }
  fragment Assignees on Assignable {
    assignees(first: 5) {
      nodes {
        avatarUrl
        login
      }
    }
  }
  fragment Labels on Labelable {
    labels(first: 5) {
      nodes {
        name
        color
      }
    }
  }
`;

const StyledTable = styled.table`
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
  td,
  th {
    white-space: nowrap;
  }
  td {
    outline: 1px solid #ddd;
  }
  th {
    outline: 1px solid #fdd;
  }
`;

function getDateArray(start: Date, end: Date) {
  return Array.from({
    length:
      dayjs(end)
        .startOf("d")
        .diff(dayjs(start).endOf("d"), "d") + 90
  }).map((_, i) =>
    dayjs(start)
      .startOf("d")
      .add(i, "d")
      .toDate()
  );
}

function getEpics(repo_id: number) {
  return fetch(`https://api.zenhub.com/p1/repositories/${repo_id}/epics`, {
    headers: {
      "X-Authentication-Token": localStorage.getItem("ZENHUB_TOKEN") || ""
    }
  }).then(e => e.json());
}

// function getDateArray(start: Date, end: Date) {
//   const arr: Date[] =
//   let date = dayjs(start)
//     .startOf("d")
//     .toDate();
//   while (date < end) {
//     arr.push(date);
//     date = dayjs(date)
//       .add(1, "d")
//       .toDate();
//   }
//   return arr;
// }
