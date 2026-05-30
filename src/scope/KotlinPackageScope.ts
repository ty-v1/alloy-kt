// copy from @alloy-js/java/src/symbol/java-package-scope.ts
import { OutputScope } from "@alloy-js/core";

export class KotlinPackageScope extends OutputScope {
  public static readonly declarationSpaces = ["symbols"] as const;

  get kind() {
    return "package";
  }

  get symbols() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.spaceFor("symbols")!;
  }
}
