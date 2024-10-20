export const escapeChars = [
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['&', '&amp;'],
    ['"', '&quot;'],
    ["'", '&#39;'],
];

export const escape = (str: string) => {
    return escapeChars.reduce((acc, [char, escape]) => {
        return acc.replace(new RegExp(char, 'g'), escape);
    }, str);
};
