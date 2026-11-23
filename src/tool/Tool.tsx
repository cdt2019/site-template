"use client";

/**
 * 核心工具组件 —— 每个新站主要替换这个文件（以及 analyze.ts 这类逻辑文件）。
 * 外层的「工作台」框架（标题栏、点阵底纹）可以保留复用。
 */
import { useMemo, useState } from "react";
import { Check, Copy, Eraser, Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { analyze, convertCase, type CaseMode } from "./analyze";

type Props = { t: Dictionary["tool"] };

const CASES: CaseMode[] = ["upper", "lower", "title", "sentence", "alternating"];

export function Tool({ t }: Props) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => analyze(text), [text]);

  const fmt = (sec: number) => {
    if (sec < 60) return `${sec}${t.seconds}`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return s ? `${m}${t.minutes} ${s}${t.seconds}` : `${m}${t.minutes}`;
  };

  const copy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const secondary = [
    { label: t.stats.characters, value: stats.characters.toLocaleString() },
    { label: t.stats.charactersNoSpaces, value: stats.charactersNoSpaces.toLocaleString() },
    { label: t.stats.sentences, value: stats.sentences.toLocaleString() },
    { label: t.stats.paragraphs, value: stats.paragraphs.toLocaleString() },
    { label: t.stats.readingTime, value: fmt(stats.readingSeconds) },
    { label: t.stats.speakingTime, value: fmt(stats.speakingSeconds) },
  ];

  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-card shadow-[0_1px_0_rgb(0_0_0/0.04),0_30px_80px_-40px_rgb(0_0_0/0.35)]">
      {/* 标题栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <p className="label-mono flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          {t.label} · live
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-line" onClick={() => setText(t.sample)}>
            <Sparkles className="size-3.5" /> {t.trySample}
          </button>
          <button type="button" className="btn-line" onClick={copy} disabled={!text}>
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? t.copied : t.copy}
          </button>
          <button type="button" className="btn-line" onClick={() => setText("")} disabled={!text}>
            <Eraser className="size-3.5" /> {t.clear}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px]">
        {/* 输入区 */}
        <div className="dot-grid relative border-b border-line lg:border-r lg:border-b-0">
          <label htmlFor="tool-input" className="sr-only">
            {t.placeholder}
          </label>
          <textarea
            id="tool-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            spellCheck
            className="block min-h-[320px] w-full resize-y bg-transparent p-5 text-[1.05rem] leading-relaxed text-ink outline-none placeholder:text-ink-3 sm:min-h-[400px] sm:p-7"
          />
        </div>

        {/* 统计面板 */}
        <aside className="flex flex-col">
          <div className="border-b border-line p-5 sm:p-6">
            <p className="label-mono">{t.stats.words}</p>
            <p className="mt-1 font-serif text-7xl leading-none tabular-nums tracking-tight sm:text-8xl">
              {stats.words.toLocaleString()}
            </p>
          </div>

          <dl className="grid grid-cols-2 border-b border-line">
            {secondary.map((s, i) => (
              <div
                key={s.label}
                className={`p-4 sm:px-6 ${i % 2 === 0 ? "border-r border-line" : ""} ${
                  i < secondary.length - 2 ? "border-b border-line" : ""
                }`}
              >
                <dt className="text-xs text-ink-3">{s.label}</dt>
                <dd className="mt-1 font-mono text-lg tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex-1 p-5 sm:p-6">
            <p className="label-mono">{t.keywordsTitle}</p>
            {stats.keywords.length ? (
              <ul className="mt-3 space-y-2.5">
                {stats.keywords.map((k) => (
                  <li key={k.word} className="text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="truncate">{k.word}</span>
                      <span className="font-mono text-xs text-ink-3">
                        {k.count} · {(k.share * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-1 h-1 rounded-full bg-paper-2">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.max(6, (k.count / stats.keywords[0].count) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-3">{t.keywordsEmpty}</p>
            )}
          </div>
        </aside>
      </div>

      {/* 大小写转换 */}
      <div className="flex flex-wrap items-center gap-2 border-t border-line bg-paper-2/50 px-4 py-3 sm:px-5">
        <span className="label-mono mr-2">{t.caseTitle}</span>
        {CASES.map((mode) => (
          <button
            key={mode}
            type="button"
            disabled={!text}
            onClick={() => setText(convertCase(text, mode))}
            className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm transition hover:border-ink hover:bg-accent hover:text-accent-ink disabled:pointer-events-none disabled:opacity-40"
          >
            {t.cases[mode]}
          </button>
        ))}
      </div>
    </div>
  );
}
