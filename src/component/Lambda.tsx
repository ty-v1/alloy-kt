import { Block, Children, mapJoin, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";

export type LambdaProps = {
  /**
   * Lambda parameters.
   * Key is the parameter name, value is the optional type annotation.
   */
  readonly parameters?: Record<string, Children>;
  readonly children?: Children;
};

const LambdaParameters = ({ parameters = {} }: { parameters?: Record<string, Children> }) => {
  return mapJoin(
    () => Object.entries(parameters),
    ([name, type]) => (
      <>
        {name}
        <Show when={isNonNullish(type)}>{": "}{type}</Show>
      </>
    ),
    { joiner: ", " },
  );
};

/**
 * Kotlin lambda expression.
 */
export const Lambda = (props: LambdaProps) => {
  const hasParams =
    isNonNullish(props.parameters) && Object.keys(props.parameters).length > 0;

  return (
    <Block>
      <Show when={hasParams}>
        <LambdaParameters parameters={props.parameters} />{" -> "}
      </Show>
      {props.children}
    </Block>
  );
};
