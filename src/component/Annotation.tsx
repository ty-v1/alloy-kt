import { Children, code, For, Indent, Show } from "@alloy-js/core";
import { isArray, isEmpty, isNonNullish } from "remeda";

export type AnnotationProps = {
  readonly type: Children;
  readonly value?: Record<string, Children>;
  /**
   * Annotation usage side target.
   *
   * @see https://kotlinlang.org/docs/annotations.html#annotation-use-site-targets
   */
  readonly target?:
    | "file"
    | "field"
    | "property"
    | "get"
    | "set"
    | "all"
    | "receiver"
    | "param"
    | "setparam"
    | "delegate";
};

export type AnnotationsProps = {
  readonly annotations: AnnotationProps[];
};

/**
 * Kotlin annotation usage site.
 */
export const Annotation = (props: AnnotationProps) => {
  return (
    <>
      {"@"}
      <Show when={isNonNullish(props.target)}>
        {props.target}
        {":"}
      </Show>
      {props.type}
      <Show when={isNonNullish(props.value)}>
        <AnnotationArgs value={props.value ?? {}} />
      </Show>
    </>
  );
};

function AnnotationArgs(props: { value: Record<string, Children> }) {
  const entries = Object.entries(props.value);

  if (isEmpty(entries)) {
    return "";
  }

  if (entries.length === 1 && entries[0][0] === "value") {
    const value = entries[0][1];

    if (isArray(value)) {
      return (
        <>
          {"("}
          <For each={value} joiner=", ">
            {(e) => e}
          </For>
          {")"}
        </>
      );
    } else {
      return code`(${value})`;
    }
  }

  return (
    <group>
      {"("}
      <Indent softline>
        <For each={entries} comma line>
          {([key, val]) => (
            <>
              {key}
              {" = "}
              {val}
            </>
          )}
        </For>
      </Indent>
      <sbr />
      {")"}
    </group>
  );
}

/**
 * Kotlin annotation list.
 */
// TODO support multiple annotations with the same target
// https://kotlinlang.org/docs/annotations.html#annotation-use-site-targets
export const Annotations = (props: AnnotationsProps) => {
  return (
    <For each={props.annotations} line>
      {(e) => <Annotation {...e} />}
    </For>
  );
};
