'use client'
import { Box, Button, Stack } from "@mui/material";
import styles from "./page.module.css";
import { useTranslation } from "@/i18n/client";

const numList = [12, 24, 36];
export default function Home({ params }: { params: { lang: string } }) {
  const lang = params.lang;
  const { t } = useTranslation(lang);

  return (
    <main className={styles.main}>
      <Stack spacing={2}>
        <Box border={1} padding={3}>
          <Button variant="contained" color="primary" onClick={() => window.location.href = `${lang}/games/infinite`}>
            {t('home:infinite')}
          </Button>
        </Box>
        <Box border={1} padding={3}>
          <Stack spacing={2} >
            {numList.map(num => (
              <Button key={num} variant="contained" color="primary" onClick={() => window.location.href = `${lang}/games/ncard?num=${num}`}>
                {t('home:NCard', { num: num })}
              </Button>
            ))}
          </Stack>
        </Box>
      </Stack>
    </main >
  );
}
