// src/pickers/antd/antdLocales.ts
import koKR from 'antd/locale/ko_KR'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import { Locale } from 'antd/lib/locale'
import { SupportedLocale } from '@/contexts/LocaleContext'

export const ANTD_LOCALES: Record<SupportedLocale, Locale> = {
  ko: koKR,
  en: enUS,
  ja: jaJP,
}
