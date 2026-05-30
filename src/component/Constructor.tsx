import { Block, Children, Show } from "@alloy-js/core";
import { isEmptyish, isNullish } from "remeda";
import { AnnotationProps, Annotations } from "./Annotation.js";
import { Modifiers } from "./Modifiers.js";
import { ParameterDefinition, Parameters, ParametersProps } from "./Parameters.js";

export type PrimaryConstructorProps = ParametersProps & {
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  readonly annotations?: AnnotationProps[];
};

/**
 * Kotlin primary constructor.
 * The `constructor` keyword is emitted only when a visibility modifier is set.
 */
export const PrimaryConstructor = ({
  private: ktPrivate = false,
  protected: ktProtected = false,
  internal = false,
  public: ktPublic = false,
  annotations = [],
  parameters = {},
}: PrimaryConstructorProps) => {
  const hasModifier = ktPrivate || ktProtected || internal || ktPublic;
  const hasAnnotations = !isEmptyish(annotations);

  return (
    <>
      <Show when={hasModifier || hasAnnotations}>
        {" "}
        <Show when={hasAnnotations}>
          <Annotations annotations={annotations} />{" "}
        </Show>
        <Modifiers public={ktPublic} private={ktPrivate} protected={ktProtected} internal={internal} />
        constructor
      </Show>
      (<Parameters parameters={parameters} />)
    </>
  );
};

export type SecondaryConstructorProps = {
  readonly parameters?: Record<string, ParameterDefinition | Children>;
  /**
   * Arguments for a delegated constructor call.
   */
  readonly delegatedParameters?: Children;
  readonly children?: Children;
  readonly annotations?: AnnotationProps[];
};

/**
 * Kotlin secondary constructor.
 */
export const SecondaryConstructor = (props: SecondaryConstructorProps) => {
  const params = <Parameters parameters={props.parameters} />;
  return (
    <>
      <Show when={!isEmptyish(props.annotations)}>
        <Annotations annotations={props.annotations ?? []} />
        <hbr />
      </Show>
      constructor({params})
      <Show when={!isNullish(props.delegatedParameters)}> : this({props.delegatedParameters})</Show>
      <Show when={!isNullish(props.children)}>
        {" "}
        <Block>{props.children}</Block>
      </Show>
    </>
  );
};
