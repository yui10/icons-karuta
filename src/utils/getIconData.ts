import * as simpleIcons from 'simple-icons';
import { parseSlug } from './iconUtil';
import { toHeadUpper } from './commonUtil';

export const getIconSlugs = () => {
    return Object.keys(simpleIcons);
}

export const getIcon = (slug: string) => {
    if (!slug) return null;
    const iconKeys = 'si' + parseSlug(slug);
    // titleの場合はparseSlugして取得
    if (iconKeys in simpleIcons) {
        return (simpleIcons as any)[iconKeys];
    }
    // slugの場合はキャメルケースに変換して取得
    const upperSlug = 'si' + toHeadUpper(slug);
    if (upperSlug in simpleIcons) {
        return (simpleIcons as any)[upperSlug];
    }
    console.error(`Icon not found: ${slug} (${iconKeys}, ${upperSlug})`);
    return null;
}