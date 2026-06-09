import { Block, Children, code, Show } from "@alloy-js/core";
import { isEmptyish, isNonNullish } from "remeda";
import { useKotlinNamePolicy } from "../context/createKotlinNamePolicy.js";
import { AnnotationProps, Annotations } from "./Annotation.js";
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
  readonly expect?: boolean;
  readonly actual?: boolean;
  readonly external?: boolean;
  readonly annotations?: AnnotationProps[];
};

type FunctionBodyProps = {
  readonly expressionBody?: Children;
  readonly children?: Children;
};

const FunctionBody = ({ expressionBody, children }: FunctionBodyProps) => {
  if (isNonNullish(expressionBody)) {
    return code` = ${expressionBody}`;
  } else if (isNonNullish(children)) {
    return (
      <>
        {" "}
        <Block>{children}</Block>
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
export const Function = ({
  expressionBody,
  name,
  children,
  returnType,
  annotations = [],
  generics,
  parameters,
  ...modifiers
}: FunctionProps) => {
  const functionName = useKotlinNamePolicy().getName(name, "function");

  return (
    <>
      <Show when={!isEmptyish(annotations)}>
        <Annotations annotations={annotations} />
        <hbr />
      </Show>
      <Modifiers {...modifiers} />
      {"fun "}
      <Show when={isNonNullish(generics)}>
        <TypeParameters generics={generics} />{" "}
      </Show>
      {functionName}(<Parameters parameters={parameters} />)
      <Show when={isNonNullish(returnType)}>
        {": "}
        {returnType}
      </Show>
      <FunctionBody expressionBody={expressionBody}>{children}</FunctionBody>
    </>
  );
};
