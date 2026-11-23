import { describe, expect, it } from "vitest";
import { analyze, convertCase } from "@/tool/analyze";

describe("analyze", () => {
  it("returns zeros for empty and whitespace-only text", () => {
    for (const text of ["", "   \n\n  "]) {
      expect(analyze(text)).toMatchObject({ words: 0, sentences: 0, paragraphs: 0, readingSeconds: 0, speakingSeconds: 0, keywords: [] });
    }
  });

  it("counts words, keeping contractions and hyphenated words whole", () => {
    expect(analyze("Hello world").words).toBe(2);
    expect(analyze("don't well-known it’s").words).toBe(3);
    expect(analyze("  spaced    out\twords\n").words).toBe(3);
  });

  it("counts each CJK character as a word", () => {
    expect(analyze("你好世界").words).toBe(4);
    expect(analyze("こんにちは").words).toBe(5);
    expect(analyze("你好 world").words).toBe(3);
  });

  it("counts characters by code point", () => {
    expect(analyze("a b").characters).toBe(3);
    expect(analyze("a b").charactersNoSpaces).toBe(2);
    expect(analyze("😀").characters).toBe(1);
  });

  it("counts sentences in English and Chinese", () => {
    expect(analyze("One. Two! Three?").sentences).toBe(3);
    expect(analyze("第一句。第二句！第三句？").sentences).toBe(3);
    expect(analyze("Wait... what?!").sentences).toBe(2);
    expect(analyze("No ending punctuation").sentences).toBe(1);
  });

  it("doesn't split sentences inside numbers or addresses", () => {
    expect(analyze("Version 3.5 costs $9.99 today.").sentences).toBe(1);
    expect(analyze("Visit example.com for details.").sentences).toBe(1);
  });

  it("counts paragraphs separated by blank lines", () => {
    expect(analyze("One\n\nTwo\n \nThree").paragraphs).toBe(3);
    expect(analyze("Line one\nLine two").paragraphs).toBe(1);
    expect(analyze("One\r\n\r\nTwo").paragraphs).toBe(2);
  });

  it("estimates reading and speaking time", () => {
    const text = Array(238).fill("word").join(" ");
    expect(analyze(text).readingSeconds).toBe(60);
    expect(analyze(text).speakingSeconds).toBe(102);
  });

  it("ranks keywords, ignoring stopwords, short words and numbers", () => {
    const { keywords } = analyze("The apple and the apple and banana 2024 ok");
    expect(keywords.map((k) => k.word)).toEqual(["apple", "banana"]);
    expect(keywords[0].count).toBe(2);
    expect(keywords[0].share).toBeCloseTo(2 / 9);
  });

  it("is case-insensitive, breaks ties alphabetically and returns at most five", () => {
    expect(analyze("Apple APPLE apple").keywords).toHaveLength(1);
    expect(analyze("zebra yak walrus viper urchin tiger").keywords.map((k) => k.word)).toEqual(["tiger", "urchin", "viper", "walrus", "yak"]);
  });
});

describe("convertCase", () => {
  it("converts upper and lower case", () => {
    expect(convertCase("Hello World", "upper")).toBe("HELLO WORLD");
    expect(convertCase("Hello World", "lower")).toBe("hello world");
  });

  it("converts title case", () => {
    expect(convertCase("the qUICK brown-fox", "title")).toBe("The Quick Brown-Fox");
    expect(convertCase('say "hello there"', "title")).toBe('Say "Hello There"');
  });

  it("converts sentence case", () => {
    expect(convertCase("HELLO THERE. HOW ARE YOU? fine!", "sentence")).toBe("Hello there. How are you? Fine!");
    expect(convertCase("first line\nsecond line", "sentence")).toBe("First line\nSecond line");
  });

  it("alternates letters and skips other characters", () => {
    expect(convertCase("abcd", "alternating")).toBe("aBcD");
    expect(convertCase("a b-c 1 d", "alternating")).toBe("a B-c 1 D");
  });

  it("leaves empty text and non-letters alone", () => {
    for (const mode of ["upper", "lower", "title", "sentence", "alternating"] as const) {
      expect(convertCase("", mode)).toBe("");
      expect(convertCase("123 !?", mode)).toBe("123 !?");
    }
  });
});
