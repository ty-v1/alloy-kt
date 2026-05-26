// copy from @alloy-js/java/src/component/java/LexicalScope.tsx
import { Scope, ScopePropsWithInfo, ScopePropsWithValue, useScope } from "@alloy-js/core";
import { KotlinLexicalScope } from "../scope/KotlinLexicalScope.js";

export type LexicalScopePropsWithScopeValue = ScopePropsWithValue;

export type LexicalScopePropsWithScopeInfo = ScopePropsWithInfo;

export type LexicalScopeProps = LexicalScopePropsWithScopeValue | LexicalScopePropsWithScopeInfo;

/**
 * Kotlin lexical scope.
 */
export const LexicalScope = (props: LexicalScopeProps) => {
  let scope: KotlinLexicalScope;

  if ("value" in props) {
    if (!(props.value instanceof KotlinLexicalScope)) {
      throw new Error("LexicalScope value must be a KotlinLexicalScope instance");
    }

    scope = props.value;
  } else {
    const parentScope = useScope();
    scope = new KotlinLexicalScope(props.name ?? "lexical scope", parentScope, { ...props });
  }

  return <Scope value={scope}>{props.children}</Scope>;
};
