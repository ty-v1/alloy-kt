import { reactive, Show, SourceFile as CoreSourceFile } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { isEmptyish, isNullish } from "remeda";
import { KotlinSourceFileContext } from "../context/KotlinSourceFileContext.js";
import { KotlinOutputSymbol } from "../symbol/index.js";
import { ImportStatementProps } from "./ImportStatement.js";
import { ImportStatements } from "./ImportStatements.js";
import { LexicalScope } from "./LexicalScope.js";
import { usePackage } from "./PackageDirectory.js";
import { Reference } from "./Reference.js";

export type SourceFileProps = {
  /**
   * File path relative to the package directory.
   *
   * @example Foo.kt
   */
  readonly path: string;
  readonly children?: Children;
};

/**
 * Kotlin source file (`.kt`).
 *
 * Must be used inside a `PackageDirectory`.
 * Imports are tracked automatically when a `Reference` resolves a symbol from another package.
 * Symbols in the same package and `kotlin.*` builtins are never imported.
 */
export const SourceFile = (props: SourceFileProps) => {
  const packageCtx = usePackage();

  if (isNullish(packageCtx)) {
    throw new Error("SourceFile must be declared inside a package");
  }

  const importRecords: ImportStatementProps[] = reactive([]);
  const importedSymbols = new Map<KotlinOutputSymbol, string>();

  function addImport(symbol: KotlinOutputSymbol): string {
    if (importedSymbols.has(symbol)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return importedSymbols.get(symbol)!;
    }

    const qualifiedName = packageCtx?.qualifiedName;
    const pkg = symbol.package ?? "";

    if (symbol.package !== qualifiedName && !pkg.startsWith("kotlin.")) {
      importRecords.push({
        package: symbol.package ?? "",
        name: symbol.name,
      });
    }
    importedSymbols.set(symbol, symbol.name);

    return symbol.name;
  }

  return (
    <CoreSourceFile path={props.path} filetype="kt" reference={Reference}>
      package {packageCtx.qualifiedName}
      <hbr />
      <hbr />
      <Show when={!isEmptyish(importRecords)}>
        <ImportStatements imports={importRecords} />
        <hbr />
        <hbr />
      </Show>
      <KotlinSourceFileContext.Provider value={{ addImport }}>
        <LexicalScope name={props.path}>{props.children}</LexicalScope>
      </KotlinSourceFileContext.Provider>
    </CoreSourceFile>
  );
};
