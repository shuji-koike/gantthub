import React from "react";
import { GithubConnectionFragment } from ".";

export const PagerMore: React.FC<{
  frag: GithubConnectionFragment;
}> = ({ frag }) =>
  PagerUtil.more(frag) ? <span>...{PagerUtil.count(frag)} more!</span> : <></>;

export const PagerUtil = {
  more(e: GithubConnectionFragment) {
    return e.pageInfo.hasNextPage;
  },
  count(e: GithubConnectionFragment) {
    return e.totalCount - e.nodes?.length!;
  },
  reduce(...arr: GithubConnectionFragment[]): GithubConnectionFragment {
    return {
      totalCount: arr.reduce((acc, e) => acc + e.totalCount, 0),
      pageInfo: {
        hasNextPage: arr.reduce<boolean>(
          (acc, e) => acc || e.pageInfo.hasNextPage,
          false
        ),
      },
      nodes: arr.reduce<any[]>((acc, e) => acc.concat(...e.nodes!), []),
    };
  },
};
