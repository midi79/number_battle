import { useState, useEffect } from "react";
import styles from "./Game.module.css";
import CardGroup from "./CardGroup";
import BigCardGroup from "./BigCardGroup";
import useCardNumberStore from "../store/cardNumber";

const Game = () => {
    const [cardNumbers, setCardNumbers] = useState<number[]>([]);
    const { firstPlayerNumbers: first, secondPlayerNumbers: second } = useCardNumberStore();
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

    return (
        <main className={styles.game__wrapper}>
            <CardGroup numbers={cardNumbers} player="player1" />
            <div className={styles.game__result__card}>
                {[...new Array(arrayCount)].map((_, index) => (
                    <BigCardGroup firstValue={first[index]} secondValue={second[index]} key={index} />
                ))}
            </div>
            <CardGroup numbers={cardNumbers} player="player2" />
        </main>
    );
};

export default Game;
