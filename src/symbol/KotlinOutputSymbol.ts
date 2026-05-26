// copy from @alloy-js/java/src/symbol/java-output-symbol.ts
import { Namekey, OutputSpace, OutputSymbol, OutputSymbolOptions, refkey } from "@alloy-js/core";
import { isNullish } from "remeda";
import { usePackage } from "../component/PackageDirectory.js";

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
