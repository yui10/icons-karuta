import { fetchSlugs } from "@/utils/iconUtil";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import { IconData } from "simple-icons/sdk";

const useIcons = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [icons, setIcons] = useState<IconData[]>([]);

    useEffect(() => {
        loadIcons();
    }, []);

    const loadIcons = () => {
        (async () => {
            const iconSlugList = await fetchSlugs();
            if (iconSlugList.length > 0) {
                setIcons([...iconSlugList]);
                setLoaded(true);
            }
        })();
    }

    return { loaded, icons };
};

export default useIcons;
