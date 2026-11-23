"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** 放在 layout 里：配置了 adsenseClient 才加载 AdSense 脚本 */
export function AdSenseScript() {
  if (!siteConfig.adsenseClient) return null;
  return (
    <Script
      id="adsense"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
    />
  );
}

/**
 * 广告位：<AdSlot slot="1234567890" />
 * 未配置 adsenseClient 时，开发环境显示虚线占位框，生产环境不渲染。
 */
export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!siteConfig.adsenseClient || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (!siteConfig.adsenseClient) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div
        className={`label-mono grid min-h-24 place-items-center rounded-2xl border border-dashed border-line ${className}`}
      >
        Ad slot · {slot}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      data-ad-client={siteConfig.adsenseClient}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
