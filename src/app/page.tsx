'use client'
import styles from "./page.module.css";
import * as icons from 'simple-icons'
import { useEffect, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
const iconObjectList = Object.values(icons).map((icon) => {
  return icon;
});


const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Home() {
  const [attention, setAttention] = useState<number>(0)
  const [correct, setCorrect] = useState<boolean>(false);
  const [correctIcon, setCorrectIcon] = useState<icons.SimpleIcon>();
  const [iconList, setIconList] = useState<icons.SimpleIcon[]>([]);
  useEffect(() => {
    onNextClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconClick = (icon: icons.SimpleIcon) => {
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

  const onNextClick = () => {
    setAttention(0);
    let _iconList: icons.SimpleIcon[] = [];
    for (let i = 0; i < 12; i++) {
      /// 重複しないようにする
      while (true) {
        const _icon = iconObjectList[randomInt(0, iconObjectList.length - 1)];
        if (_icon.title == correctIcon?.title) {
          continue;
        }
        _iconList.push(_icon);
        break;
      }
    }
    setIconList(_iconList);
    setCorrectIcon(_iconList[randomInt(0, _iconList.length - 1)]);
    setCorrect(false);
  }

  return (
    <main className={styles.main}>
      <Typography variant="h4" component="h4" >
        Yomi-fuda : {correctIcon?.title}
      </Typography>
      <Typography variant="h6" component="h6" >
        Number of touches: {attention}
      </Typography>
      <Button variant="contained" onClick={onNextClick} disabled={!correct}>
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
                src={`/api/icons?slug=${icon.slug}`}
                sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
}
