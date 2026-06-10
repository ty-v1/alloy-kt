import { Children, code, List, memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { isNonNullish, isNullish, isString } from "remeda";
import { KotlinSourceFileContext } from "../context/KotlinSourceFileContext.js";
import { KotlinOutputScope } from "../scope/KotlinOutputScope.js";
import { KotlinOutputSymbol } from "../symbol/KotlinOutputSymbol.js";

function resolveRef(key: Refkey | string) {
  if (isString(key)) {
    return key;
  }

  const sourceFile = useContext(KotlinSourceFileContext);
  const result = resolve<KotlinOutputScope, KotlinOutputSymbol>(key);

  return memo(() => {
    if (isNullish(result.value)) {
      return "<Unresolved Symbol>";
    }

    const { symbol } = result.value;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return untrack(() => sourceFile!.resolveForDoc(symbol));
  });
}

export type KDocParamProps = {
  readonly name: string;
  readonly children: Children;
};

/**
 * KDoc `@param` tag.
 */
export const KDocParam = (props: KDocParamProps) => code`@param ${props.name} ${props.children}`;

export type KDocPropertyProps = {
  readonly name: string;
  readonly children: Children;
};

/**
 * KDoc `@property` tag.
 */
export const KDocProperty = (props: KDocPropertyProps) => code`@property ${props.name} ${props.children}`;

export type KDocThrowsProps = {
  readonly exception?: Refkey | string;
  readonly children?: Children;
};

/**
 * KDoc `@throws` tag.
 */
export const KDocThrows = (props: KDocThrowsProps) => {
  const target = isNonNullish(props.exception) ? resolveRef(props.exception) : undefined;
  return isNonNullish(props.children) ? code`@throws ${target} ${props.children}` : code`@throws ${target}`;
};

export type KDocExceptionProps = {
  readonly exception?: Refkey | string;
  readonly children?: Children;
};

/**
 * KDoc `@exception` tag.
 */
export const KDocException = (props: KDocExceptionProps) => {
  const target = isNonNullish(props.exception) ? resolveRef(props.exception) : undefined;
  return isNonNullish(props.children) ? code`@exception ${target} ${props.children}` : code`@exception ${target}`;
};

export type KDocSeeProps = {
  readonly identifier?: Refkey | string;
};

/**
 * KDoc `@see` tag.
 */
export const KDocSee = (props: KDocSeeProps) => {
  const target = isNonNullish(props.identifier) ? resolveRef(props.identifier) : undefined;
  return code`@see ${target}`;
};

export type KDocSampleProps = {
  readonly identifier?: Refkey | string;
};

/**
 * KDoc `@sample` tag.
 */
export const KDocSample = (props: KDocSampleProps) => {
  const target = isNonNullish(props.identifier) ? resolveRef(props.identifier) : undefined;
  return code`@sample ${target}`;
};

export type KDocLinkProps = {
  readonly symbol?: Refkey | string;
  readonly label?: string;
};

/**
 * KDoc inline symbol link.
 */
export const KDocLink = (props: KDocLinkProps) => {
  const target = isNonNullish(props.symbol) ? resolveRef(props.symbol) : undefined;
  if (isNonNullish(props.label)) {
    return code`[${props.label}][${target}]`;
  }

  return code`[${target}]`;
};

function makeKDocTag(tagName: string) {
  return function KDocTag(props: { readonly children: Children }) {
    return code`@${tagName} ${props.children}`;
  };
}

/**
 * KDoc `@return` tag.
 */
export const KDocReturn = makeKDocTag("return");

/**
 * KDoc `@constructor` tag.
 */
export const KDocConstructor = makeKDocTag("constructor");

/**
 * KDoc `@receiver` tag.
 */
export const KDocReceiver = makeKDocTag("receiver");

/**
 * KDoc `@author` tag.
 */
export const KDocAuthor = makeKDocTag("author");

/**
 * KDoc `@since` tag.
 */
export const KDocSince = makeKDocTag("since");

/**
 * KDoc `@suppress` tag.
 */
export const KDocSuppress = makeKDocTag("suppress");

export type KDocProps = {
  readonly children: Children;
};

/**
 * KDoc block.
 * If you want to write Markdown in KDoc, we recommend using `@alloy-js/markdown`.
 */
export const KDoc = (props: KDocProps) => (
  <>
    {"/**"}
    <hbr />
    <align string=" * ">
      {" * "}
      <List>{props.children}</List>
    </align>
    <hbr />
    {" */"}
  </>
);
