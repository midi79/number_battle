import useCardNumberStore from "../store/cardNumber";
import useResultStore from "../store/result";
import styles from "./GameOver.module.css";

interface IGameOverProps {
    onClose: () => void;
}

const GameOver = ({ onClose }: IGameOverProps) => {
    const { getFirstPlayerNumberTotal: firstTotal, getSecondPlayerNumberTotal: secondTotal } = useCardNumberStore();
    const { getFirstPlayerWinTotal: firstWin, getSecondPlayerWinTotal: secondWin } = useResultStore();

    let result = "Player1 WIN!";

    if (firstWin() < secondWin()) {
        result = "Player2 WIN!";
    }
    if (firstWin() === secondWin()) {
        if (firstTotal() < secondTotal()) {
            result = "Player2 WIN!";
        }
    }

    return (
        <div className={styles.gameover__wrapper}>
            <div className={styles.gameover__container}>
                <div className={styles.gameover__title}>Game over</div>
                <div className={styles.gameover__result}>{result}</div>
                <div className={styles.gameover__result__detail}>
                    <div>
                        <div className={styles.gameover__result__detail__title}>Card Battle</div>
                        <div className={styles.gameover__result__detail__content}>
                            Player1 : {firstWin()} vs Player2 : {secondWin()}
                        </div>
                    </div>
                    <div>
                        <div className={styles.gameover__result__detail__title}>Sum Battle</div>
                        <div className={styles.gameover__result__detail__content}>
                            Player1 : {firstTotal()} vs Player2 : {secondTotal()}
                        </div>
                    </div>
                    <div className={styles.gameover__result__detail__notice}>
                        📌 Sum Battle is applied only when the card battle ends in a draw
                    </div>
                </div>
                <div className={styles.gameover__result__button}>
                    <button onClick={onClose}>CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
