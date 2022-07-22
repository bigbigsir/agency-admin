import { State } from '@/store/slice/locale'
import zhCN from '@/locales/zh_CN'
import enUS from '@/locales/en_US'

const locales: Record<State, Record<string, string>> = {
  'zh-CN': zhCN,
  'ko-KR': zhCN,
  'en-US': enUS
}

export default locales
