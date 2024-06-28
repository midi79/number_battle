import styles from "./Card.module.css";

interface ICardProps {
    numberVal: number;
    isFlip: boolean;
    onClickHandler: (value: number) => void;
    player: string;
}

const Card = ({ numberVal, isFlip, onClickHandler, player }: ICardProps) => {
    const numberValDisplay = numberVal < 10 ? "0" + numberVal : numberVal;

    return (
        <div
            className={styles.card__wrapper}
            onClick={player !== "player1" ? () => onClickHandler(numberVal) : undefined}
        >
            {isFlip ? (
                <div className={styles.card__inner__line}>
                    <div className={styles.card__value}>?</div>
                </div>
            ) : (
                <div className={styles.card__value}>{numberValDisplay}</div>
            )}
        </div>
    );
};

export default Card;
