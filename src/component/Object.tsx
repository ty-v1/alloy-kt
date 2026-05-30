import { Block, Children, Namekey, Refkey, Show } from "@alloy-js/core";
import { isEmptyish, isNonNullish } from "remeda";
import { AnnotationProps, Annotations } from "./Annotation.js";
import { Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.js";
import { Modifiers } from "./Modifiers.js";
import { Name } from "./Name.js";
import { SupertypeList } from "./SupertypeList.js";

export type ObjectProps = {
  readonly name: string | Namekey;
  readonly refkey?: Refkey;
  readonly children?: Children;
  // visibility
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  /**
   * Whether the object is a `data object`.
   */
  readonly data?: boolean;
  readonly supertypes?: Children[];
  readonly annotations?: AnnotationProps[];
};

/**
 * Kotlin `object` declaration.
 */
export const KotlinObject = (props: ObjectProps) => {
  return (
    <Declaration {...props} name={props.name} nameKind="class">
      <Show when={!isEmptyish(props.annotations)}>
        <Annotations annotations={props.annotations ?? []} />
        <hbr />
      </Show>
      <group>
        <Modifiers {...props} />
        object <Name />
        <SupertypeList implements={props.supertypes} />
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

export type CompanionObjectProps = {
  /** Optional name. Anonymous when omitted. */
  readonly name?: string;
  /** Implemented supertypes. */
  readonly supertypes?: Children[];
  readonly children?: Children;
  readonly annotations?: AnnotationProps[];
};

/**
 * @deprecated
 * Kotlin `companion object` declaration.
 *
 * Notes:
 * - Must be placed inside a class body. At most one per enclosing class.
 * - Not registered as a named declaration; cannot be referenced by `refkey`.
 */
// FIXME remove it and add companion modifier to KotlinObject
export const CompanionObject = ({ name, supertypes, children }: CompanionObjectProps) => {
  return (
    <>
      companion object{isNonNullish(name) ? ` ${name}` : ""}
      <SupertypeList implements={supertypes} />
      <Show when={isNonNullish(children)}>
        {" "}
        <Block>{children}</Block>
      </Show>
    </>
  );
};
