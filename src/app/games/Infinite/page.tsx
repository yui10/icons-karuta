'use client'
import styles from "../../page.module.css";
import { IconData } from "simple-icons/sdk";
import { useEffect, useState } from "react";
import { randomInt } from "@/utils/commonUtil";
import GameUI from "@/components/GameUI";
import { Button } from "@mui/material";
import { fetchSlugs, randomIcons } from "@/utils/iconUtil";

let iconSlugList: IconData[];
const Infinite = () => {
    const [correctIcon, setCorrectIcon] = useState<IconData>();
    const [iconList, setIconList] = useState<IconData[]>([]);
    useEffect(() => {
        (async () => {
            iconSlugList = await fetchSlugs();
            onNextClick();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onNextClick = () => {
        const _iconList = randomIcons(iconSlugList, 12);
        setIconList(_iconList);
        setCorrectIcon(_iconList[randomInt(0, _iconList.length - 1)]);
    }

    return (
        <main className={styles.main}>
            <GameUI correctIcon={correctIcon} iconList={iconList} onNextGame={onNextClick} />
            <br />
            <Button variant="contained" color="primary" onClick={() => window.location.href = "/"}>
                Top Page
            </Button>
        </main>
    );
}

export default Infinite;
