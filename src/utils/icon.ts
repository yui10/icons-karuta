import * as simpleIcons from 'simple-icons';

export const getIcon = (slug: string) => {
    if (!slug) return null;
    const replace_slug = slug.toLowerCase().replaceAll(' ', 'plus').replaceAll('+', 'plus').replaceAll('.', 'dot');
    const iconKeys = 'si' + replace_slug.charAt(0).toUpperCase() + replace_slug.slice(1);
    if (iconKeys in simpleIcons) {
        return (simpleIcons as any)[iconKeys];
    }
    return null;
}
