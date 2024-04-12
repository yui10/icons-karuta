import { getIcon } from '@/utils/getIconData';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = new Headers();
    headers.set('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    const icon = getIcon(slug as string);
    if (!icon) {
        return NextResponse.json({ message: 'Not found' }, { status: 404, headers });
    }
    headers.set('Content-Type', 'image/svg+xml');
    return new Response(icon.svg, { status: 200, statusText: "OK", headers });
}
