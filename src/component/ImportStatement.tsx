import { Component } from "@alloy-js/core";
import { isEmptyish } from "remeda";

export type ImportStatementProps = {
  /**
   * The name of the imported class.
   * @example String
   */
  readonly name: string;
  /**
   * The package of the imported class.
   * @example java.lang
   */
  readonly package: string;
  /**
   * If the imported class is a wildcard.
   * If true, alias is ignored.
   *
   * @default false
   */
  readonly wildcard?: boolean;
  /**
   * The alias of the imported class.
   *
   * @example jString
   */
  readonly alias?: string;
};

/**
 * Kotlin import statement.
 */
export const ImportStatement: Component<ImportStatementProps> = ({ wildcard = false, name, alias, package: pkg }) => {
  if (wildcard) {
    return `import ${pkg}.*`;
  } else {
    const as = !isEmptyish(alias) ? ` as ${alias}` : "";
    return `import ${pkg}.${name}${as}`;
  }
};
