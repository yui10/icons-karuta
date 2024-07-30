'use client';
import XShareButton from '@/components/XShareButton';
import GameUI from '@/components/game/GameUI';
import useGameService from '@/hooks/useGameService';
import useIcons from '@/hooks/useIcons';
import useIconsService from '@/hooks/useIconsService';
import { useTranslation } from '@/i18n/client';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import Format from 'string-format';
import styles from '../../page.module.css';

const numList = [12, 24, 36];

const Random = ({
    params,
    searchParams,
}: {
    params: { num: string; lang: string };
    searchParams: { [key: string]: string };
}) => {
    const { loaded, icons } = useIcons();
    const { correctIcon, restIconList, initializeIcon, onNext } = useIconsService();

    const { gameData, initializeGame, onIconClick, NextIcon } = useGameService({
        correctIcon,
        restIconList,
    });

    const lang = params.lang;
    const { t } = useTranslation(lang);
    let num: number = parseInt(params.num) || parseInt(searchParams.num);
    if (num === undefined || !numList.includes(num)) {
        num = 12;
    }
    useEffect(() => {
        if (loaded) {
            initializeIcon(icons, num);
            initializeGame();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded]);

    const onNextClick = () => {
        onNext();
        NextIcon();
    };

    useEffect(() => {
        if (gameData.gameState === 'gameover') {
            const { totalAttention, score } = gameData;
            alert(Format(t('game:finish-message'), totalAttention.toString(), score.toString()));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData.gameState]);

    return (
        <main className={styles.main}>
            <Typography variant="h4" component="h4">
                {num} Cards Game
            </Typography>
            <br />
            <GameUI
                correctIcon={correctIcon}
                iconList={restIconList}
                gameData={gameData}
                iconClick={onIconClick}
                onNext={onNextClick}
            />
            {gameData.gameState === 'gameover' && (
                <Box marginTop={4}>
                    {/** SNS share */}
                    <Stack spacing={2} direction="row">
                        <Typography variant="h6" component="h6">
                            {t('game:share')}
                        </Typography>
                        <XShareButton
                            message={Format(
                                t('game:tweet'),
                                num.toString(),
                                gameData.totalAttention.toString(),
                                gameData.score.toString()
                            )}
                            hashtags={'icons_karuta'}
                            url={window.location.href}
                        />
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                (window.location.href = `/${lang}/games/ncard?num=${num}`)
                            }
                        >
                            {t('game:retry')}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => (window.location.href = `/${lang}`)}
                        >
                            {t('game:top-page')}
                        </Button>
                    </Stack>
                </Box>
            )}
        </main>
    );
};

export default Random;
