'use client';
import GameUI from '@/components/game/GameUI';
import useGameService from '@/hooks/useGameService';
import useIcons from '@/hooks/useIcons';
import useIconsService from '@/hooks/useIconsService';
import { useTranslation } from '@/i18n/client';
import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import styles from '../../page.module.css';

const Infinite = ({ params }: { params: { lang: string } }) => {
    const lang = params.lang;
    const { t } = useTranslation(lang);

    const { loaded, icons } = useIcons();
    const { correctIcon, restIconList, initializeIcon } = useIconsService();
    const { gameData, initializeGame, onIconClick, NextIcon } = useGameService({
        correctIcon,
        restIconList,
    });

    useEffect(() => {
        if (loaded) {
            initializeIcon(icons, 12);
            initializeGame();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded]);

    const onNextClick = () => {
        NextIcon();
        initializeIcon(icons, 12);
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
                gameData={gameData}
                iconClick={onIconClick}
                onNext={onNextClick}
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
