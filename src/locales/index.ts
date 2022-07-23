import { Locale } from '@/store/slice/locale'
import zhCN from '@/locales/zh_CN'
import enUS from '@/locales/en_US'

const locales: Record<Locale, Record<string, string>> = {
  'zh-CN': zhCN,
  'ko-KR': zhCN,
  'en-US': enUS
}

export default locales
