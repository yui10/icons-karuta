import { createIconsUrl } from '@/utils/iconUtil';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { IconData } from 'simple-icons/sdk';

import StopwatchDisplay from '@/components/StopwatchDisplay';
import { useLanguage, useTranslation } from '@/i18n/client';
import Format from 'string-format';

type Props = {
    correctIcon: IconData | undefined;
    iconList: IconData[];
    score: number;
    onNextGame: (attention: number) => void;
    isTimerRunning: boolean;
    setIsTimerRunning: (isRunning: boolean) => void;
};

const GameUI = (props: Props) => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const [attention, setAttention] = useState<number>(0);
    const [totalAttention, setTotalAttention] = useState<number>(0);
    const [correct, setCorrect] = useState<boolean>(false);

    const { correctIcon, iconList, score, onNextGame, isTimerRunning, setIsTimerRunning } = props;

    const iconClick = (icon: IconData) => {
        if (correct) {
            return;
        }

        if (icon?.title == correctIcon?.title) {
            alert(t('game:correct'));
            setCorrect(true);
        } else {
            alert(Format(t('game:incorrect'), correctIcon?.title ?? '', icon?.title));
            setAttention(attention + 1);
            setTotalAttention(totalAttention + 1);
        }
    };

    const _onNextClick = () => {
        setAttention(0);
        onNextGame(attention);
        setCorrect(false);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} container spacing={2}>
                    <Grid item xs={6} md={12}>
                        <Box border={1} padding={3} flex={1}>
                            <Typography variant="h4" component="h4">
                                {t('game:Yomi-fuda')} : {correctIcon?.title}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                {t('game:touches')}: {attention}
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                <Button
                                    variant="contained"
                                    onClick={_onNextClick}
                                    disabled={!correct}
                                >
                                    {t('game:next')}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Box border={1} padding={3} flex={1}>
                            <Typography variant="h4" component="h4">
                                {t('game:total-touches')} : {totalAttention}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                {t('game:score')}: {score}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                <StopwatchDisplay
                                    isRunning={isTimerRunning}
                                    setIsRunning={setIsTimerRunning}
                                />
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box marginTop={2}>
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            {iconList.map((icon, index) => {
                                return (
                                    <Grid item key={index} xs={6} sm={4} md={3} lg={3} xl={2}>
                                        <Paper
                                            elevation={3}
                                            onClick={() => iconClick(icon)}
                                            component="img"
                                            alt=""
                                            src={createIconsUrl(icon, 0)}
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        />
                                        <Typography variant="body1" component="p" align="center">
                                            {icon.title}
                                        </Typography>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default GameUI;
