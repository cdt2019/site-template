import { NotFoundView } from "@/components/NotFoundView";
import en from "@/i18n/dictionaries/en";
import zh from "@/i18n/dictionaries/zh";

/** not-found 拿不到 params，所以把各语言文案都传给客户端组件，按 URL 选择 */
export default function NotFound() {
  return <NotFoundView texts={{ en: en.notFound, zh: zh.notFound }} />;
}
