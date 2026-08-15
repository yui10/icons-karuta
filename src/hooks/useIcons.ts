import { fetchSlugs } from "@/utils/iconUtil";
import { useCallback, useEffect, useState } from "react";
import { IconData } from "simple-icons/sdk";

const useIcons = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [icons, setIcons] = useState<IconData[]>([]);

    const loadIcons = useCallback(() => {
        (async () => {
            const iconSlugList = await fetchSlugs();
            if (iconSlugList.length > 0) {
                setIcons([...iconSlugList]);
                setLoaded(true);
            }
        })();
    }, []);

    useEffect(() => {
        loadIcons();
    }, [loadIcons]);

    return { loaded, icons };
};

export default useIcons;
