import { Children, mapJoin, Show } from "@alloy-js/core";
import { isNonNullish, isPlainObject } from "remeda";

/**
 * Positional argument for a function call.
 */
export type PositionalArgument = {
  readonly value: Children;
  readonly spread?: boolean;
};

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
   * Each element is a positional argument or a named argument ({ name, value }).
   * Nullable elements will be omitted.
   */
  readonly args?: (PositionalArgument | NamedArgument | null | undefined)[];
};

function isNamedArgument(v: PositionalArgument | NamedArgument): v is NamedArgument {
  return isPlainObject(v) && "name" in v;
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
        (e) =>
          isNamedArgument(e) ? (
            <>
              {e.name}
              {" = "}
              {e.value}
            </>
          ) : (
            <>
              <Show when={e.spread}>{"*"}</Show>
              {e.value}
            </>
          ),
        { joiner: ", " },
      )}
      {")"}
    </>
  );
};
