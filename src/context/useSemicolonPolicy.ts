// context interface
import { createContext, useContext } from "@alloy-js/core";

export type SemicolonPolicy = {
  /**
   * If true, add a semicolon at the end of the statement.
   *
   * @default false
   */
  semicolon?: boolean;
};

export const SemicolonPolicy = createContext<SemicolonPolicy>({
  semicolon: false,
});

/**
 * Get the semicolon policy in the current scope.
 */
export const useSemicolonPolicy = () => {
  return useContext(SemicolonPolicy)!;
};
