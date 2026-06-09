import { Block, Children, mapJoin, Show } from "@alloy-js/core";
import { isNonNullish, isTruthy } from "remeda";

export type WhenEntry = {
  /**
   * Condition expression.
   * Required unless `else` is true.
   */
  readonly condition?: Children;
  /**
   * Renders as the else case.
   */
  readonly else?: boolean;
  readonly body: Children;
};

export type WhenProps = {
  readonly subject?: Children;
  readonly entries: WhenEntry[];
};

export const When = (props: WhenProps) => {
  return (
    <>
      {"when"}
      <Show when={isNonNullish(props.subject)}>
        {" ("}
        {props.subject}
        {")"}
      </Show>{" "}
      <Block>
        {mapJoin(
          () => props.entries,
          (entry) => {
            const condition = isTruthy(entry.else) ? "else" : entry.condition;
            return [condition, " -> ", entry.body];
          },
        )}
      </Block>
    </>
  );
};
