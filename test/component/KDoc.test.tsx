import { Output, refkey, render } from "@alloy-js/core";
import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Class } from "../../src/component/Class.js";
import {
  KDoc,
  KDocAuthor,
  KDocConstructor,
  KDocException,
  KDocLink,
  KDocParam,
  KDocProperty,
  KDocReceiver,
  KDocReturn,
  KDocSample,
  KDocSee,
  KDocSince,
  KDocSuppress,
  KDocThrows,
} from "../../src/component/KDoc.js";
import { PackageDirectory } from "../../src/component/PackageDirectory.js";
import { Reference } from "../../src/component/Reference.js";
import { SourceFile } from "../../src/component/SourceFile.js";
import { createKotlinNamePolicy } from "../../src/context/createKotlinNamePolicy.js";

describe("KDoc", () => {
  it("renders a comment with a single text child", () => {
    const res = renderToString(<KDoc>{"Summary text."}</KDoc>);
    expect(res).toBe(d`
      /**
       * Summary text.
       */
     `);
  });

  it("renders a comment with multiple children", () => {
    const res = renderToString(
      <KDoc>
        {"First line."}
        {"Second line."}
      </KDoc>,
    );

    expect(res).toBe(d`
      /**
       * First line.
       * Second line.
       */
     `);
  });

  it("renders multiple tags", () => {
    const res = renderToString(
      <KDoc>
        {"Summary."}
        <KDocParam name="x">The x parameter</KDocParam>
        <KDocReturn>The result</KDocReturn>
      </KDoc>,
    );

    expect(res).toBe(d`
      /**
       * Summary.
       * @param x The x parameter
       * @return The result
       */
     `);
  });
});

describe("KDocParam", () => {
  it("renders @param tag", () => {
    const res = renderToString(<KDocParam name="x">The x parameter</KDocParam>);

    expect(res).toBe("@param x The x parameter");
  });
});

describe("KDocProperty", () => {
  it("renders @property tag", () => {
    const res = renderToString(<KDocProperty name="id">The identifier</KDocProperty>);

    expect(res).toBe("@property id The identifier");
  });
});

describe("KDocReturn", () => {
  it("renders @return tag", () => {
    const res = renderToString(<KDocReturn>The result</KDocReturn>);

    expect(res).toBe("@return The result");
  });
});

describe("KDocConstructor", () => {
  it("renders @constructor tag", () => {
    const res = renderToString(<KDocConstructor>Creates an instance</KDocConstructor>);

    expect(res).toBe("@constructor Creates an instance");
  });
});

describe("KDocReceiver", () => {
  it("renders @receiver tag", () => {
    const res = renderToString(<KDocReceiver>The receiver object</KDocReceiver>);

    expect(res).toBe("@receiver The receiver object");
  });
});

describe("KDocAuthor", () => {
  it("renders @author tag", () => {
    const res = renderToString(<KDocAuthor>Jane Doe</KDocAuthor>);

    expect(res).toBe("@author Jane Doe");
  });
});

describe("KDocSince", () => {
  it("renders @since tag", () => {
    const res = renderToString(<KDocSince>1.0</KDocSince>);

    expect(res).toBe("@since 1.0");
  });
});

describe("KDocSuppress", () => {
  it("renders @suppress tag", () => {
    const res = renderToString(<KDocSuppress>UNCHECKED_CAST</KDocSuppress>);

    expect(res).toBe("@suppress UNCHECKED_CAST");
  });
});

describe("KDocThrows", () => {
  it("renders @throws with exception class name", () => {
    const res = renderToString(<KDocThrows exception="IOException" />);

    expect(res).toBe("@throws IOException");
  });

  it("renders @throws with exception and description", () => {
    const res = renderToString(<KDocThrows exception="IOException">if the file is not found</KDocThrows>);

    expect(res).toBe("@throws IOException if the file is not found");
  });

  it("resolves to simple name for symbol in same package", () => {
    const fooKey = refkey();
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="me.test.code">
          <SourceFile path="Foo.kt">
            <Class name="Foo" refkey={fooKey} />
          </SourceFile>
          <SourceFile path="Test.kt">
            <KDocThrows exception={fooKey} />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );
    expect(res).toHaveFileContents({
      "Test.kt": d`
        package me.test.code

        @throws Foo
      `,
    });
  });

  it("resolves to FQN for symbol in a different package (no import added)", () => {
    const barKey = refkey();
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="com.other">
          <SourceFile path="Bar.kt">
            <Class name="Bar" refkey={barKey} />
          </SourceFile>
        </PackageDirectory>
        <PackageDirectory package="me.test.code">
          <SourceFile path="Test.kt">
            <KDocThrows exception={barKey} />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );
    expect(res).toHaveFileContents({
      "Test.kt": d`
        package me.test.code

        @throws com.other.Bar
      `,
    });
  });

  it("resolves to simple name when symbol is already imported via Reference", () => {
    const barKey = refkey();
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="com.other">
          <SourceFile path="Bar.kt">
            <Class name="Bar" refkey={barKey} />
          </SourceFile>
        </PackageDirectory>
        <PackageDirectory package="me.test.code">
          <SourceFile path="Test.kt">
            <Reference refkey={barKey} />
            <hbr />
            <KDocThrows exception={barKey} />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );
    expect(res).toHaveFileContents({
      "Test.kt": d`
        package me.test.code

        import com.other.Bar

        Bar
        @throws Bar
      `,
    });
  });
});

