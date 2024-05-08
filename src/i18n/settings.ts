export const defaultLanguage = 'ja';
export const availableLanguages = [defaultLanguage, 'en'];
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
