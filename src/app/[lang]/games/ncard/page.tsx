'use client'
import styles from "../../page.module.css";
import { useEffect, useState } from "react";
import GameUI from "@/components/game/GameUI";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/client";
import Format from "string-format";
import useIcons from "@/hooks/useIcons";
import useIconsService from "@/hooks/useIconsService";

const numList = [12, 24, 36];

const Random = ({ params, searchParams }: { params: { num: string, lang: string }, searchParams: { [key: string]: string } }) => {
    const [totalAttention, setTotalAttention] = useState<number>(0);
    const [gameEnd, setGameEnd] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true)

    const { loaded, icons } = useIcons();
    const { correctIcon, restIconList, init, onNext } = useIconsService();

    const lang = params.lang;
    const { t } = useTranslation(lang);
    let num: number = parseInt(params.num) || parseInt(searchParams.num);
    if (num === undefined || (!numList.includes(num))) {
        num = 12;
    }
    useEffect(() => {
        if (loaded) {
            init(icons, num);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded]);

    const onNextClick = (attention: number = 0) => {
        const _totalAttention = totalAttention + attention;
        const _score = score + 5 - Math.min(4, attention);
        setScore(_score);
        // setScore(score + 5 - Math.min(5, Math.max(attention - Math.floor(iconList.length / 4), 0)));
        setTotalAttention(_totalAttention);

        onNext();
        if (restIconList.length === 0) {
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
            <GameUI correctIcon={correctIcon} iconList={restIconList} score={score} onNextGame={onNextClick} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning} />
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
