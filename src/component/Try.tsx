import { Block, Children, Refkey } from "@alloy-js/core";
import { Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.js";
import { Name } from "./Name.js";

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
  return (
    <>
      {" catch "}
      <LexicalScope>
        <Declaration name={props.parameter.name} refkey={props.parameter.refkey} nameKind="parameter">
          {"("}
          <Name />
          {": "}
          {props.parameter.type}
          {") "}
          <Block>{props.children}</Block>
        </Declaration>
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
