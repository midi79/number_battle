import useCardNumberStore from "../store/cardNumber";
import styles from "./Header.module.css";

const Header = () => {
    const { firstPlayerNumbers, secondPlayerNumbers } = useCardNumberStore();

    const onClickHandler = () => {
        console.log("firstPlayerNumbers : " + firstPlayerNumbers);
        console.log("secondPlayerNumbers : " + secondPlayerNumbers);
    };

    return (
        <header className={styles.header__wrapper} onClick={onClickHandler}>
            <div className={styles.header__title}>Number Battle</div>
        </header>
    );
};

export default Header;
