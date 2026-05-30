import { For } from "@alloy-js/core";

/**
 * Kotlin modifier keywords.
 * Some keywords are only valid in certain contexts.
 */
export type ModifierProps = {
  // visibility
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  // class / member
  readonly open?: boolean;
  readonly abstract?: boolean;
  readonly sealed?: boolean;
  readonly data?: boolean;
  readonly inline?: boolean;
  readonly value?: boolean;
  readonly annotation?: boolean;
  readonly companion?: boolean;
  // function / property
  readonly override?: boolean;
  readonly operator?: boolean;
  readonly infix?: boolean;
  readonly suspend?: boolean;
  readonly tailrec?: boolean;
  // property
  readonly lateinit?: boolean;
  readonly const?: boolean;
};

// Order follows Kotlin coding conventions:
// https://kotlinlang.org/docs/coding-conventions.html#modifiers-order
// TODO fix order
const modifiers: (keyof ModifierProps)[] = [
  "public",
  "private",
  "protected",
  "internal",
  "override",
  "abstract",
  "companion",
  "open",
  "sealed",
  "annotation",
  "data",
  "value",
  "inline",
  "tailrec",
  "operator",
  "infix",
  "suspend",
  "const",
  "lateinit",
];

/**
 * Kotlin modifier keywords.
 */
export const Modifiers = (props: ModifierProps) => {
  const modifierList = modifiers.filter((m) => props[m] ?? false);

  return (
    <For each={modifierList} joiner=" " ender=" ">
      {(m) => m}
    </For>
  );
};
