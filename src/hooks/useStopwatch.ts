import { useEffect, useRef, useState } from 'react';

const useStopwatch = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [time, setTime] = useState<number>(0);

    const interval = useRef<ReturnType<typeof setInterval>>();
    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(() => {
                setTime(Date.now() - startTime + elapsedTime);
            }, 1000);
        } else {
            clearInterval(interval.current!);
            interval.current = undefined;
        }
        return () => clearInterval(interval.current!);
    }, [isRunning, startTime, elapsedTime]);

    const startTimer = () => {
        setStartTime(Date.now());
        setIsRunning(true);
    }

    const stopTimer = () => {
        setIsRunning(false);
        setStartTime(0);
        setElapsedTime(time);
    }

    const resetTimer = () => {
        setIsRunning(false);
        setStartTime(0);
        setElapsedTime(0);
        setTime(0);
    }

    return { time, startTimer, stopTimer, resetTimer };
}

export default useStopwatch;
