import { Block, Children } from "@alloy-js/core";

export type IfProps = {
  readonly condition: Children;
  readonly children?: Children;
};

export const If = (props: IfProps) => {
  return (
    <>
      {"if ("}
      {props.condition}
      {") "}
      <Block>{props.children}</Block>
    </>
  );
};

export type ElseIfProps = {
  readonly condition: Children;
  readonly children?: Children;
};

export const ElseIf = (props: ElseIfProps) => {
  return (
    <>
      {" else if ("}
      {props.condition}
      {") "}
      <Block>{props.children}</Block>
    </>
  );
};

export type ElseProps = {
  readonly children?: Children;
};

export const Else = (props: ElseProps) => {
  return (
    <>
      {" else "}
      <Block>{props.children}</Block>
    </>
  );
};
