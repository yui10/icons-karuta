import { CorrectType, GameData, GameState } from "@/types/gameState";
import { useEffect, useState } from "react";
import { IconData } from "simple-icons/sdk";

type PropsGameService = {
    correctIcon: IconData | undefined;
    restIconList: IconData[];
}

const useGameService = (props: PropsGameService) => {
    const { correctIcon, restIconList } = props;

    const [gameState, setGameState] = useState<GameState>("ready");
    const [score, setScore] = useState<number>(0);
    const [attention, setAttention] = useState<number>(0);
    const [totalAttention, setTotalAttention] = useState<number>(0);
    const [correct, setCorrect] = useState<CorrectType>("none");
    const [selectedIcon, setSelectedIcon] = useState<IconData | undefined>(undefined);

    const [gameData, setGameData] = useState<GameData>({
        gameState,
        score,
        attention,
        totalAttention,
        correct,
        selectedIcon,
    });

    useEffect(() => {
        setGameData({
            gameState,
            score,
            attention,
            totalAttention,
            correct,
            selectedIcon,
        });
    }, [gameState, score, attention, totalAttention, correct, selectedIcon]);

    const initializeGame = () => {
        setScore(0);
        setAttention(0);
        setTotalAttention(0);
        setCorrect("none");
        setGameState("playing");
    }

    const onIconClick = (icon: IconData) => {
        if (gameState !== "playing" || correct === "correct") {
            return;
        }
        setSelectedIcon(icon);

        if (icon?.title == correctIcon?.title) {
            setCorrect("correct");
        }
        else {
            setAttention(attention + 1);
            setTotalAttention(totalAttention + 1);
            setCorrect("incorrect");
        }
    }


    const NextIcon = () => {
        if (correct !== "correct") {
            return;
        }
        setAttention(0);
        setCorrect("none");
        setScore(score + 5 - Math.min(4, attention));
    }

    useEffect(() => {
        if (restIconList.length === 0 && gameState === "playing") {
            setGameState("gameover");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restIconList.length]);

    return {
        gameData,
        initializeGame,
        onIconClick,
        NextIcon,
    }
}

export default useGameService;
