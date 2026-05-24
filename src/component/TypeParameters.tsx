import { Children, For, Indent, Show } from "@alloy-js/core";
import { isEmptyish, isNullish } from "remeda";

export type TypeParametersProps = {
  /**
   * Type parameter name to upper bound.
   * `undefined` means unconstrained.
   */
  readonly generics?: Record<string, Children>;
};

/**
 * Kotlin type parameter list, e.g. `<T>` or `<T : Bound>`.
 */
export const TypeParameters = (props: TypeParametersProps) => {
  return (
    <>
      <Show when={!isEmptyish(props.generics)}>
        <group>
          {"<"}
          <Indent softline trailingBreak>
            <For each={Object.entries(props.generics ?? {})} comma line>
              {([name, constraint]) => (
                <>
                  {name}
                  {!isNullish(constraint) && <> : {constraint}</>}
                </>
              )}
            </For>
          </Indent>
          {">"}
        </group>
      </Show>
    </>
  );
};
