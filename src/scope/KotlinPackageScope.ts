// copy from @alloy-js/java/src/symbol/java-package-scope.ts
import { OutputScope } from "@alloy-js/core";

export class KotlinPackageScope extends OutputScope {
  public static readonly declarationSpaces = ["symbols"] as const;

  get kind() {
    return "package";
  }

  get symbols() {
    return this.spaceFor("symbols")!;
  }
}
