import { Component } from "@alloy-js/core";
import { useSemicolonPolicy } from "../context/useSemicolonPolicy.js";

type Props = {
  /**
   * The name of the imported class.
   * @example String
   */
  name: string;
  /**
   * The package of the imported class.
   * @example java.lang
   */
  package: string;
  /**
   * If the imported class is a wildcard.
   * If true, alias is ignored.
   *
   * @default false
   */
  wildcard?: boolean;
  /**
   * The alias of the imported class.
   *
   * @example jString
   */
  alias?: string;
};

/**
 * Kotlin import statement.
 */
export const ImportStatement: Component<Props> = (props) => {
  const { semicolon } = useSemicolonPolicy();

  if (props.wildcard) {
    return `import ${props.package}.*${semicolon ? ";" : ""}`;
  } else {
    const alias = props.alias ? ` as ${props.alias}` : "";
    return `import ${props.package}.${props.name}${alias}${semicolon ? ";" : ""}`;
  }
};
