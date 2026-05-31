import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { capitalize, toCamelCase, toSnakeCase, toUpperCase } from "remeda";

export type KotlinElements =
  | "class"
  | "interface"
  | "enum"
  | "enum-member"
  | "function"
  | "parameter"
  | "constant"
  | "variable"
  | "method";

/**
 * Create a Kotlin name policy.
 *
 * - class, interface, enum, enum-member: PascalCase
 * - constant: CONSTANT_CASE
 * - function, parameter, variable, method: camelCase
 */
export const createKotlinNamePolicy: () => NamePolicy<KotlinElements> = () => {
  return createNamePolicy((name, element) => {
    switch (element) {
      case "class":
      case "interface":
      case "enum":
        return capitalize(toCamelCase(name));
      case "enum-member":
        return toUpperCase(toSnakeCase(name));
      case "constant":
        return toUpperCase(toSnakeCase(name));
      default:
        return toCamelCase(name);
    }
  });
};

/**
 * Get the Kotlin name policy.
 */
export const useKotlinNamePolicy: () => NamePolicy<KotlinElements> = () => useNamePolicy();
