# 把模板改成你的工具站

English: [customization.md](customization.md)

演示工具是 **Wordsmith**（字数统计）。换成你的工具，主要分五步。

## 1. 选一个关键词

一个站只解决一个明确的搜索需求，比如 "word counter" 或 "json formatter"。把这个词原样写进标题、首屏主标题、FAQ 和第一篇博客。

## 2. 改品牌

编辑 `src/config/site.ts`：

```ts
export const siteConfig = {
  name: "YourTool",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@yourdomain.com",
  twitter: "",
  locales: ["en", "zh"] as const,
  defaultLocale: "en" as const,
  // ...
};
```

然后改 `src/app/globals.css` 顶部的颜色变量、`src/components/Logo.tsx` 的 Logo，以及 `package.json` 的 `name`。

## 3. 替换工具

| 文件 | 作用 |
| --- | --- |
| `src/tool/analyze.ts` | 纯逻辑，换成你的工具函数 |
| `src/tool/Tool.tsx` | 首页上的工具界面 |
| `tests/analyze.test.ts` | 逻辑的单元测试 |

逻辑和界面分开，不开浏览器也能测试。

如果你的工具要把输入发到服务器，**一定要改文案**。演示版在首屏标签、功能介绍、FAQ、关于页和隐私政策里都承诺了文本只留在浏览器。

## 4. 改文案

所有文字都在 `src/i18n/dictionaries/en.ts` 和 `zh.ts`，至少要改：

- `meta`：页面标题和描述
- `hero`：主标题和标签
- `tool`：工具界面文字
- `how`、`features`、`faq`：首页各板块
- `about`、`legal`：关于、隐私和条款

某个语言缺字段时，TypeScript 会报错。隐私政策和服务条款请按你的网站实际情况审核。

## 5. 发内容

文章放在 `src/content/blog/<语言>/<slug>.mdx`：

```mdx
export const meta = {
  title: "How many words is a blog post?",
  description: "Recommended lengths by post type.",
  date: "2026-01-15",
};

这里写 Markdown 正文。
```

不同语言用同一个 slug，文章之间才会互相关联。开始时写两三篇长尾文章就够了。

## 新增语言

1. 在 `src/config/site.ts` 的 `locales`、`localeLabels`、`localeTags` 里加上。
2. 把 `src/i18n/dictionaries/en.ts` 复制成比如 `ja.ts` 并翻译。
3. 在 `src/i18n/index.ts` 和 `src/app/[lang]/not-found.tsx` 里注册。

默认语言的网址不带前缀，其他语言带前缀，比如 `/zh`。

## 广告和统计

默认都不开启，配置后才生效：

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- 用 `<AdSlot slot="你的广告单元ID" />` 放广告。模板里两个广告位 ID 是占位值，要换成你自己的。
- 没配 AdSense 时，开发环境显示虚线占位框，线上什么都不显示。
- 隐私政策里的统计和广告说明，只有配置后才会显示。
- **模板没有 Cookie 同意弹窗。** 如果访客来自欧洲经济区、英国或瑞士，开启广告或统计前需要接入同意方案。

## 上线清单

- [ ] `NEXT_PUBLIC_SITE_URL` 是真实域名，结尾不带 `/`
- [ ] 品牌、邮箱、Logo、颜色都换了
- [ ] 文案里没有残留 "Wordsmith"
- [ ] 隐私政策和网站实际行为一致
- [ ] `npm run lint`、`npm run typecheck`、`npm test`、`npm run build` 都通过
- [ ] `/sitemap.xml` 和 `/robots.txt` 显示的是你的域名
- [ ] 在 Google Search Console 提交 sitemap

## 部署

- **Vercel：** 导入仓库即可。免费的 Hobby 套餐不允许商用。
- **Node.js 服务器或 VPS：** 运行 `npm run build`，然后 `npm start`。
- **Cloudflare Workers：** 模板用 proxy 做语言路由，需要 `@opennextjs/cloudflare` 适配器。这条路径还没测试过。
