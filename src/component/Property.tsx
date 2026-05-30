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
  readonly annotations?: AnnotationProps[];
};

/**
 * Kotlin property declaration.
 * `val` is used by default.
 */
export const Property = (props: PropertyProps) => {
  const keyword = props.var ? "var" : "val";

  return (
    <Declaration {...props} name={props.name}>
      <Show when={!isEmptyish(props.annotations)}>
        <Annotations annotations={props.annotations ?? []} />
        <hbr />
      </Show>
      <Modifiers {...props} />
      {keyword} <Name />: {props.type}
      <Show when={isNonNullish(props.initialValue)}> = {props.initialValue}</Show>
    </Declaration>
  );
};
