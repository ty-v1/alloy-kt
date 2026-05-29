import { Block, Children } from "@alloy-js/core";

export type ForProps = {
  // TODO: support discriminated union (parameter: string | destructuring: string[]) and apply name policy to each component
  readonly parameters: Children;
  readonly iterable: Children;
  readonly children?: Children;
};

export const For = (props: ForProps) => {
  return (
    <>
      {"for ("}
      {props.parameters}
      {" in "}
      {props.iterable}
      {") "}
      <Block>{props.children}</Block>
    </>
  );
};
