export const defaultLanguage = 'ja';
export const availableLanguagesLabels = [{ "lang": "ja", "label": "日本語" }, { "lang": "en", "label": "English" }];
export const availableLanguages = availableLanguagesLabels.map((lang) => lang.lang);
export const defaultNS = 'translation';
export const namespaces = [defaultNS, 'game', 'home'];
export const cookieName = 'icons-karuta-lang';

export function getOptions(lang: string = defaultLanguage) {
    return {
        lang,
        fallbackLng: defaultLanguage,
        supportedLngs: availableLanguages,
        ns: namespaces,
        defaultNS,
        fallbackNS: defaultNS,
    };
}
