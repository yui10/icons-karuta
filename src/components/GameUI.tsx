import { IconData } from "simple-icons/sdk";
import { useState } from "react";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { createIconsUrl } from "@/utils/iconUtil";

import { useLanguage, useTranslation } from "@/i18n/client";
import Format from "string-format";

type Props = {
    correctIcon: IconData | undefined;
    iconList: IconData[];
    onNextGame: (attention: number) => void;
}

const GameUI = (props: Props) => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const [attention, setAttention] = useState<number>(0);
    const [correct, setCorrect] = useState<boolean>(false);


    const { correctIcon, iconList, onNextGame } = props;

    const iconClick = (icon: IconData) => {
        if (correct) {
            return;
        }

        if (icon?.title == correctIcon?.title) {
            alert(t("game:correct"));
            setCorrect(true);
        }
        else {
            alert(Format(t("game:incorrect"), correctIcon?.title ?? "", icon?.title));
            setAttention(attention + 1);
        }
    }

    const _onNextClick = () => {
        setAttention(0);
        onNextGame(attention);
        setCorrect(false);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Box border={1} padding={3} flex={1}>
                        <Typography variant="h4" component="h4" >
                            {t("game:Yomi-fuda")} : {correctIcon?.title}
                        </Typography>
                        <Typography variant="h6" component="h6" >
                            {t("game:touches")}: {attention}
                        </Typography>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" onClick={_onNextClick} disabled={!correct}>
                                {t("game:next")}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box marginTop={2}>
                        <Grid container spacing={{ xs: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {iconList.map((icon, index) => {
                                return (
                                    <Grid item key={index} xs={6} sm={4} md={3} lg={3} xl={2}>
                                        <Paper elevation={3}
                                            onClick={() => iconClick(icon)}
                                            component="img"
                                            alt=""
                                            src={createIconsUrl(icon, 0)}
                                            sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default GameUI
