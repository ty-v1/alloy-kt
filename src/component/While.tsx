import { Block, Children } from "@alloy-js/core";

export type WhileProps = {
  readonly condition: Children;
  readonly children?: Children;
};

export const While = (props: WhileProps) => {
  return (
    <>
      {"while ("}
      {props.condition}
      {") "}
      <Block>{props.children}</Block>
    </>
  );
};

export type DoWhileProps = {
  readonly condition: Children;
  readonly children?: Children;
};

export const DoWhile = (props: DoWhileProps) => {
  return (
    <>
      {"do "}
      <Block>{props.children}</Block>
      {" while ("}
      {props.condition}
      {")"}
    </>
  );
};
