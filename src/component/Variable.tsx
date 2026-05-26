import { Children, Namekey, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
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
export const Variable = (props: VariableProps) => {
  const rawName = typeof props.name === "string" ? props.name : props.name.name;
  const name = useKotlinNamePolicy().getName(rawName, "variable");
  const keyword = props.var ? "var" : "val";

  return (
    <>
      {keyword} {name}
      <Show when={isNonNullish(props.type)}>
        {": "}
        {props.type}
      </Show>
      <Show when={isNonNullish(props.initialValue)}>
        {" = "}
        {props.initialValue}
      </Show>
    </>
  );
};
