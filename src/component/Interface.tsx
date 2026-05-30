import { Block, Children, Namekey, Refkey, Show } from "@alloy-js/core";
import { isEmptyish, isNullish } from "remeda";
import { AnnotationProps, Annotations } from "./Annotation.js";
import { Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.js";
import { Modifiers } from "./Modifiers.js";
import { Name } from "./Name.js";
import { SupertypeList } from "./SupertypeList.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.js";

export type InterfaceProps = TypeParametersProps & {
  readonly name: string | Namekey;
  readonly refkey?: Refkey;
  readonly children?: Children;
  // visibility
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  // interface-specific
  readonly sealed?: boolean;
  /**
   * Functional interface.
   */
  // TODO add fun to Modifiers
  readonly fun?: boolean;
  readonly extends?: Children[];
  readonly annotations?: AnnotationProps[];
};

/**
 * Kotlin `interface` declaration.
 */
export const Interface = ({
  refkey,
  name,
  annotations = [],
  extends: ktExtends = [],
  generics = {},
  fun = false,
  children,
  ...modifiers
}: InterfaceProps) => {
  return (
    <Declaration refkey={refkey} name={name} nameKind="interface">
      <Show when={!isEmptyish(annotations)}>
        <Annotations annotations={annotations} />
        <hbr />
      </Show>
      <group>
        <Modifiers {...modifiers} />
        {fun ? "fun " : ""}interface <Name />
        <Show when={!isNullish(generics)}>
          <TypeParameters generics={generics} />
        </Show>
        <SupertypeList implements={ktExtends} />
        <Show when={!isNullish(children)}>
          {" "}
          <LexicalScope>
            <Block>{children}</Block>
          </LexicalScope>
        </Show>
      </group>
    </Declaration>
  );
};
