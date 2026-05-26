// copy from @alloy-js/java/src/symbol/java-reference.ts
import { memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { isNullish } from "remeda";
import { KotlinSourceFileContext } from "../context/KotlinSourceFileContext.js";
import { KotlinOutputScope } from "../scope/KotlinOutputScope.js";
import { KotlinOutputSymbol } from "./KotlinOutputSymbol.js";

export function ref(refkey: Refkey) {
  const sourceFile = useContext(KotlinSourceFileContext);
  const result = resolve<KotlinOutputScope, KotlinOutputSymbol>(refkey);

  return memo(() => {
    if (isNullish(result.value)) {
      return "<Unresolved Symbol>";
    }

    const { symbol } = result.value;
    return untrack(() => sourceFile!.addImport(symbol));
  });
}
