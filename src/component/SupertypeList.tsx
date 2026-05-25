import { Children, For } from "@alloy-js/core";
import { isEmptyish, isNonNullish } from "remeda";

type SupertypeListProps = {
  readonly extends?: Children;
  readonly implements?: Children[];
};

/**
 * Kotlin supertype list, e.g. `: Parent, Interface1, Interface2`.
 */
export const SupertypeList = (props: SupertypeListProps) => {
  const all: Children[] = [];
  if (isNonNullish(props.extends)) {
    all.push(props.extends);
  }

  if (isNonNullish(props.implements)) {
    all.push(...props.implements);
  }

  if (isEmptyish(all)) {
    return "";
  }

  return (
    <>
      {" : "}
      <For each={all} joiner=", ">
        {(e) => e}
      </For>
    </>
  );
};
