import { ComponentContext, createContext, OutputSymbol } from "@alloy-js/core";

export interface KotlinSourceFileContext {
  addImport(symbol: OutputSymbol): string;
}

export const KotlinSourceFileContext: ComponentContext<KotlinSourceFileContext> = createContext();
