import { Children, Output } from "@alloy-js/core";
import { renderToString } from "@alloy-js/core/testing";
import { PackageDirectory } from "../src/component/PackageDirectory.js";
import { SourceFile } from "../src/component/SourceFile.js";
import { createKotlinNamePolicy } from "../src/context/createKotlinNamePolicy.js";

export function renderInTestContext(children: Children): string {
  return renderToString(
    <Output namePolicy={createKotlinNamePolicy()}>
      <PackageDirectory package="me.test.code">
        <SourceFile path="Test.kt">{children}</SourceFile>
      </PackageDirectory>
    </Output>,
  );
}
