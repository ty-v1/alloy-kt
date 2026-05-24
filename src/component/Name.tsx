import { DeclarationContext, useContext } from "@alloy-js/core";
import { isNullish } from "remeda";

export function Name() {
  const declSymbol = useContext(DeclarationContext);
  if (isNullish(declSymbol)) {
    return "";
  }

  return <>{declSymbol.name}</>;
}
