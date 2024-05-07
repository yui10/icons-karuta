'use client'
import { Box, Button, Stack } from "@mui/material";
import styles from "./page.module.css";

const numList = [12, 24, 36];
export default function Home() {
  const onInfiniteGameClick = () => {
    window.location.href = "/games/Infinite";
  };
  return (
    <main className={styles.main}>
      <Stack spacing={2}>
        <Box border={1} padding={3}>
          <Button variant="contained" color="primary" onClick={onInfiniteGameClick}>
            Start Infinite Game
          </Button>
        </Box>
        <Box border={1} padding={3}>
          <Stack spacing={2} >
            {numList.map(num => (
              <Button key={num} variant="contained" color="primary" onClick={() => window.location.href = `/games/NCard?num=${num}`}>
                Start {num} Cards Game
              </Button>
            ))}
          </Stack>
        </Box>
      </Stack>
    </main >
  );
}
