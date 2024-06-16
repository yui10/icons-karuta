'use client';
import GameUI from '@/components/game/GameUI';
import useIcons from '@/hooks/useIcons';
import useIconsService from '@/hooks/useIconsService';
import { useTranslation } from '@/i18n/client';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

const Infinite = ({ params }: { params: { lang: string } }) => {
    const lang = params.lang;
    const { t } = useTranslation(lang);

    const { loaded, icons } = useIcons();
    const { correctIcon, restIconList, init, onNext } = useIconsService();
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
    useEffect(() => {
        if (loaded) {
            init(icons, 12);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded]);

    const onNextClick = (attention: number = 0) => {
        init(icons, 12);
    };

    return (
        <main className={styles.main}>
            <Typography variant="h4" component="h4">
                Infinite Game
            </Typography>
            <br />
            <GameUI
                correctIcon={correctIcon}
                iconList={restIconList}
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
