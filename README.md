# gannthub

gannt chart (or something like timeline) visualization for github issues and PRs

# github graphgql schema

* https://developer.github.com/v4/explorer/
* https://developer.github.com/v4/query/

* https://developer.github.com/v4/object/organization/
* https://developer.github.com/v4/object/repository/
* https://developer.github.com/v4/object/user/

* `type Issue` https://github.com/octokit/graphql-schema/blob/v4.17.0/schema.graphql#L2394

```graphql
query {
  user(login: "shuji-koike") {
    login
  }
}

query {
  organization(login: "mvrck-inc") {
     repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        url
        createdAt
        updatedAt
        issues(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            title
            state
            number
            url
            createdAt
            updatedAt
            closedAt
            author {
              login
            }
            assignees(first: 10) {
              nodes {
                login
              }
            }
          }
        }
        pullRequests(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            title
            state
            number
            url
            createdAt
            updatedAt
            closedAt
            author {
              login
            }
            assignees(first: 10) {
              nodes {
                login
              }
            }
          }
        }
      }
    }
  }
}


query {
  organization(login: "mvrck-inc") {
     members(first: 100) {
      edges {
        node {
          login
        }
      }
    }
  }
}

query {
  search(first: 100, type: ISSUE, query: "user:shuji-koike") {
  repositoryCount
  issueCount
}
```

# links

* https://github.com/chentsulin/awesome-graphql#lib-js
