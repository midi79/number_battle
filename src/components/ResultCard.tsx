import styles from "./ResultCard.module.css";

const ResultCard = ({ result }: { result: string }) => {
    let color = "";

    switch (result) {
        case "WIN":
            color = "red";
            break;
        case "LOSE":
            color = "blue";
            break;
        default:
            color = "gray";
            break;
    }

    return (
        <div className={styles.resultcard__wrapper} style={{ backgroundColor: color }}>
            {result}
        </div>
    );
};

export default ResultCard;
