import { Children, For, Indent, mapJoin, Show } from "@alloy-js/core";
import { isEmptyish, isNonNullish } from "remeda";

/**
 * Declaration of a Kotlin type parameter.
 */
export type TypeParameterDeclaration = {
  /**
   * The upper bound for the type parameter.
   * It is the same as constraint in other languages.
   */
  readonly upperBound?: Children;
  /**
   * The variance modifier for the type parameter.
   */
  readonly variance?: "in" | "out";
  /**
   * Whether the type parameter is reified.
   */
  readonly reified?: boolean;
};

/**
 * Props for the TypeParameters component.
 */
export type TypeParametersProps = {
  /**
   * A record of type parameter names to their declarations.
   * `undefined` means the type parameter is unconstrained.
   */
  readonly generics?: Record<string, TypeParameterDeclaration | undefined>;
};

type TypeParameterProps = TypeParameterDeclaration & {
  readonly name: string;
};

const TypeParameter = ({ name, reified = false, variance, upperBound }: TypeParameterProps) => {
  const declaration = mapJoin(
    () => [variance, reified ? "reified" : "", name],
    (e) => () => e,
    {
      joiner: " ",
    },
  );

  return (
    <>
      {declaration}
      <Show when={isNonNullish(upperBound)}>
        {" : "}
        {upperBound}
      </Show>
    </>
  );
};

/**
 * Kotlin type parameter list.
 *
 * @see https://kotlinlang.org/docs/generics.html
 */
export const TypeParameters = ({ generics = {} }: TypeParametersProps) => {
  return (
    <>
      <Show when={!isEmptyish(generics)}>
        <group>
          {"<"}
          <Indent softline trailingBreak>
            <For each={Object.entries(generics)} comma line>
              {([name, declaration]) => {
                return <TypeParameter name={name} {...declaration} />;
              }}
            </For>
          </Indent>
          {">"}
        </group>
      </Show>
    </>
  );
};
