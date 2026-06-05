import { Children, Declaration as CoreDeclaration, Namekey, Refkey } from "@alloy-js/core";
import { isNullish } from "remeda";
import { KotlinElements, useKotlinNamePolicy } from "../context/createKotlinNamePolicy.js";
import { useLexicalScope } from "../scope/KotlinLexicalScope.js";
import { useKotlinSymbol } from "../symbol/index.js";

export type DeclarationProps = {
  readonly name: string | Namekey;
  readonly refkey?: Refkey;
  readonly children?: Children;
  /**
   * Kind of Kotlin element this declaration represents (class, function, ...).
   */
  readonly nameKind?: KotlinElements;
};

/**
 * Kotlin named declaration.
 * It must be used inside a `LexicalScope`; the symbol is registered into it.
 */
export const Declaration = (props: DeclarationProps) => {
  const scope = useLexicalScope();
  if (isNullish(scope)) {
    throw new Error("A lexical scope is required for declaration");
  }

  const sym = useKotlinSymbol(props.name, {
    refkeys: props.refkey,
    namePolicy: useKotlinNamePolicy().for(props.nameKind),
  });
  return <CoreDeclaration symbol={sym}>{props.children}</CoreDeclaration>;
};
