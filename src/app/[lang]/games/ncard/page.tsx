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
import { useTranslation } from "@/i18n/client";
import Format from "string-format";

const numList = [12, 24, 36];

let iconSlugList: IconData[];
const Random = ({ params, searchParams }: { params: { num: string, lang: string }, searchParams: { [key: string]: string } }) => {
    const [correctIcon, setCorrectIcon] = useState<IconData>();
    const [iconList, setIconList] = useState<IconData[]>([]);
    const [totalAttention, setTotalAttention] = useState<number>(0);
    const [gameEnd, setGameEnd] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true)

    const lang = params.lang;
    const { t } = useTranslation(lang);
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
            setIsTimerRunning(false);
            setGameEnd(true);
            alert(Format(t("game:finish-message"), _totalAttention.toString(), _score.toString()));
        }
    }

    return (
        <main className={styles.main}>
            <Typography variant="h4" component="h4" >
                {num} Cards Game
            </Typography>
            <br />
            <GameUI correctIcon={correctIcon} iconList={iconList} score={score} onNextGame={onNextClick} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning} />
            {gameEnd &&
                <Box marginTop={4}>
                    {/** SNS share */}
                    <Stack spacing={2} direction="row">
                        <Typography variant="h6" component="h6" >
                            {t("game:share")}
                        </Typography>
                        <Link href={`https://x.com/intent/post?text=${Format(t("game:tweet"), num.toString(), totalAttention.toString(), score.toString())}&hashtags=icons_karuta&url=${window.location.href}`} passHref target="_blank">
                            <Image src="https://cdn.simpleicons.org/x" alt="x" width={32} height={32} />
                        </Link>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" color="primary" onClick={() => window.location.href = `/${lang}/games/ncard?num=${num}`}>{t("game:retry")}</Button>
                        <Button variant="contained" color="primary" onClick={() => window.location.href = `/${lang}`}>{t("game:top-page")}</Button>
                    </Stack>
                </Box>
            }
        </main>
    );
}

export default Random;
