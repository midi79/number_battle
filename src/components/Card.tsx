import styles from "./Card.module.css";

interface ICardProps {
    numberVal: number;
    isFlip: boolean;
    onClickHandler: (value: number) => void;
}

const Card = ({ numberVal, isFlip, onClickHandler }: ICardProps) => {
    const numberValDisplay = numberVal < 10 ? "0" + numberVal : numberVal;

    return (
        <div className={styles.card__wrapper} onClick={() => onClickHandler(numberVal)}>
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
