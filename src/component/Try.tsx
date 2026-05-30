import { Block, Children, onCleanup, Refkey, useScope } from "@alloy-js/core";
import { useKotlinNamePolicy } from "../context/createKotlinNamePolicy.js";
import { KotlinLexicalScope } from "../scope/KotlinLexicalScope.js";
import { KotlinOutputSymbol } from "../symbol/KotlinOutputSymbol.js";
import { LexicalScope } from "./LexicalScope.js";

export type CatchParameter = {
  readonly name: string;
  readonly type: Children;
  readonly refkey?: Refkey;
};

export type TryCatchProps = {
  readonly children?: Children;
};

export type CatchClauseProps = {
  readonly parameter: CatchParameter;
  readonly children?: Children;
};

export type FinallyClauseProps = {
  readonly children?: Children;
};

export const Try = (props: TryCatchProps) => {
  return (
    <>
      {"try "}
      <LexicalScope>
        <Block>{props.children}</Block>
      </LexicalScope>
    </>
  );
};

export const Catch = (props: CatchClauseProps) => {
  const parentScope = useScope();
  const catchScope = new KotlinLexicalScope("catch", parentScope, {});

  // TODO: Extract a createKotlinSymbol() factory like TypeScript's createValueSymbol.
  const sym = new KotlinOutputSymbol(props.parameter.name, catchScope.symbols, {
    refkeys: props.parameter.refkey,
    namePolicy: useKotlinNamePolicy().for("parameter"),
  });

  onCleanup(() => {
    sym.delete();
  });

  return (
    <>
      {" catch ("}
      {sym.name}
      {": "}
      {props.parameter.type}
      {") "}
      <LexicalScope value={catchScope}>
        <Block>{props.children}</Block>
      </LexicalScope>
    </>
  );
};

export const Finally = (props: FinallyClauseProps) => {
  return (
    <>
      {" finally "}
      <LexicalScope>
        <Block>{props.children}</Block>
      </LexicalScope>
    </>
  );
};
