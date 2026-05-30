import { Block, Children } from "@alloy-js/core";

export type InitProps = {
  readonly children?: Children;
};

/**
 * Kotlin initializer block.
 */
export const Init = ({ children }: InitProps) => {
  return (
    <>
      {"init "}
      <Block>{children}</Block>
    </>
  );
};
