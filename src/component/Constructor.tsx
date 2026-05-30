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
export const PrimaryConstructor = (props: PrimaryConstructorProps) => {
  const hasModifier = (props.private || props.protected || props.internal || props.public) ?? false;
  const hasAnnotations = !isEmptyish(props.annotations);
  const needsKeyword = hasModifier || hasAnnotations;
  const params = <Parameters parameters={props.parameters} />;

  return (
    <>
      <Show when={needsKeyword}>
        {" "}
        <Show when={hasAnnotations}>
          <Annotations annotations={props.annotations ?? []} />{" "}
        </Show>
        <Modifiers
          public={props.public}
          private={props.private}
          protected={props.protected}
          internal={props.internal}
        />
        constructor
      </Show>
      ({params})
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
