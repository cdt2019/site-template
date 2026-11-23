import { notFound } from "next/navigation";

/** 兜底路由：所有未匹配的路径都渲染本语言的 404 页面 */
export default function CatchAll() {
  notFound();
}
