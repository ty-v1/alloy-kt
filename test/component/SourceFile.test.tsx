import { Output, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Class } from "../../src/component/Class.js";
import { PackageDirectory } from "../../src/component/PackageDirectory.js";
import { SourceFile } from "../../src/component/SourceFile.js";
import { createKotlinNamePolicy } from "../../src/context/createKotlinNamePolicy.js";

describe("SourceFile", () => {
  it("renders package declaration and class", () => {
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="com.example">
          <SourceFile path="Foo.kt">
            <Class name="Foo" />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );

    expect(res).toHaveFileContents({
      "Foo.kt": d`
        package com.example

        class Foo {}
      `,
    });
  });

  it("renders a source file with no body", () => {
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="com.example">
          <SourceFile path="Empty.kt" />
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );

    expect(res).toHaveFileContents({
      "Empty.kt": "package com.example\n\n\n",
    });
  });
});
