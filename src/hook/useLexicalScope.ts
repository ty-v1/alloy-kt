import { useScope } from "@alloy-js/core";
import { KotlinLexicalScope } from "../scope/KotlinLexicalScope.js";

export function useLexicalScope(): KotlinLexicalScope | undefined {
  const scopeContext = useScope();
  if (!scopeContext) {
    return undefined;
  }

  if (!(scopeContext instanceof KotlinLexicalScope)) {
    throw new Error("A lexical scope is required but the current scope is not a KotlinLexicalScope");
  }

  return scopeContext;
}
