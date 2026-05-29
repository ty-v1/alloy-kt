import { Children, code, For, Indent, Show } from "@alloy-js/core";
import { isEmptyish, isString } from "remeda";

export type StarTypeArgument = {
  readonly star: true;
};

export type VarianceTypeArgument = {
  readonly variance: "out" | "in";
  readonly type: Children;
};

export type NamedTypeArgument = {
  readonly name: Children;
};

export type TypeArgumentDescriptor = StarTypeArgument | VarianceTypeArgument | NamedTypeArgument;

export interface TypeArgumentsProps {
  readonly args?: (string | TypeArgumentDescriptor)[];
}

/**
 * Kotlin type argument list.
 */
export const TypeArguments = ({ args = [] }: TypeArgumentsProps) => {
  return (
    <>
      <Show when={!isEmptyish(args)}>
        <group>
          {"<"}
          <Indent softline trailingBreak>
            <For each={args} comma line>
              {(arg) => {
                if (isString(arg)) {
                  return arg;
                }

                if ("star" in arg) {
                  return "*";
                }

                if ("variance" in arg) {
                  return code`${arg.variance} ${arg.type}`;
                }

                return arg.name;
              }}
            </For>
          </Indent>
          {">"}
        </group>
      </Show>
    </>
  );
};
