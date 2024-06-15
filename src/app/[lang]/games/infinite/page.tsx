'use client';
import GameUI from '@/components/GameUI';
import { useTranslation } from '@/i18n/client';
import { randomInt } from '@/utils/commonUtil';
import { fetchSlugs, randomIcons } from '@/utils/iconUtil';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IconData } from 'simple-icons/sdk';
import styles from '../../page.module.css';

let iconSlugList: IconData[];
const Infinite = ({ params }: { params: { lang: string } }) => {
    const lang = params.lang;
    const { t } = useTranslation(lang);

    const [correctIcon, setCorrectIcon] = useState<IconData>();
    const [iconList, setIconList] = useState<IconData[]>([]);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
    useEffect(() => {
        (async () => {
            iconSlugList = await fetchSlugs();
            onNextClick();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onNextClick = (attention: number = 0) => {
        const _iconList = randomIcons(iconSlugList, 12);
        setIconList(_iconList);
        setCorrectIcon(_iconList[randomInt(0, _iconList.length - 1)]);
    };

    return (
        <main className={styles.main}>
            <Typography variant="h4" component="h4">
                Infinite Game
            </Typography>
            <br />
            <GameUI
                correctIcon={correctIcon}
                iconList={iconList}
                score={Infinity}
                onNextGame={onNextClick}
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
            />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={() => (window.location.href = `/${lang}`)}
            >
                {t('game:top-page')}
            </Button>
        </main>
    );
};

export default Infinite;
