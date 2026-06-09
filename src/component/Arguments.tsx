import { Children, mapJoin } from "@alloy-js/core";
import { isNonNullish } from "remeda";

export type ArgumentsProps = {
  /**
   * Arguments for a function call.
   * Nullable elements will be omitted.
   */
  readonly args?: Children[];
};

/**
 * Kotlin call-site argument list.
 * Positional argument list only. Named arguments are not yet supported.
 */
export const Arguments = ({ args = [] }: ArgumentsProps) => {
  return (
    <>
      {"("}
      {mapJoin(
        () => args.filter((e) => isNonNullish(e)),
        (e) => e,
        { joiner: ", " },
      )}
      {")"}
    </>
  );
};
