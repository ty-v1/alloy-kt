// copy from @alloy-js/java/src/symbol/java-lexical-scope.ts
import { OutputScope, useScope } from "@alloy-js/core";

export class KotlinLexicalScope extends OutputScope {
  public static readonly declarationSpaces = ["symbols"];

  get symbols() {
    return this.spaceFor("symbols")!;
  }
}

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
