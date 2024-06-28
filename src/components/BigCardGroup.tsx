import { useEffect, useState } from "react";
import BigCard from "./BigCard";
import styles from "./BigCardGroup.module.css";
import ResultCard from "./ResultCard";
import useResultStore from "../store/result";

interface IBigCardGroupProps {
    firstValue?: number;
    secondValue?: number;
}

const BigCardGroup = ({ firstValue, secondValue }: IBigCardGroupProps) => {
    const [result, setResult] = useState<string>();
    const { setFirstPlayerResult, setSecondPlayerResult } = useResultStore();

    useEffect(() => {
        if (firstValue && secondValue) {
            if (firstValue > secondValue) {
                setResult("LOSE");
                setFirstPlayerResult("WIN");
                setSecondPlayerResult("LOSE");
            } else if (firstValue < secondValue) {
                setResult("WIN");
                setFirstPlayerResult("LOSE");
                setSecondPlayerResult("WIN");
            } else {
                setResult("DRAW");
                setFirstPlayerResult("DRAW");
                setSecondPlayerResult("DRAW");
            }
        }
        return () => {
            setResult("");
        };
    }, [firstValue, secondValue]);

    return (
        <div className={styles.bigcard__group__wrapper}>
            {firstValue && <BigCard numberVal={firstValue} color="#ffb791" />}
            {result && <ResultCard result={result} />}
            {secondValue && <BigCard numberVal={secondValue} color="#a3bfff" />}
        </div>
    );
};

export default BigCardGroup;
