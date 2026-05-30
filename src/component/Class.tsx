import { Block, Children, Namekey, Refkey, Show } from "@alloy-js/core";
import { isEmptyish, isNullish } from "remeda";
import { AnnotationProps, Annotations } from "./Annotation.js";
import { PrimaryConstructor, PrimaryConstructorProps } from "./Constructor.js";
import { Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.js";
import { Modifiers } from "./Modifiers.js";
import { Name } from "./Name.js";
import { SupertypeList } from "./SupertypeList.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.js";

/**
 * Kotlin `class` declaration.
 */
export type ClassProps = TypeParametersProps & {
  /**
   * Name of declaration.
   * It should be a fully qualified name.
   *
   * @example me.example.code.Main
   */
  readonly name: string | Namekey;
  readonly refkey?: Refkey;
  readonly children?: Children;
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  readonly open?: boolean;
  readonly abstract?: boolean;
  readonly sealed?: boolean;
  readonly data?: boolean;
  /**
   * Whether the class is a `value class`.
   * In JVM backend, it requires the `@JvmInline` annotation.
   *
   * @see https://kotlinlang.org/docs/inline-classes.html
   */
  readonly value?: boolean;
  readonly annotations?: AnnotationProps[];
  readonly primaryConstructor?: PrimaryConstructorProps;
  readonly extends?: Children;
  readonly implements?: Children[];
};

/**
 * Kotlin `class` declaration.
 */
export const Class = (props: ClassProps) => {
  return (
    <Declaration {...props} name={props.name} nameKind="class">
      <Show when={!isEmptyish(props.annotations)}>
        <Annotations annotations={props.annotations ?? []} />
        <hbr />
      </Show>
      <group>
        <Modifiers {...props} />
        class <Name />
        <Show when={!isNullish(props.generics)}>
          <TypeParameters generics={props.generics} />
        </Show>
        <Show when={!isNullish(props.primaryConstructor)}>
          <PrimaryConstructor {...props.primaryConstructor!} />
        </Show>
        <SupertypeList extends={props.extends} implements={props.implements} />
        <Show when={!isNullish(props.children)}>
          {" "}
          <LexicalScope>
            <Block>{props.children}</Block>
          </LexicalScope>
        </Show>
      </group>
    </Declaration>
  );
};
