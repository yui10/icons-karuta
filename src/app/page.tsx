'use client'
import styles from "./page.module.css";
import { IconData } from "simple-icons/sdk";
import { useEffect, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let iconSlugList: IconData[];
const fetchSlugs = async () => {
  const res = await fetch("/api/icons/slugs");
  const data = await res.json();
  return data as IconData[];
}


const parseSlug = (slug: string) => {
  const REPLACE_MAP: { [key: string]: string } = {
    ' ': '',
    '+': 'plus',
    '.': 'dot',
    '&': 'and'
  };
  const REPLACE_MAP_REGEX = new RegExp(`[${Object.keys(REPLACE_MAP).join('')}]`, 'g');
  const replace_slug = slug.toLowerCase()
    .replace(REPLACE_MAP_REGEX, (match) => REPLACE_MAP[match]).normalize('NFD')
    .replace(/[^a-z0-9]/g, '');
  const iconKeys = replace_slug.charAt(0).toUpperCase() + replace_slug.slice(1);
  return iconKeys;
}

const createIconsUrl = (icon: IconData, index = -1) => {
  const slug = icon.slug ?? parseSlug(icon.title);
  const urls = [
    `https://cdn.simpleicons.org/${slug}/black`,
    `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`,
    `/api/icons?slug=${slug}`
  ];

  if (index == -1) {
    index = randomInt(0, urls.length - 1);
  }
  return urls[index];
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
                src={createIconsUrl(icon, 0)}
                sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
}
