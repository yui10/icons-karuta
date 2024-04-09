'use client'
import styles from "./page.module.css";
import { IconData } from "simple-icons/sdk";
import { useEffect, useState } from "react";
import { randomInt } from "@/utils/commonUtil";
import GameUI from "@/components/GameUI";

let iconSlugList: IconData[];
const fetchSlugs = async () => {
  const res = await fetch("/api/icons/slugs");
  const data = await res.json();
  return data as IconData[];
}

const randomIcons = (iconList: IconData[], num: number) => {
  const index_set = new Set<number>();
  while (index_set.size < num) {
    index_set.add(randomInt(0, iconList.length - 1));
  }
  const _iconList = Array.from(index_set).map(index => iconList[index]);
  return _iconList;
}

export default function Home() {
  const [correctIcon, setCorrectIcon] = useState<IconData>();
  const [iconList, setIconList] = useState<IconData[]>([]);
  useEffect(() => {
    (async () => {
      iconSlugList = await fetchSlugs();
      onNextClick();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNextClick = () => {
    const _iconList = randomIcons(iconSlugList, 12);
    setIconList(_iconList);
    setCorrectIcon(_iconList[randomInt(0, _iconList.length - 1)]);
  }

  return (
    <main className={styles.main}>
      <GameUI correctIcon={correctIcon} iconList={iconList} onNextGame={onNextClick} />
    </main>
  );
}
