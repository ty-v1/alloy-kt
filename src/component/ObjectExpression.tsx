import { Block, Children, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
import { LexicalScope } from "./LexicalScope.js";
import { SupertypeList } from "./SupertypeList.js";

export type ObjectExpressionProps = {
  readonly children?: Children;
  readonly supertypes?: Children[];
};

/**
 * Kotlin anonymous object expression.
 */
export const ObjectExpression = (props: ObjectExpressionProps) => {
  return (
    <>
      {"object"}
      <SupertypeList implements={props.supertypes} />
      <Show when={isNonNullish(props.children)}>
        {" "}
        <LexicalScope>
          <Block>{props.children}</Block>
        </LexicalScope>
      </Show>
    </>
  );
};
