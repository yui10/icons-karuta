'use client';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { IconData } from 'simple-icons/sdk';

import StopwatchDisplay from '@/components/StopwatchDisplay';
import { useLanguage, useTranslation } from '@/i18n/client';
import { GameData } from '@/types/gameState';
import Format from 'string-format';
import IconGrid from './IconGrid';

type Props = {
    correctIcon: IconData | undefined;
    iconList: IconData[];
    gameData: GameData;
    iconClick: (icon: IconData) => void;
    onNext(): void;
};

const GameUI = (props: Props) => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const { correctIcon, iconList, gameData, onNext, iconClick } = props;
    const isTimerRunning = gameData.gameState === 'playing';

    useEffect(() => {
        if (gameData.gameState !== 'playing') {
            return;
        }

        if (gameData.correct === 'correct') {
            alert(t('game:correct'));
        } else if (gameData.correct === 'incorrect') {
            const correctIcon_name = correctIcon?.title ?? '';
            const selectedIcon_name = gameData.selectedIcon?.title ?? '';
            alert(Format(t('game:incorrect'), correctIcon_name, selectedIcon_name));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData.correct, gameData.attention]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid container size={{xs: 12, md: 4}} spacing={2}>
                    <Grid size={{xs: 6, md: 12}}>
                        <Box sx={{ border: 1, padding: 3, flex: 1 }}>
                            <Typography variant="h4" component="h4">
                                {t('game:Yomi-fuda')} : {correctIcon?.title}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                {t('game:touches')}: {gameData.attention}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    onClick={onNext}
                                    disabled={gameData.correct !== 'correct'}
                                >
                                    {t('game:next')}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 6, md: 12}}>
                        <Box sx={{ border: 1, padding: 3, flex: 1 }}>
                            <Typography variant="h4" component="h4">
                                {t('game:total-touches')} : {gameData.totalAttention}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                {t('game:score')}: {gameData.score}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                <StopwatchDisplay isRunning={isTimerRunning} />
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid size={{xs: 12, md: 8}}>
                    <Box sx={{ marginTop: 2 }}>
                        <IconGrid iconList={iconList} iconClick={iconClick} />
                    </Box>
                </Grid>
                {process.env.NODE_ENV === 'development' && (
                    <Grid size={{xs: 12}}>
                        <pre>{JSON.stringify(gameData, null, 2)}</pre>
                        <p>correctIcon</p>
                        <pre>{JSON.stringify(correctIcon, null, 2)}</pre>
                        <p>iconList</p>
                        <pre>{JSON.stringify(iconList, null, 2)}</pre>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default GameUI;
