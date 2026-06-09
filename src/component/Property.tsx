import { Children, For, Refkey, Show } from "@alloy-js/core";
import { isNonNullish } from "remeda";
import { Children, Refkey, Show } from "@alloy-js/core";
import { isEmptyish, isNonNullish } from "remeda";
import { AnnotationProps, Annotations } from "./Annotation.js";
import { Declaration } from "./Declaration.js";
import { Modifiers } from "./Modifiers.js";
import { Name } from "./Name.js";

export type PropertyProps = {
  readonly name: string;
  readonly refkey?: Refkey;
  readonly type: Children;
  readonly val?: boolean;
  readonly var?: boolean;
  readonly initialValue?: Children;
  readonly by?: Children;
  // visibility
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  // modality
  readonly override?: boolean;
  readonly open?: boolean;
  readonly abstract?: boolean;
  // property-specific
  readonly const?: boolean;
  readonly lateinit?: boolean;
  readonly external?: boolean;
  readonly annotations?: AnnotationProps[];
};

/**
 * Kotlin property declaration.
 * `val` is used by default.
 */
export const Property = ({
  name,
  refkey,
  var: ktVar = false,
  initialValue,
  annotations = [],
  type,
  by,
  ...modifiers
}: PropertyProps) => {
  const keyword = ktVar ? "var" : "val";

  return (
    <Declaration refkey={refkey} name={name}>
      <Show when={!isEmptyish(annotations)}>
        <Annotations annotations={annotations} />
        <hbr />
      </Show>
      <Modifiers {...modifiers} />
      {keyword} <Name />: {type}
      <Show when={isNonNullish(initialValue)}> = {initialValue}</Show>
      <Show when={isNonNullish(by)}> by {by}</Show>
    </Declaration>
  );
};
