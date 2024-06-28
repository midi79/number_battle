import styles from "./BigCard.module.css";

interface IBigCardProps {
    numberVal: number;
    color: string;
}

const BigCard = ({ numberVal, color }: IBigCardProps) => {
    return (
        <div className={styles.bigcard__wrapper} style={{ backgroundColor: color }}>
            <div className={styles.bigcard__value}>{numberVal}</div>
        </div>
    );
};

export default BigCard;
