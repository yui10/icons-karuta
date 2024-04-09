import { IconData } from "simple-icons/sdk";
import { randomInt, toHeadUpper } from "./commonUtil";

const REPLACE_MAP: { [key: string]: string } = {
    ' ': '',
    '+': 'plus',
    '.': 'dot',
    '&': 'and'
};
const REPLACE_MAP_REGEX = new RegExp(`[${Object.keys(REPLACE_MAP).join('')}]`, 'g');

export const slugReplace = (slug: string) => {
    const replace_slug = slug.toLowerCase()
        .replace(REPLACE_MAP_REGEX, (match) => REPLACE_MAP[match]).normalize('NFD')
        .replace(/[^a-z\d]/g, '');
    return replace_slug;
}

export const parseSlug = (slug: string) => {
    const replace_slug = slugReplace(slug);
    const iconKeys = toHeadUpper(replace_slug);
    return iconKeys;
}

export const createIconsUrl = (icon: IconData, index = -1) => {
    const slug = icon.slug ?? parseSlug(icon.title);
    const urls = [
        `https://cdn.simpleicons.org/${slug}/black`,
        `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`,
        `/api/icons?slug=${slug}`
    ];

    if (index == -1) {
        index = randomInt(0, urls.length - 1);
    }
    return urls[index];
}
