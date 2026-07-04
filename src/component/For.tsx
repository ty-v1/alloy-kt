import { Block, Children, mapJoin, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
import { useKotlinNamePolicy } from "../context/createKotlinNamePolicy.js";
import { DestructuringParameter } from "./DestructuringVariable.js";

export type ForProps = {
  readonly variable?: string;
  readonly variables?: DestructuringParameter[];
  readonly iterable: Children;
  readonly children?: Children;
};

export const For = ({ variable, variables, iterable, children }: ForProps) => {
  const namePolicy = useKotlinNamePolicy();

  const renderedParams = isNonNullish(variables) ? (
    <>
      {"("}
      {mapJoin(
        () => variables,
        ({ name, type }) => {
          const varName = namePolicy.getName(name, "variable");
          return (
            <>
              {varName}
              <Show when={isNonNullish(type)}>: {type}</Show>
            </>
          );
        },
        { joiner: ", " },
      )}
      {")"}
    </>
  ) : (
    namePolicy.getName(variable ?? "", "variable")
  );

  return (
    <>
      {"for ("}
      {renderedParams}
      {" in "}
      {iterable}
      {") "}
      <Block>{children}</Block>
    </>
  );
};
