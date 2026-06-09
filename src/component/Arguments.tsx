import { Children, mapJoin } from "@alloy-js/core";
import { isNonNullish, isPlainObject } from "remeda";

/**
 * Named argument for a function call.
 */
export type NamedArgument = {
  readonly name: string;
  readonly value: Children;
};

export type ArgumentsProps = {
  /**
   * Arguments for a function call.
   * Each element is a positional argument (Children) or a named argument ({ name, value }).
   * Nullable elements will be omitted.
   */
  readonly args?: (Children | NamedArgument)[];
};

function isNamedArgument(v: Children | NamedArgument): v is NamedArgument {
  return isPlainObject(v) && "name" in v && "value" in v;
}

/**
 * Kotlin call-site argument list.
 */
export const Arguments = ({ args = [] }: ArgumentsProps) => {
  return (
    <>
      {"("}
      {mapJoin(
        () => args.filter((e) => isNonNullish(e)),
        (e) => (isNamedArgument(e) ? <>{e.name}{" = "}{e.value}</> : e),
        { joiner: ", " },
      )}
      {")"}
    </>
  );
};
