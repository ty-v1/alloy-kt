import "vitest";

interface CustomMatchers<R = unknown> {
  toHaveFileContents(expectedFiles: Record<string, string>): R;
}

declare module "vitest" {
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
