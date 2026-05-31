import { mapJoin } from "@alloy-js/core";
import { ImportStatement, ImportStatementProps } from "./ImportStatement.js";

export type ImportStatementsProps = {
  /**
   * The import statements.
   */
  readonly imports: ImportStatementProps[];
};

/**
 * Multiple import statements.
 */
export const ImportStatements = (props: ImportStatementsProps) => {
  return mapJoin(
    () => props.imports,
    (importProps) => () => <ImportStatement {...importProps} />,
  );
};
