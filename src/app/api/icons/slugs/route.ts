import { NextResponse } from "next/server";
import * as icons from 'simple-icons';
import { IconData } from 'simple-icons/sdk';

type CachedData = {
    timestamp: number;
    icons: IconData[];
};

let data: CachedData | null = null;
let initPromise: Promise<CachedData> | null = null;

const loadIcons = async (): Promise<CachedData> => {
    const _icons: IconData[] = Object.values(icons);
    return { timestamp: Date.now(), icons: _icons };
}

const getCachedData = async (): Promise<CachedData> => {
    if (data != null) {
        return data;
    }

    if (initPromise != null) {
        return initPromise;
    }

    initPromise = loadIcons().then((loadedData) => {
        data = loadedData;
        return data;
    }).catch((err) => {
        console.error(err);
        data = { timestamp: 0, icons: [] };
        return data;
    });

    return initPromise;
}

initPromise = getCachedData();

export async function GET() {
    const headers = new Headers();
    headers.set('Cache-Control', 's-maxage=604800, stale-while-revalidate');
    headers.set('Content-Type', 'application/json');

    try {
        const data = await getCachedData();
        return NextResponse.json(data.icons, { status: 200, headers });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to load icons data.' }, { status: 500, headers });
    }
}

