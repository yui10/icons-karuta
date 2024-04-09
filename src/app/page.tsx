'use client'
import styles from "./page.module.css";
import { IconData } from "simple-icons/sdk";
import { useEffect, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { randomInt } from "@/utils/commonUtil";
import { createIconsUrl } from "@/utils/iconUtil";

let iconSlugList: IconData[];
const fetchSlugs = async () => {
  const res = await fetch("/api/icons/slugs");
  const data = await res.json();
  return data as IconData[];
}

export default function Home() {
  const [attention, setAttention] = useState<number>(0)
  const [correct, setCorrect] = useState<boolean>(false);
  const [correctIcon, setCorrectIcon] = useState<IconData>();
  const [iconList, setIconList] = useState<IconData[]>([]);
  useEffect(() => {
    (async () => {
      iconSlugList = await fetchSlugs();
      onNextClick();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onNextClick = () => {
    setAttention(0);
    let _iconList: IconData[] = [];
    for (let i = 0; i < 12; i++) {
      /// 重複しないようにする
      while (true) {
        const _icon = iconSlugList[randomInt(0, iconSlugList.length - 1)];
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
                src={createIconsUrl(icon, 2)}
                sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
}
