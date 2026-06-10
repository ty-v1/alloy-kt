import { ComponentContext, createContext, OutputSymbol } from "@alloy-js/core";
import { KotlinOutputSymbol } from "../symbol/KotlinOutputSymbol.js";

export interface KotlinSourceFileContext {
  addImport(symbol: OutputSymbol): string;
  /**
   * @internal
   */
  resolveForDoc(symbol: KotlinOutputSymbol): string;
}

export const KotlinSourceFileContext: ComponentContext<KotlinSourceFileContext> = createContext();
