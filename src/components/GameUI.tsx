import { IconData } from "simple-icons/sdk";
import { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { createIconsUrl } from "@/utils/iconUtil";
type Props = {
    correctIcon: IconData | undefined;
    iconList: IconData[];
    onNextGame: (attention: number) => void;
}

const GameUI = (props: Props) => {
    const [attention, setAttention] = useState<number>(0);
    const [correct, setCorrect] = useState<boolean>(false);


    const { correctIcon, iconList, onNextGame } = props;

    const iconClick = (icon: IconData) => {
        if (correct) {
            return;
        }

        if (icon?.title == correctIcon?.title) {
            alert("Correct");
            setCorrect(true);
        }
        else {
            alert(`Incorrect!\nCorrect answer is: ${correctIcon?.title}\nYour answer is: ${icon?.title}`);
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
            <Typography variant="h4" component="h4" >
                Yomi-fuda : {correctIcon?.title}
            </Typography>
            <Typography variant="h6" component="h6" >
                Number of touches: {attention}
            </Typography>
            <Button variant="contained" onClick={_onNextClick} disabled={!correct}>
                Next
            </Button>
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
        </>
    );
}

export default GameUI
