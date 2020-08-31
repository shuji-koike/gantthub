import { gql } from "@apollo/client";
import { Label, LabelProps } from "@primer/components";
import React from "react";
import { LabelFragment } from "../types/LabelFragment";

export const GithubLabel: React.FC<
  LabelProps & {
    frag: LabelFragment;
  }
> = ({ frag, ...props }) => {
  return (
    <Label bg={`#${frag.color}`} {...props}>
      {frag.name} ({frag.issues.totalCount || ""})
    </Label>
  );
};

export const GithubLabelFragment = gql`
  fragment LabelFragment on Label {
    name
    description
    color
    updatedAt
    createdAt
    issues {
      totalCount
    }
  }
`;
