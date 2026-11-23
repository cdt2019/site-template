import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * 语言路由（as-needed 前缀）：
 *   /            -> 内部改写到 /en        （默认语言不带前缀，对 SEO 更友好）
 *   /en/xxx      -> 308 重定向到 /xxx     （避免重复内容）
 *   /zh/xxx      -> 直接放行
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first] = pathname.split("/");
  const def = siteConfig.defaultLocale;

  if (first === def) {
    // OG 图片等元数据路由由 Next 生成带默认语言前缀的地址，不做重定向
    if (pathname.includes("opengraph-image")) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(def.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if ((siteConfig.locales as readonly string[]).includes(first)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${def}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // 跳过 Next 内部资源、API、favicon、以及带扩展名的静态文件（sitemap.xml / robots.txt / 图片等）
  matcher: ["/((?!_next|api|icon|apple-icon|.*\\..*).*)"],
};
