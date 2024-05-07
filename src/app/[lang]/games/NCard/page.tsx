'use client'
import styles from "../../page.module.css";
import { IconData } from "simple-icons/sdk";
import { useEffect, useState } from "react";
import { randomInt } from "@/utils/commonUtil";
import GameUI from "@/components/GameUI";
import { fetchSlugs, randomIcons } from "@/utils/iconUtil";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const numList = [12, 24, 36];

let iconSlugList: IconData[];
const Random = ({ params, searchParams }: { params: { num: string }, searchParams: { [key: string]: string } }) => {
    const [correctIcon, setCorrectIcon] = useState<IconData>();
    const [iconList, setIconList] = useState<IconData[]>([]);
    const [totalAttention, setTotalAttention] = useState<number>(0);
    const [gameEnd, setGameEnd] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
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
        const _totalAttention = totalAttention + attention;
        const _score = score + 5 - Math.min(4, attention);
        setScore(_score);
        // setScore(score + 5 - Math.min(5, Math.max(attention - Math.floor(iconList.length / 4), 0)));
        setIconList(_iconList);
        setCorrectIcon(_iconList[randomInt(0, _iconList.length - 1)]);
        setTotalAttention(_totalAttention);
        if (_iconList.length === 0) {
            setGameEnd(true);
            alert(`Total number of touches: ${_totalAttention}\nScore: ${_score}`);
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
                <Typography variant="h6" component="h6" >
                    Score: {score}
                </Typography>
            </Stack>
            <GameUI correctIcon={correctIcon} iconList={iconList} onNextGame={onNextClick} />
            {gameEnd &&
                <Box marginTop={4}>
                    {/** SNS share */}
                    <Stack spacing={2} direction="row">
                        <Typography variant="h6" component="h6" >
                            Share your score :
                        </Typography>
                        <Link href={`https://x.com/intent/post?text=icons karuta - Play ${num} Cards Game!!%0aTotal number of touches: ${totalAttention}%0aScore: ${score}%0a&url=${window.location.href}`} passHref target="_blank">
                            <Image src="https://cdn.simpleicons.org/x" alt="x" width={32} height={32} />
                        </Link>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" color="primary" onClick={() => window.location.href = `/games/NCard?num=${num}`}>Restart</Button>
                        <Button variant="contained" color="primary" onClick={() => window.location.href = "/"}>Top Page</Button>
                    </Stack>
                </Box>
            }
        </main>
    );
}

export default Random;
