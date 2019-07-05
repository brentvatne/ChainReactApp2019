import I18n from "i18n-js"
import * as Localization from "expo-localization"

const en = require("./locales/en.json")
const ja = require("./locales/ja.json")

function normalize(locale) {
  if (locale.includes("-")) {
    return locale.split("-")[0]
  }

  return locale
}

I18n.locale = normalize(Localization.locale)

I18n.fallbacks = true
I18n.translations = {
  en,
  ja,
}

export default I18n
