/**
 * 英文字典：所有页面文案都在这里，同时也是类型定义的来源。
 * 新增语言时复制本文件，保持结构一致（TypeScript 会检查缺漏）。
 */
const en = {
  meta: {
    title: "Word Counter — Free Online Word & Character Count Tool",
    description:
      "Count words, characters, sentences and reading time instantly. Convert text case in one click. Free, private, no sign-up — everything runs in your browser.",
  },
  nav: {
    tool: "Tool",
    how: "How it works",
    features: "Features",
    faq: "FAQ",
    blog: "Blog",
    cta: "Try it free",
    language: "Language",
    theme: "Toggle theme",
  },
  hero: {
    eyebrow: "Free · Private · No sign-up",
    titleBefore: "Count every word,",
    titleEmphasis: "instantly",
    titleAfter: ".",
    subtitle:
      "Paste or type your text. Get words, characters, sentences and reading time in real time — then fix the casing in one click.",
    badges: ["Runs 100% in your browser", "No sign-up", "No data stored"],
  },
  tool: {
    label: "Workbench",
    placeholder: "Start typing, or paste your text here…",
    sample:
      "The quick brown fox jumps over the lazy dog. Writing is thinking made visible — so make every word count.",
    trySample: "Load sample",
    copy: "Copy",
    copied: "Copied",
    clear: "Clear",
    stats: {
      words: "Words",
      characters: "Characters",
      charactersNoSpaces: "No spaces",
      sentences: "Sentences",
      paragraphs: "Paragraphs",
      readingTime: "Reading",
      speakingTime: "Speaking",
    },
    minutes: "m",
    seconds: "s",
    caseTitle: "Change case",
    cases: {
      upper: "UPPERCASE",
      lower: "lowercase",
      title: "Title Case",
      sentence: "Sentence case",
      alternating: "aLtErNaTe",
    },
    keywordsTitle: "Top keywords",
    keywordsEmpty: "Keywords appear as you type.",
  },
  marquee: [
    "Essays",
    "Blog posts",
    "Tweets",
    "Meta descriptions",
    "Cover letters",
    "College applications",
    "Ad copy",
    "Product pages",
  ],
  how: {
    index: "01",
    label: "How it works",
    title: "Three steps. Zero friction.",
    steps: [
      {
        title: "Paste your text",
        body: "Drop in anything — an essay, a tweet, a product page. No upload, no account.",
      },
      {
        title: "Read the numbers",
        body: "Words, characters, sentences and reading time update live as you edit.",
      },
      {
        title: "Polish & copy",
        body: "Fix casing in one click, check keyword density, then copy the result.",
      },
    ],
  },
  features: {
    index: "02",
    label: "Features",
    title: "Small tool. Sharp edges.",
    items: [
      {
        title: "Real-time counting",
        body: "Every keystroke updates words, characters, sentences and paragraphs — no button to press.",
      },
      {
        title: "Private by design",
        body: "Your text never leaves your device. Nothing is uploaded, logged or stored.",
      },
      {
        title: "Reading & speaking time",
        body: "Know how long your piece takes to read (238 wpm) or present out loud (140 wpm).",
      },
      {
        title: "One-click case conversion",
        body: "UPPERCASE, lowercase, Title Case and Sentence case without retyping a thing.",
      },
      {
        title: "Keyword density",
        body: "See which words you lean on most — useful for SEO copy and tightening prose.",
      },
      {
        title: "Works everywhere",
        body: "Desktop, tablet or phone. Light or dark. Fast on any connection.",
      },
    ],
  },
  faq: {
    index: "03",
    label: "FAQ",
    title: "Questions, answered.",
    items: [
      {
        q: "Is this word counter free?",
        a: "Yes. It is completely free with no limits, no sign-up and no watermark.",
      },
      {
        q: "Is my text saved or uploaded anywhere?",
        a: "No. All counting happens locally in your browser. Your text is never sent to a server.",
      },
      {
        q: "How is reading time calculated?",
        a: "We use an average adult silent reading speed of 238 words per minute, and 140 words per minute for speaking time.",
      },
      {
        q: "Does it count words in Chinese, Japanese and Korean?",
        a: "Yes. CJK characters are each counted as one word, which matches how most editors count them.",
      },
      {
        q: "What counts as a sentence?",
        a: "A sentence ends with a period, question mark or exclamation mark (including full-width CJK punctuation).",
      },
    ],
  },
  cta: {
    title: "Your next draft deserves better numbers.",
    button: "Start counting",
  },
  footer: {
    tagline: "A small, fast, private tool for people who write.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    about: "About",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    rights: "All rights reserved.",
  },
  blog: {
    index: "Journal",
    title: "Notes on writing better",
    description: "Guides and tips on word counts, readability and writing for the web.",
    readMore: "Read article",
    back: "All articles",
    minRead: "min read",
    empty: "No articles yet.",
  },
  about: {
    title: "About",
    description: "Why we built a word counter that respects your privacy.",
    body: [
      "We built this tool because most word counters are slow, cluttered, or quietly upload what you paste.",
      "This one runs entirely in your browser. It is fast, needs no account, and your words stay yours.",
      "Have feedback or a feature request? We read every email.",
    ],
  },
  legal: {
    updated: "Last updated",
    privacy: {
      title: "Privacy Policy",
      description: "How we handle your data (short version: we don't collect your text).",
      sections: [
        {
          h: "Your text",
          p: "Text you enter into the tool is processed locally in your browser and is never transmitted to or stored on our servers.",
        },
        {
          h: "Your preferences",
          p: "Your theme choice is saved in your browser's local storage. It stays on your device.",
        },
        {
          h: "Analytics",
          requires: "analytics",
          p: "We use Google Analytics to understand aggregate usage like page views. Google may set cookies and process your IP address and device information.",
        },
        {
          h: "Advertising",
          requires: "ads",
          p: "We display ads served by Google AdSense. Google and its partners may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising at Google Ads Settings.",
        },
        {
          h: "Contact",
          p: "Questions about this policy? Email us at the address below.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      description: "The rules for using this website.",
      sections: [
        {
          h: "Use of the service",
          p: "This tool is provided free of charge, as is, without warranties of any kind. You are responsible for the content you process with it.",
        },
        {
          h: "Accuracy",
          p: "We strive for accurate counts, but results may differ slightly from other software. Do not rely on them where exactness is legally required.",
        },
        {
          h: "Changes",
          p: "We may update these terms from time to time. Continued use of the site means you accept the current terms.",
        },
      ],
    },
  },
  notFound: {
    title: "Page not found",
    body: "This page doesn't exist — but the tool does.",
    back: "Back to the tool",
  },
};

export type Dictionary = typeof en;
export default en;
