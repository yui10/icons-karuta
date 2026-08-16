import useStopwatch from '@/hooks/useStopwatch';
import { useEffect } from 'react';
type Props = {
    isRunning: boolean;
};

const StopwatchDisplay = (props: Props) => {
    const { isRunning } = props;

    const { time, startTimer, stopTimer } = useStopwatch();

    useEffect(() => {
        if (isRunning) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [isRunning, startTimer, stopTimer]);

    return (
        <div>
            {('0' + Math.floor((time / 60_000) % 60)).slice(-2)}:
            {('0' + Math.floor((time / 1_000) % 60)).slice(-2)}
        </div>
    );
};

export default StopwatchDisplay;
