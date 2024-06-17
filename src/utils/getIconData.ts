// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import * as simpleIcons from 'simple-icons';
import { toHeadUpper } from './commonUtil';
import { parseSlug } from './iconUtil';

export const getIconSlugs = () => {
    return Object.keys(simpleIcons);
}

export const getIcon = (slug: string) => {
    if (!slug) return null;
    const iconKeys = 'si' + parseSlug(slug);
    // titleの場合はparseSlugして取得
    if (iconKeys in simpleIcons) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (simpleIcons as any)[iconKeys];
    }
    // slugの場合はキャメルケースに変換して取得
    const upperSlug = 'si' + toHeadUpper(slug);
    if (upperSlug in simpleIcons) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (simpleIcons as any)[upperSlug];
    }
    console.error(`Icon not found: ${slug} (${iconKeys}, ${upperSlug})`);
    return null;
}
