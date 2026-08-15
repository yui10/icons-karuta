'use client';
import GameUI from '@/components/game/GameUI';
import useGameService from '@/hooks/useGameService';
import useIcons from '@/hooks/useIcons';
import useIconsService from '@/hooks/useIconsService';
import { useTranslation } from '@/i18n/client';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import styles from '../../page.module.css';

const Infinite = (props: { params: Promise<{ lang: string }> }) => {
    const params = use(props.params);
    const lang = params.lang;
    const { t } = useTranslation(lang);
    const router = useRouter();

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
                onClick={() => router.push(`/${lang}`)}
            >
                {t('game:top-page')}
            </Button>
        </main>
    );
};

export default Infinite;
