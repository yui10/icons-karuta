'use client'
import styles from "../../page.module.css";
import { IconData } from "simple-icons/sdk";
import { useEffect, useState } from "react";
import { randomInt } from "@/utils/commonUtil";
import GameUI from "@/components/GameUI";
import { fetchSlugs, randomIcons } from "@/utils/iconUtil";
import { Box, Button, Stack, Typography } from "@mui/material";

const numList = [12, 24, 36];

let iconSlugList: IconData[];
const Random = ({ params, searchParams }: { params: { num: string }, searchParams: { [key: string]: string } }) => {
    const [correctIcon, setCorrectIcon] = useState<IconData>();
    const [iconList, setIconList] = useState<IconData[]>([]);
    const [totalAttention, setTotalAttention] = useState<number>(0);
    const [gameEnd, setGameEnd] = useState<boolean>(false);
    let num: number = parseInt(params.num) || parseInt(searchParams.num);
    if (num === undefined || (!numList.includes(num))) {
        num = 12;
    }
    useEffect(() => {
        (async () => {
            iconSlugList = await fetchSlugs();
            const _iconList = randomIcons(iconSlugList, num);
            setIconList([..._iconList]);
            setCorrectIcon(_iconList[randomInt(0, _iconList.length - 1)]);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onNextClick = (attention: number = 0) => {
        const _iconList = iconList.filter((icon) => icon.title !== correctIcon?.title);
        setIconList(_iconList);
        setCorrectIcon(_iconList[randomInt(0, _iconList.length - 1)]);
        setTotalAttention(totalAttention + attention);
        if (_iconList.length === 0) {
            setGameEnd(true);
            alert(`Total number of touches: ${totalAttention + attention}`);
        }
    }

    return (
        <main className={styles.main}>
            <Stack spacing={2}>
                <Typography variant="h4" component="h4" >
                    {num} Cards Game
                </Typography>
                <Typography variant="h6" component="h6" >
                    Total number of touches: {totalAttention}
                </Typography>
            </Stack>
            <GameUI correctIcon={correctIcon} iconList={iconList} onNextGame={onNextClick} />
            {gameEnd &&
                <Box marginTop={4}>
                    <Stack spacing={2}>
                        <Button variant="contained" color="primary" onClick={() => window.location.href = `/games/NCard?num=${num}`}>Restart</Button>
                        <Button variant="contained" color="primary" onClick={() => window.location.href = "/"}>Top Page</Button>
                    </Stack>
                </Box>
            }
        </main>
    );
}

export default Random;
