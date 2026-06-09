import { Children, code, mapJoin, Show } from "@alloy-js/core";
import { isPlainObject, isNonNullish } from "remeda";

/**
 * Kotlin parameter definition.
 */
export type ParameterDefinition = {
  readonly type: Children;
  readonly default?: Children;
  readonly vararg?: boolean;
};

export type ParametersProps = {
  /**
   * Parameter name to type or full definition.
   */
  readonly parameters?: Record<string, ParameterDefinition | Children>;
};

function isParameterDefinition(v: ParameterDefinition | Children): v is ParameterDefinition {
  return isPlainObject(v) && "type" in v;
}

/**
 * Kotlin parameter list.
 */
export const Parameters = ({ parameters = {} }: ParametersProps) => {
  return mapJoin(
    () => Object.entries(parameters),
    ([name, defn]) => {
      if (!isParameterDefinition(defn)) {
        return code`${name}: ${defn}`;
      }

      const { type, default: defaultValue, vararg = false } = defn;

      return (
        <>
          <Show when={vararg}>{"vararg "}</Show>
          {name}
          {": "}
          {type}
          <Show when={isNonNullish(defaultValue)}>
            {" = "}
            {defaultValue}
          </Show>
        </>
      );
    },
    { joiner: ", " },
  );
};
