/** 纯函数：文本统计逻辑（与 UI 解耦，方便单测和复用） */

const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿가-힯]/g;
const WORD = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;

const STOPWORDS = new Set(
  "a an the and or but if of to in on at by for with from as is are was were be been it its this that these those i you he she we they me my your our their not no so do does did has have had will would can could should than then there here what which who when where why how all any some just very into about over also".split(
    " ",
  ),
);

export type TextStats = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingSeconds: number;
  speakingSeconds: number;
  keywords: { word: string; count: number; share: number }[];
};

export function analyze(text: string): TextStats {
  const cjkCount = (text.match(CJK) ?? []).length;
  const latin = text.replace(CJK, " ").match(WORD) ?? [];
  const words = cjkCount + latin.length;
  const trimmed = text.trim();

  const freq = new Map<string, number>();
  for (const w of latin) {
    const k = w.toLowerCase();
    if (k.length < 3 || STOPWORDS.has(k) || /^\d+$/.test(k)) continue;
    freq.set(k, (freq.get(k) ?? 0) + 1);
  }
  const keywords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([word, count]) => ({ word, count, share: latin.length ? count / latin.length : 0 }));

  return {
    words,
    characters: [...text].length,
    charactersNoSpaces: [...text.replace(/\s/g, "")].length,
    // 英文标点后面要跟空白或结尾才算句末，3.5、example.com 不会被拆开
    sentences: trimmed ? trimmed.split(/[.!?]+(?=[\s"'”’)]|$)|[。！？]+/).filter((s) => /[\p{L}\p{N}]/u.test(s)).length : 0,
    paragraphs: trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0,
    readingSeconds: Math.round((words / 238) * 60),
    speakingSeconds: Math.round((words / 140) * 60),
    keywords,
  };
}

export type CaseMode = "upper" | "lower" | "title" | "sentence" | "alternating";

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.toLowerCase().replace(/(^|[\s\-“"(\[])(\p{L})/gu, (_, p, c) => p + c.toUpperCase());
    case "sentence":
      return text
        .toLowerCase()
        .replace(/(^\s*|[.!?。！？]\s+|\n\s*)(\p{L})/gu, (_, p, c) => p + c.toUpperCase());
    case "alternating": {
      let i = 0;
      return [...text]
        .map((ch) => (/\p{L}/u.test(ch) ? (i++ % 2 ? ch.toUpperCase() : ch.toLowerCase()) : ch))
        .join("");
    }
  }
}
