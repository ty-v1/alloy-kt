import { Component } from "@alloy-js/core";

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
export const ImportStatement: Component<ImportStatementProps> = (props) => {
  if (props.wildcard) {
    return `import ${props.package}.*`;
  } else {
    const alias = props.alias ? ` as ${props.alias}` : "";
    return `import ${props.package}.${props.name}${alias}`;
  }
};
