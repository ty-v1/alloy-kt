import { memo } from "@alloy-js/core";
import { isBigInt, isBoolean, isFunction, isNullish, isNumber, isString } from "remeda";

export type ValueProps = {
  readonly value?: unknown;
};

/**
 * Kotlin literal value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Value = (props: ValueProps): any => {
  return memo(() => {
    const value = props.value;

    if (isNullish(value)) {
      return "null";
    } else if (isNumber(value) || isBoolean(value)) {
      return String(value);
    } else if (isBigInt(value)) {
      return `${value.toString()}L`;
    } else if (isString(value)) {
      return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\$/g, "\\$")}"`;
    } else if (isFunction(value)) {
      return value;
    }
  });
};
