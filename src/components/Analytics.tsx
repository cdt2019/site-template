import Script from "next/script";
import { siteConfig } from "@/config/site";

/** Google Analytics 4：配置 NEXT_PUBLIC_GA_ID 后自动启用 */
export function Analytics() {
  const id = siteConfig.gaId;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
