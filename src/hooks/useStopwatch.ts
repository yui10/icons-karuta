import { useCallback, useEffect, useRef, useState } from 'react';

const useStopwatch = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [time, setTime] = useState<number>(0);

    const startTimeRef = useRef<number>(0);
    const elapsedTimeRef = useRef<number>(0);
    const interval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    useEffect(() => {
        startTimeRef.current = startTime;
    }, [startTime]);

    useEffect(() => {
        elapsedTimeRef.current = elapsedTime;
    }, [elapsedTime]);

    useEffect(() => {
        if (!isRunning) {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = undefined;
            }
            return;
        }

        interval.current = setInterval(() => {
            setTime(Date.now() - startTimeRef.current + elapsedTimeRef.current);
        }, 1000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = undefined;
            }
        };
    }, [isRunning]);

    const startTimer = useCallback(() => {
        const now = Date.now();
        startTimeRef.current = now;
        setStartTime(now);
        setIsRunning(true);
    }, []);

    const stopTimer = useCallback(() => {
        // タイマーがまだ開始されていない場合、またはすでに停止している場合は何もしない
        if (startTimeRef.current === 0 && elapsedTimeRef.current === 0) {
            setTime(0);
            setIsRunning(false);
            return;
        }
        const totalElapsed = Date.now() - startTimeRef.current + elapsedTimeRef.current;
        setTime(totalElapsed);
        setElapsedTime(totalElapsed);
        setStartTime(0);
        startTimeRef.current = 0;
        elapsedTimeRef.current = totalElapsed;
        setIsRunning(false);
    }, []);

    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setStartTime(0);
        setElapsedTime(0);
        setTime(0);
        startTimeRef.current = 0;
        elapsedTimeRef.current = 0;
    }, []);

    return { time, startTimer, stopTimer, resetTimer };
};

export default useStopwatch;
