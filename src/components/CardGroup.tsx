import { useEffect, useRef, useState } from "react";
import styles from "./CardGroup.module.css";
import ScoreBoard from "./ScoreBoard";
import Card from "./Card";
import useCardNumberStore from "../store/cardNumber";
import useResultStore from "../store/result";

interface ICardGroupProps {
    numbers: number[];
    player: string;
}

const CardGroup = ({ numbers, player }: ICardGroupProps) => {
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
            if (player === "player1") {
                setFirstPlayerNumber(numberRef.current);
            } else {
                setSecondPlayerNumber(numberRef.current);
            }
            numberRef.current = 0;
        }
    };

    return (
        <div className={styles.cardgroup__wrapper}>
            <ScoreBoard
                scoreType="WIN"
                numberVal={player === "player1" ? getFirstPlayerWinTotal() : getSecondPlayerWinTotal()}
            />
            <div className={styles.cardgroup__cards}>
                {cardNumbers &&
                    cardNumbers.map((numberVal, index) => (
                        <Card numberVal={numberVal} isFlip={false} key={index} onClickHandler={onRemoveCardHandler} />
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
