import * as fs from "fs";
import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import { IconData, getIconDataPath } from 'simple-icons/sdk';
let icons: IconData[] = [];
const loadIcons = () => {
    try {
        const data = fs.readFileSync(getIconDataPath("node_modules/simple-icons"), { encoding: "utf8" });
        const icons: IconData[] = JSON.parse(data)["icons"];
        return icons;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

loadIcons();

export async function GET() {
    const headers = new Headers();
    headers.set('Cache-Control', 's-maxage=31536000, stale-while-revalidate');

    if (icons.length == 0) {
        const load = fs.readFileSync(getIconDataPath("node_modules/simple-icons"), { encoding: "utf8" });
        icons = JSON.parse(load)["icons"];
    }

    headers.set('Content-Type', 'application/json');
    return NextResponse.json(icons, { status: 200, headers });
}

