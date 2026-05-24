import { Children, mapJoin, Show } from "@alloy-js/core";
import { isPlainObject, isNonNullish } from "remeda";

/**
 * Kotlin parameter definition with type and optional default value.
 */
export type ParameterDefinition = {
  readonly type: Children;
  readonly default?: Children;
};

export type ParametersProps = {
  /**
   * Parameter name to type or full definition.
   */
  readonly parameters?: Record<string, ParameterDefinition | Children>;
};

function isParameterDefinition(v: ParameterDefinition | Children): v is ParameterDefinition {
  return isPlainObject(v) && "type" in (v as object);
}

/**
 * Kotlin parameter list, e.g. `name: Type, name: Type = default`.
 */
export const Parameters = ({ parameters = {} }: ParametersProps) => {
  return mapJoin(
    () => Object.entries(parameters),
    ([name, defn]) => {
      const type = isParameterDefinition(defn) ? defn.type : defn;
      const defaultVal = isParameterDefinition(defn) ? defn.default : undefined;

      return (
        <>
          {name}
          {": "}
          {type}
          <Show when={isNonNullish(defaultVal)}>
            {" = "}
            {defaultVal}
          </Show>
        </>
      );
    },
    { joiner: ", " },
  );
};
