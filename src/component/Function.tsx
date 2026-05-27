import { Block, Children, code, Refkey, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
import { Declaration } from "./Declaration.js";
import { Modifiers } from "./Modifiers.js";
import { Name } from "./Name.js";
import { ParameterDefinition, Parameters } from "./Parameters.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.js";

export type FunctionProps = TypeParametersProps & {
  readonly name: string;
  readonly refkey?: Refkey;
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
  return (
    <Declaration name={props.name} refkey={props.refkey} nameKind="function">
      <Modifiers {...props} />
      {"fun "}
      <Show when={isNonNullish(props.generics)}>
        <TypeParameters generics={props.generics} />{" "}
      </Show>
      <Name />(<Parameters parameters={props.parameters} />)
      <Show when={isNonNullish(props.returnType)}>
        {": "}
        {props.returnType}
      </Show>
      <FunctionBody expressionBody={props.expressionBody}>{props.children}</FunctionBody>
    </Declaration>
  );
};
