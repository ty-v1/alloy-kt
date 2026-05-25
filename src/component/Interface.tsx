import { Block, Children, Namekey, Refkey, Show } from "@alloy-js/core";
import { Name } from "@alloy-js/java";
import { isNullish } from "remeda";
import { Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.js";
import { Modifiers } from "./Modifiers.js";
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
  readonly fun?: boolean;
  readonly extends?: Children[];
};

/**
 * Kotlin `interface` declaration.
 */
export const Interface = (props: InterfaceProps) => {
  return (
    <Declaration {...props} name={props.name} nameKind="interface">
      <group>
        <Modifiers {...props} />
        {props.fun ? "fun " : ""}interface <Name />
        <Show when={!isNullish(props.generics)}>
          <TypeParameters generics={props.generics} />
        </Show>
        <SupertypeList implements={props.extends} />
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
