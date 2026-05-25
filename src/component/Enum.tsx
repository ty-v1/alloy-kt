import { Block, Children, For, Indent, Namekey, Refkey, Show } from "@alloy-js/core";
import { Name } from "@alloy-js/java";
import { isEmptyish, isNonNullish } from "remeda";
import { useKotlinNamePolicy } from "../context/createKotlinNamePolicy.js";
import { PrimaryConstructor, PrimaryConstructorProps } from "./Constructor.js";
import { Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.js";
import { Modifiers } from "./Modifiers.js";
import { SupertypeList } from "./SupertypeList.js";

export type EnumProps = {
  readonly name: string | Namekey;
  readonly refkey?: Refkey;
  readonly children?: Children;
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  readonly primaryConstructor?: PrimaryConstructorProps;
  readonly implements?: Children[];
};

/**
 * Kotlin enum class declaration.
 */
export const Enum = (props: EnumProps) => {
  return (
    <Declaration {...props} name={props.name} nameKind="enum">
      <group>
        <Modifiers {...props} />
        enum class <Name />
        {isNonNullish(props.primaryConstructor) && <PrimaryConstructor {...props.primaryConstructor} />}
        <SupertypeList implements={props.implements} />
        <Show when={isNonNullish(props.children)}>
          {" "}
          <LexicalScope>
            <Block>{props.children}</Block>
          </LexicalScope>
        </Show>
      </group>
    </Declaration>
  );
};

export type EnumMemberProps = {
  readonly name: string;
  /**
   * Constructor arguments.
   */
  readonly args?: Children[];
};

/**
 * Kotlin enum entry.
 * Use only inside `Enum`'s `children`, before any other members.
 */
export const EnumMember = (props: EnumMemberProps) => {
  const name = useKotlinNamePolicy().getName(props.name, "enum-member");
  return (
    <>
      {name}
      <Show when={!isEmptyish(props.args)}>
        <group>
          (
          <Indent softline trailingBreak>
            <For each={props.args ?? []} comma line>
              {(arg) => arg}
            </For>
          </Indent>
          )
        </group>
      </Show>
    </>
  );
};
