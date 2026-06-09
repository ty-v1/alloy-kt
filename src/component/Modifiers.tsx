import { For } from "@alloy-js/core";

/**
 * Kotlin modifier keywords.
 * Some keywords are only valid in certain contexts.
 */
export type ModifierProps = {
  readonly public?: boolean;
  readonly protected?: boolean;
  readonly private?: boolean;
  readonly internal?: boolean;
  readonly expect?: boolean;
  readonly actual?: boolean;
  readonly final?: boolean;
  readonly open?: boolean;
  readonly abstract?: boolean;
  readonly sealed?: boolean;
  readonly const?: boolean;
  readonly external?: boolean;
  readonly override?: boolean;
  readonly lateinit?: boolean;
  readonly tailrec?: boolean;
  readonly vararg?: boolean;
  readonly suspend?: boolean;
  readonly inner?: boolean;
  readonly enum?: boolean;
  readonly annotation?: boolean;
  readonly fun?: boolean;
  readonly companion?: boolean;
  readonly inline?: boolean;
  readonly value?: boolean;
  readonly infix?: boolean;
  readonly operator?: boolean;
  readonly data?: boolean;
};

// Order follows Kotlin coding conventions:
// https://kotlinlang.org/docs/coding-conventions.html#modifiers-order
const modifiers: (keyof ModifierProps)[] = [
  "public",
  "protected",
  "private",
  "internal",
  "expect",
  "actual",
  "final",
  "open",
  "abstract",
  "sealed",
  "const",
  "external",
  "override",
  "lateinit",
  "tailrec",
  "vararg",
  "suspend",
  "inner",
  "enum",
  "annotation",
  "fun",
  "companion",
  "inline",
  "value",
  "infix",
  "operator",
  "data",
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
