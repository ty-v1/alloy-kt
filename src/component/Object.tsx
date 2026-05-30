import { Block, Children, namekey, Namekey, Refkey, Show } from "@alloy-js/core";
import { isEmptyish, isNonNullish, isNullish } from "remeda";
import { AnnotationProps, Annotations } from "./Annotation.js";
import { Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.js";
import { Modifiers } from "./Modifiers.js";
import { Name } from "./Name.js";
import { SupertypeList } from "./SupertypeList.js";

type ObjectDeclarationCommon = {
  readonly refkey?: Refkey;
  readonly children?: Children;
  // visibility
  readonly public?: boolean;
  readonly private?: boolean;
  readonly protected?: boolean;
  readonly internal?: boolean;
  readonly supertypes?: Children[];
  readonly annotations?: AnnotationProps[];
};

type ObjectDeclaration = ObjectDeclarationCommon & {
  readonly name: string | Namekey;
  /**
   * Whether the object is a `data object`.
   */
  readonly data?: boolean;
};

type CompanionObjectDeclaration = ObjectDeclarationCommon & {
  /**
   * @default Companion
   */
  readonly name?: string | Namekey;
  readonly companion: true;
};

export type ObjectProps = ObjectDeclaration | CompanionObjectDeclaration;

/**
 * Kotlin `object` declaration.
 */
export const KotlinObject = ({
  name,
  refkey,
  children,
  annotations = [],
  supertypes = [],
  ...modifiers
}: ObjectProps) => {
  const isCompanion = "companion" in modifiers;
  const isAnonymousCompanion = isCompanion && isNullish(name);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const objectName = isAnonymousCompanion ? namekey("Companion", { ignoreNamePolicy: true }) : name!;

  return (
    <Declaration refkey={refkey} name={objectName} nameKind="class">
      <Show when={!isEmptyish(annotations)}>
        <Annotations annotations={annotations} />
        <hbr />
      </Show>
      <group>
        <Modifiers {...modifiers} />
        object
        <Show when={!isAnonymousCompanion}>
          {" "}
          <Name />
        </Show>
        <SupertypeList implements={supertypes} />
        <Show when={isNonNullish(children)}>
          {" "}
          <LexicalScope>
            <Block>{children}</Block>
          </LexicalScope>
        </Show>
      </group>
    </Declaration>
  );
};
