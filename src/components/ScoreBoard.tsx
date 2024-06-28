import styles from "./ScoreBoard.module.css";

interface IScoreBoardProps {
    scoreType: string;
    numberVal: number;
}

const ScoreBoard = ({ scoreType, numberVal }: IScoreBoardProps) => {
    return (
        <div className={styles.scoreboard__wrapper}>
            <div className={styles.scoreboard__type}>{scoreType}</div>
            <div className={styles.scoreboard__value}>{numberVal}</div>
        </div>
    );
};

export default ScoreBoard;
