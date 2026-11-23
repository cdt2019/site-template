import type { MDXComponents } from "mdx/types";
import { AdSlot } from "@/components/Ads";

/** MDX 全局组件：可以在 .mdx 文章里直接写 <AdSlot slot="..." /> 或 <Callout> */
const components: MDXComponents = {
  AdSlot,
  Callout: ({ children }) => (
    <div className="rounded-2xl border border-line bg-card p-5 text-ink not-italic">{children}</div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
