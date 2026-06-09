import { Children, Namekey, Show } from "@alloy-js/core";
import { isNonNullish, isString } from "remeda";
import { useKotlinNamePolicy } from "../context/createKotlinNamePolicy.js";

export type VariableProps = {
  readonly name: string | Namekey;
  /**
   * Optional type annotation.
   * Kotlin can infer the type from `initialValue`.
   */
  readonly type?: Children;
  readonly val?: boolean;
  readonly var?: boolean;
  /**
   * Initializer expression.
   */
  readonly initialValue?: Children;
};

/**
 * Kotlin local variable declaration.
 * val is used by default.
 */
export const Variable = ({ name, type, var: ktVar = false, initialValue }: VariableProps) => {
  const rawName = isString(name) ? name : name.name;
  const varName = useKotlinNamePolicy().getName(rawName, "variable");
  const keyword = ktVar ? "var" : "val";

  return (
    <>
      {keyword} {varName}
      <Show when={isNonNullish(type)}>
        {": "}
        {type}
      </Show>
      <Show when={isNonNullish(initialValue)}>
        {" = "}
        {initialValue}
      </Show>
    </>
  );
};
