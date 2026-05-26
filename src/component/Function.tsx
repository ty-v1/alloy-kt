import { Block, Children, code, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
import { useKotlinNamePolicy } from "../context/createKotlinNamePolicy.js";
import { Modifiers } from "./Modifiers.js";
import { ParameterDefinition, Parameters } from "./Parameters.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.js";

export type FunctionProps = TypeParametersProps & {
  readonly name: string;
  readonly returnType?: Children;
  readonly parameters?: Record<string, ParameterDefinition | Children>;
  /**
   * Expression body.
   * It takes priority over `children`.
   */
  readonly expressionBody?: Children;
  readonly children?: Children;
  // visibility
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  // modality
  readonly override?: boolean;
  readonly open?: boolean;
  readonly abstract?: boolean;
  // function-specific
  readonly inline?: boolean;
  readonly operator?: boolean;
  readonly infix?: boolean;
  readonly suspend?: boolean;
  readonly tailrec?: boolean;
};

type FunctionBodyProps = {
  readonly expressionBody?: Children;
  readonly children?: Children;
};

const FunctionBody = (props: FunctionBodyProps) => {
  if (isNonNullish(props.expressionBody)) {
    return code` = ${props.expressionBody}`;
  } else if (isNonNullish(props.children)) {
    return (
      <>
        {" "}
        <Block>{props.children}</Block>
      </>
    );
  } else {
    return "";
  }
};

/**
 * Kotlin function declaration.
 * `expressionBody` takes priority over `children`.
 */
export const Function = (props: FunctionProps) => {
  const name = useKotlinNamePolicy().getName(props.name, "function");

  return (
    <>
      <Modifiers {...props} />
      {"fun "}
      <Show when={isNonNullish(props.generics)}>
        <TypeParameters generics={props.generics} />{" "}
      </Show>
      {name}(<Parameters parameters={props.parameters} />)
      <Show when={isNonNullish(props.returnType)}>
        {": "}
        {props.returnType}
      </Show>
      <FunctionBody expressionBody={props.expressionBody}>{props.children}</FunctionBody>
    </>
  );
};
