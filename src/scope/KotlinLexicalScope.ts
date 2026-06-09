// copy from @alloy-js/java/src/symbol/java-lexical-scope.ts
import { OutputScope, useScope } from "@alloy-js/core";
import { isNullish } from "remeda";

export class KotlinLexicalScope extends OutputScope {
  public static readonly declarationSpaces = ["symbols"];

  get symbols() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.spaceFor("symbols")!;
  }
}

export function useLexicalScope(): KotlinLexicalScope | undefined {
  const scopeContext = useScope();
  if (isNullish(scopeContext)) {
    return undefined;
  }

  if (!(scopeContext instanceof KotlinLexicalScope)) {
    throw new Error("A lexical scope is required but the current scope is not a KotlinLexicalScope");
  }

  return scopeContext;
}
