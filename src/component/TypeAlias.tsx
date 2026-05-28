import { Children, Namekey, Refkey, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
import { Declaration } from "./Declaration.js";
import { Modifiers } from "./Modifiers.js";
import { Name } from "./Name.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.js";

export type TypeAliasProps = TypeParametersProps & {
  readonly name: string | Namekey;
  readonly refkey?: Refkey;
  readonly type: Children;
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
};

/**
 * Kotlin `typealias` declaration.
 */
export const TypeAlias = (props: TypeAliasProps) => {
  return (
    <Declaration {...props} name={props.name} nameKind="class">
      <Modifiers {...props} />
      {"typealias "}
      <Name />
      <Show when={isNonNullish(props.generics)}>
        <TypeParameters generics={props.generics} />
      </Show>
      {" = "}
      {props.type}
    </Declaration>
  );
};
