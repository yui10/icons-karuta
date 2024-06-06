import useStopwatch from "@/hooks/useStopwatch";
import React, { useEffect } from "react";
type Props = {
    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning]);

    return (
        <div>
            {("0" + Math.floor((time / 60_000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1_000) % 60)).slice(-2)}
        </div>
    );
};

export default StopwatchDisplay;
