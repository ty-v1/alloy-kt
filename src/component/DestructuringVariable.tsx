import { Children, mapJoin, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
import { useKotlinNamePolicy } from "../context/createKotlinNamePolicy.js";

export type DestructuringParameter = {
  readonly name: string;
  readonly type?: Children;
};

export type DestructuringVariableProps = {
  readonly val?: boolean;
  readonly var?: boolean;
  readonly variables: DestructuringParameter[];
  readonly initialValue?: Children;
};

/**
 * Kotlin destructuring variable declaration.
 * val is used by default.
 */
export const DestructuringVariable = ({ var: ktVar = false, variables, initialValue }: DestructuringVariableProps) => {
  const namePolicy = useKotlinNamePolicy();
  const keyword = ktVar ? "var" : "val";

  return (
    <>
      {keyword} {"("}
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
      <Show when={isNonNullish(initialValue)}>
        {" = "}
        {initialValue}
      </Show>
    </>
  );
};
