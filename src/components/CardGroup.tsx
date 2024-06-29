import { useEffect, useRef, useState } from "react";
import styles from "./CardGroup.module.css";
import ScoreBoard from "./ScoreBoard";
import Card from "./Card";
import useCardNumberStore from "../store/cardNumber";
import useResultStore from "../store/result";

interface ICardGroupProps {
    numbers: number[];
    player: string;
    isFlip?: boolean;
    isPlayerTurn: boolean;
    setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardGroup = ({ numbers, player, isFlip = true, isPlayerTurn, setIsPlayerTurn }: ICardGroupProps) => {
    const [cardNumbers, setCardNumbers] = useState<number[]>([]);
    const numberRef = useRef(0);
    const { setFirstPlayerNumber, setSecondPlayerNumber, getFirstPlayerNumberTotal, getSecondPlayerNumberTotal } =
        useCardNumberStore();
    const { getFirstPlayerWinTotal, getSecondPlayerWinTotal } = useResultStore();

    useEffect(() => {
        setCardNumbers(numbers);
    }, [numbers]);

    const onRemoveCardHandler = (numberVal: number) => {
        setCardNumbers((prev) => prev.filter((item) => item !== numberVal));

        if (numberRef.current > 0 && numberRef.current < 99) {
            numberRef.current = numberRef.current * 100 + numberVal;
        } else {
            numberRef.current = numberVal;
        }

        if (numberRef.current > 100) {
            setSecondPlayerNumber(numberRef.current);
            setIsPlayerTurn(!isPlayerTurn);
            numberRef.current = 0;
        }
    };

    // Player1 generate random combination of two numbers in each turn
    const setRandomNumber = () => {
        const numbers = [...cardNumbers];
        let first = 0;
        let last = 0;

        while (first <= last) {
            first = numbers[Math.floor(Math.random() * numbers.length)];
            last = numbers[Math.floor(Math.random() * numbers.length)];
        }

        const numberVal = first * 100 + last;

        setCardNumbers((prev) => prev.filter((item) => item !== first && item !== last));
        setFirstPlayerNumber(numberVal);
        setIsPlayerTurn(!isPlayerTurn);
    };

    // Player1 generate the biggest number in each turn
    const setBiggestNumber = () => {
        const numbers = [...cardNumbers];
        numbers.sort(function (a, b) {
            return b - a;
        });

        const first = numbers[0];
        const last = numbers[numbers.length - 1];
        const numberVal = first * 100 + last;

        setCardNumbers((prev) => prev.filter((item) => item !== first && item !== last));
        setFirstPlayerNumber(numberVal);
        setIsPlayerTurn(!isPlayerTurn);
    };

    useEffect(() => {
        if (player === "player1" && isPlayerTurn) {
            setRandomNumber();
        }
    }, [isPlayerTurn]);

    return (
        <div className={styles.cardgroup__wrapper}>
            <ScoreBoard
                scoreType="WIN"
                numberVal={player === "player1" ? getFirstPlayerWinTotal() : getSecondPlayerWinTotal()}
            />
            <div className={styles.cardgroup__cards}>
                {cardNumbers &&
                    cardNumbers.map((numberVal, index) => (
                        <Card
                            numberVal={numberVal}
                            isFlip={isFlip}
                            key={index}
                            onClickHandler={onRemoveCardHandler}
                            player={player}
                        />
                    ))}
            </div>
            <ScoreBoard
                scoreType="SUM"
                numberVal={player === "player1" ? getFirstPlayerNumberTotal() : getSecondPlayerNumberTotal()}
            />
        </div>
    );
};

export default CardGroup;
