import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { camelCase, constantCase, pascalCase } from "change-case";

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
        return pascalCase(name);
      case "enum-member":
        return constantCase(name);
      case "constant":
        return constantCase(name);
      default:
        return camelCase(name);
    }
  });
};

/**
 * Get the Kotlin name policy.
 */
export const useKotlinNamePolicy: () => NamePolicy<KotlinElements> = () => useNamePolicy();
