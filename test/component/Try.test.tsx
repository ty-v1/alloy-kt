import { refkey } from "@alloy-js/core";
import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Catch, Finally, Try } from "../../src/component/Try.js";
import { ref } from "../../src/symbol/kotlin-reference.js";
import { renderInTestContext } from "../utils.js";

describe("TryCatch", () => {
  it("try-catch with body", () => {
    const res = renderToString(
      <>
        <Try>riskyOperation()</Try>
        <Catch parameter={{ name: "e", type: "IOException" }}>handleError(e)</Catch>
      </>,
    );

    expect(res).toBe(d`
      try {
        riskyOperation()
      } catch (e: IOException) {
        handleError(e)
      }
    `);
  });

  it("try-catch-finally", () => {
    const res = renderToString(
      <>
        <Try>riskyOperation()</Try>
        <Catch parameter={{ name: "e", type: "IOException" }}>handleError(e)</Catch>
        <Finally>cleanup()</Finally>
      </>,
    );

    expect(res).toBe(d`
      try {
        riskyOperation()
      } catch (e: IOException) {
        handleError(e)
      } finally {
        cleanup()
      }
    `);
  });

  it("try-finally (no catch)", () => {
    const res = renderToString(
      <>
        <Try>riskyOperation()</Try>
        <Finally>cleanup()</Finally>
      </>,
    );

    expect(res).toBe(d`
      try {
        riskyOperation()
      } finally {
        cleanup()
      }
    `);
  });

  it("multiple catch blocks", () => {
    const res = renderToString(
      <>
        <Try>riskyOperation()</Try>
        <Catch parameter={{ name: "e", type: "IOException" }}>handleError(e)</Catch>
        <Catch parameter={{ name: "e", type: "Exception" }}>handleOther(e)</Catch>
        <Finally>cleanup()</Finally>
      </>,
    );

    expect(res).toBe(d`
      try {
        riskyOperation()
      } catch (e: IOException) {
        handleError(e)
      } catch (e: Exception) {
        handleOther(e)
      } finally {
        cleanup()
      }
    `);
  });

  it("empty blocks", () => {
    const res = renderToString(
      <>
        <Try />
        <Catch parameter={{ name: "e", type: "E" }} />
        <Finally />
      </>,
    );

    expect(res).toBe("try {} catch (e: E) {} finally {}");
  });

  it("resolves catch parameter via refkey", () => {
    const key = refkey();
    const res = renderInTestContext(
      <>
        <Try>riskyOperation()</Try>
        <Catch parameter={{ name: "e", type: "IOException", refkey: key }}>{ref(key)}</Catch>
      </>,
    );

    expect(res).toContain(d`
      try {
        riskyOperation()
      } catch (e: IOException) {
        e
      }
    `);
  });

  it("applies name policy to catch parameter name", () => {
    const res = renderInTestContext(
      <>
        <Try>riskyOperation()</Try>
        <Catch parameter={{ name: "my_error", type: "Exception" }}>handleError()</Catch>
      </>,
    );

    expect(res).contain(d`
      try {
        riskyOperation()
      } catch (myError: Exception) {
        handleError()
      }
    `);
  });
});
