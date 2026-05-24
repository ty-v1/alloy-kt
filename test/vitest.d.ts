import "vitest";

interface CustomMatchers<R = unknown> {
  toHaveFileContents(expectedFiles: Record<string, string>): R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type,@typescript-eslint/no-explicit-any
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
