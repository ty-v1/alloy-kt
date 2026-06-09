import { ContentOutputFile, OutputDirectory, OutputFile } from "@alloy-js/core";
import { dedent } from "@alloy-js/core/testing";
import { isNonNullish, isNullish } from "remeda";

export function toHaveFileContents(received: OutputDirectory, expectedFiles: Record<string, string>) {
  for (const [path, rawExpected] of Object.entries(expectedFiles)) {
    const file = findFile(received, path);
    const actual = file.contents;
    const expected = dedent(rawExpected);

    if (actual !== expected) {
      return {
        pass: false,
        message: () => `File "${path}" content mismatch`,
        actual,
        expected,
      };
    }
  }

  return { pass: true, message: () => "Files match" };
}

function findFileWorker(res: OutputDirectory, path: string): OutputFile | undefined {
  for (const item of res.contents) {
    if (item.kind === "file") {
      if (item.path.includes(path)) {
        return item;
      }
    } else {
      const found = findFileWorker(item, path);
      if (isNonNullish(found)) {
        return found;
      }
    }
  }

  return undefined;
}

function findFile(res: OutputDirectory, path: string): ContentOutputFile {
  const result = findFileWorker(res, path);
  if (isNullish(result)) {
    throw new Error("Expected to find file " + path);
  }

  return result as ContentOutputFile;
}
