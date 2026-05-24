// copy from @alloy-js/java/src/symbol/java-lexical-scope.ts
import { OutputScope } from "@alloy-js/core";

export class KotlinLexicalScope extends OutputScope {
  public static readonly declarationSpaces = ["symbols"];

  get symbols() {
    return this.spaceFor("symbols")!;
  }
}
