'use client';
import { useTranslation } from '@/i18n/client';
import { Box, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { use } from "react";
import styles from './page.module.css';

const numList = [12, 24, 36];
export default function Home(props: { params: Promise<{ lang: string }> }) {
    const params = use(props.params);
    const lang = params.lang;
    const { t } = useTranslation(lang);
    const router = useRouter();

    return (
        <main className={styles.main}>
            <Stack spacing={2}>
                <Box sx={{ border: 1, padding: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push(`/${lang}/games/infinite`)}
                    >
                        {t('home:infinite')}
                    </Button>
                </Box>
                <Box sx={{ border: 1, padding: 3 }}>
                    <Stack spacing={2}>
                        {numList.map((num) => (
                            <Button
                                key={num}
                                variant="contained"
                                color="primary"
                                onClick={() => router.push(`/${lang}/games/ncard?num=${num}`)}
                            >
                                {t('home:NCard', { num: num })}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </main>
    );
}
