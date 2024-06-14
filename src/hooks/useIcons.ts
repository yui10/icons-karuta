import { randomInt } from "@/utils/commonUtil";
import { fetchSlugs } from "@/utils/iconUtil";
import { use, useEffect, useState } from "react";
import { IconData } from "simple-icons/sdk";

const useIcons = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [icons, setIcons] = useState<IconData[]>([]);
    
    useEffect(() => {
        loadIcons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadIcons = () => {
        (async () => {
            let iconSlugList = await fetchSlugs();
            if (iconSlugList.length > 0) {
                setIcons([...iconSlugList]);
                setLoaded(true);
            }
        })();
    }

    return { loaded, icons };
};

export default useIcons;
