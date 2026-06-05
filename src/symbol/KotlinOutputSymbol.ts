// copy from @alloy-js/java/src/symbol/java-output-symbol.ts
import { Namekey, onCleanup, OutputSpace, OutputSymbol, OutputSymbolOptions, refkey } from "@alloy-js/core";
import { isNonNullish, isNullish } from "remeda";
import { usePackage } from "../component/PackageDirectory.js";
import { useLexicalScope } from "../scope/KotlinLexicalScope.js";

export interface KotlinOutputSymbolOptions extends OutputSymbolOptions {
  package?: string;
}

export class KotlinOutputSymbol extends OutputSymbol {
  get package() {
    return this.#package;
  }
  #package?: string;

  constructor(
    name: string | Namekey,
    spaces: OutputSpace[] | OutputSpace | undefined,
    options: KotlinOutputSymbolOptions = {},
  ) {
    if (isNullish(options.refkeys)) {
      options.refkeys = [refkey(name)];
    }
    super(name, spaces, options);

    const parentPackage = usePackage();
    this.#package = options.package ?? parentPackage?.qualifiedName ?? "";
  }

  copy() {
    const options = this.getCopyOptions();
    const copy = new KotlinOutputSymbol(this.name, undefined, {
      ...options,
      package: this.#package,
    });
    this.initializeCopy(copy);

    return copy;
  }
}

/**
 * Creates a {@link KotlinOutputSymbol} in the current {@link KotlinLexicalScope}
 * and registers cleanup when the surrounding component is unmounted.
 *
 * @remarks
 * Must be called from inside a component that renders within a `<LexicalScope>` subtree so the symbol is registered
 * in the correct scope. When no scope is active, the symbol is created without a declaration space. It is useful for
 * scopeless external-library symbols.
 *
 * @example
 * ```tsx
 * // Referenceable local variable
 * const myKey = refkey();
 *
 * const MyVar = () => {
 *   const sym = useKotlinSymbol("myVar", { refkeys: myKey });
 *   return <>{sym.name}{" = computeValue()"}</>;
 * };
 *
 * // Resolve the variable elsewhere in the same scope
 * const usage = <Reference refkey={myKey} />;
 * ```
 */
export function useKotlinSymbol(name: string | Namekey, options: KotlinOutputSymbolOptions = {}): KotlinOutputSymbol {
  const scope = useLexicalScope();
  const spaces = isNonNullish(scope) ? [scope.symbols] : [];
  const binder = options.binder ?? scope?.binder;
  const symbol = new KotlinOutputSymbol(name, spaces, {
    ...options,
    binder,
  });

  onCleanup(() => symbol.delete());

  return symbol;
}
