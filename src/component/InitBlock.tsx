import { Block, Children } from "@alloy-js/core";

export type InitBlockProps = {
  readonly children: Children;
};

/**
 * Kotlin initializer block.
 */
export const InitBlock = ({ children }: InitBlockProps) => {
  return (
    <>
      {"init "}
      <Block>{children}</Block>
    </>
  );
};
