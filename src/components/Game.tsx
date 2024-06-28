import { useState, useEffect } from "react";
import styles from "./Game.module.css";
import CardGroup from "./CardGroup";
import BigCardGroup from "./BigCardGroup";
import useCardNumberStore from "../store/cardNumber";
import GameOver from "./GameOver";
import useResultStore from "../store/result";

const Game = () => {
    const [cardNumbers, setCardNumbers] = useState<number[]>([]);
    const [isOver, setIsOver] = useState<boolean>(false);
    const { firstPlayerNumbers: first, secondPlayerNumbers: second, resetNumbers } = useCardNumberStore();
    const { resetResult } = useResultStore();
    const arrayCount = first.length > second.length ? first.length : second.length;

    const generateRandomNumbers = (): number[] => {
        const numbers: number[] = [];

        while (numbers.length < 20) {
            const randomNumber = Math.floor(Math.random() * 99) + 1;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }

        return numbers || [];
    };

    useEffect(() => {
        const numberArray = generateRandomNumbers();
        if (numberArray) {
            setCardNumbers(numberArray);
        }
    }, []);

    useEffect(() => {
        if (first.length === 10 && second.length === 10) {
            setIsOver(true);
        }
    }, [first, second]);

    const onGameOverHandler = () => {
        setIsOver(false);
        resetGame();
    };

    const resetGame = () => {
        const numberArray = generateRandomNumbers();
        if (numberArray) {
            setCardNumbers(numberArray);
        }
        resetNumbers();
        resetResult();
    };

    return (
        <main className={styles.game__wrapper}>
            <CardGroup numbers={cardNumbers} player="player1" />
            <div className={styles.game__result__card}>
                {[...new Array(arrayCount)].map((_, index) => (
                    <BigCardGroup firstValue={first[index]} secondValue={second[index]} key={index} />
                ))}
            </div>
            <CardGroup numbers={cardNumbers} player="player2" isFlip={false} />
            {isOver && <GameOver onClose={onGameOverHandler} />}
        </main>
    );
};

export default Game;
