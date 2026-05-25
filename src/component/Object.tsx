import { Block, Children, Namekey, Refkey, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
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
};

/**
 * Kotlin `object` declaration.
 */
export const KotlinObject = (props: ObjectProps) => {
  return (
    <Declaration {...props} name={props.name} nameKind="class">
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
};

/**
 * Kotlin `companion object` declaration.
 *
 * Notes:
 * - Must be placed inside a class body. At most one per enclosing class.
 * - Not registered as a named declaration; cannot be referenced by `refkey`.
 */
export const CompanionObject = ({ name, supertypes, children }: CompanionObjectProps) => {
  return (
    <>
      companion object{name ? ` ${name}` : ""}
      <SupertypeList implements={supertypes} />
      <Show when={isNonNullish(children)}>
        {" "}
        <Block>{children}</Block>
      </Show>
    </>
  );
};
