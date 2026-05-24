import { Refkey } from "@alloy-js/core";
import { ref } from "../symbol/kotlin-reference.js";

export type ReferenceProps = {
  readonly refkey: Refkey;
};

/**
 * Kotlin name reference.
 *
 * Resolves `refkey` to the symbol's name and registers an import in the enclosing `SourceFile` if the symbol lives in another package.
 */
export const Reference = (props: ReferenceProps) => {
  const reference = ref(props.refkey);
  return <>{reference}</>;
};