describe("KDocException", () => {
  it("renders @exception with exception class name", () => {
    const res = renderToString(<KDocException exception="IOException" />);

    expect(res).toBe("@exception IOException");
  });

  it("renders @exception with exception and description", () => {
    const res = renderToString(<KDocException exception="IOException">if the file is not found</KDocException>);

    expect(res).toBe("@exception IOException if the file is not found");
  });
});

describe("KDocSee", () => {
  it("renders @see with identifier", () => {
    const res = renderToString(<KDocSee identifier="com.example.Foo" />);
    expect(res).toBe("@see com.example.Foo");
  });

  it("resolves to FQN for symbol in a different package", () => {
    const barKey = refkey();
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="com.other">
          <SourceFile path="Bar.kt">
            <Class name="Bar" refkey={barKey} />
          </SourceFile>
        </PackageDirectory>
        <PackageDirectory package="me.test.code">
          <SourceFile path="Test.kt">
            <KDocSee identifier={barKey} />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );

    expect(res).toHaveFileContents({
      "Test.kt": d`
        package me.test.code

        @see com.other.Bar
      `,
    });
  });
});

describe("KDocSample", () => {
  it("renders @sample with identifier", () => {
    const res = renderToString(<KDocSample identifier="com.example.samples.fooSample" />);
    expect(res).toBe("@sample com.example.samples.fooSample");
  });

  it("resolves to FQN for symbol in a different package", () => {
    const barKey = refkey();
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="com.other">
          <SourceFile path="Bar.kt">
            <Class name="Bar" refkey={barKey} />
          </SourceFile>
        </PackageDirectory>
        <PackageDirectory package="me.test.code">
          <SourceFile path="Test.kt">
            <KDocSample identifier={barKey} />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );

    expect(res).toHaveFileContents({
      "Test.kt": d`
        package me.test.code

        @sample com.other.Bar
      `,
    });
  });
});

describe("KDocLink", () => {
  it("renders an inline link with symbol", () => {
    const res = renderToString(<KDocLink symbol="com.example.Foo" />);

    expect(res).toBe("[com.example.Foo]");
  });

  it("renders an inline link with symbol and label", () => {
    const res = renderToString(<KDocLink symbol="com.example.Foo" label="Foo" />);

    expect(res).toBe("[Foo][com.example.Foo]");
  });

  it("renders as a standalone line in KDoc", () => {
    const res = renderToString(
      <KDoc>
        <KDocLink symbol="com.example.Foo" />
      </KDoc>,
    );

    expect(res).toBe(d`
      /**
       * [com.example.Foo]
       */
     `);
  });

  it("resolves to simple name for symbol in same package", () => {
    const fooKey = refkey();
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="me.test.code">
          <SourceFile path="Foo.kt">
            <Class name="Foo" refkey={fooKey} />
          </SourceFile>
          <SourceFile path="Test.kt">
            <KDocLink symbol={fooKey} />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );

    expect(res).toHaveFileContents({
      "Test.kt": d`
        package me.test.code

        [Foo]
      `,
    });
  });

  it("resolves to FQN for symbol in a different package", () => {
    const bar = refkey();
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="com.other">
          <SourceFile path="Bar.kt">
            <Class name="Bar" refkey={bar} />
          </SourceFile>
        </PackageDirectory>
        <PackageDirectory package="me.test.code">
          <SourceFile path="Test.kt">
            <KDocLink symbol={bar} />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );

    expect(res).toHaveFileContents({
      "Test.kt": d`
        package me.test.code

        [com.other.Bar]
      `,
    });
  });

  it("renders label with FQN when label is provided", () => {
    const bar = refkey();
    const res = render(
      <Output namePolicy={createKotlinNamePolicy()}>
        <PackageDirectory package="com.other">
          <SourceFile path="Bar.kt">
            <Class name="Bar" refkey={bar} />
          </SourceFile>
        </PackageDirectory>
        <PackageDirectory package="me.test.code">
          <SourceFile path="Test.kt">
            <KDocLink symbol={bar} label="Bar class" />
          </SourceFile>
        </PackageDirectory>
      </Output>,
      { insertFinalNewLine: false },
    );

    expect(res).toHaveFileContents({
      "Test.kt": d`
        package me.test.code

        [Bar class][com.other.Bar]
      `,
    });
  });
});
