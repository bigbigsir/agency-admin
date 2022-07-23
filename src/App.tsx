import React from 'react'
import 'moment/locale/zh-cn'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { getLocaleSelector, Locale } from '@/store/slice/locale'
import { Locale as AntdLocale } from 'antd/es/locale-provider'
import { useSelector } from 'react-redux'
import Router from '@/router'
import locales from '@/locales'
import antdEnUS from 'antd/es/locale/en_US'
import antdZhCN from 'antd/es/locale/zh_CN'
import antdKoKR from 'antd/es/locale/ko_KR'

function App () {
  const locale = useSelector(getLocaleSelector)
  const antdLocales: Record<Locale, AntdLocale> = {
    'zh-CN': antdZhCN,
    'ko-KR': antdKoKR,
    'en-US': antdEnUS
  }

  function onError (e: any) {
    console.log(e)
  }

  return (
    <ConfigProvider componentSize={'middle'} locale={antdLocales[locale]}>
      <IntlProvider onError={onError} locale={locale} messages={locales[locale]}>
        <Router/>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
