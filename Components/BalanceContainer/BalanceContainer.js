import React from "react";
import styles from "./BalanceContainer.module.css";
import { IoEyeOutline } from "react-icons/io5";

const BalanceContainer = ({ balance, isBalanceVisible, setIsBalanceVisible }) => {
    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
      };
  return (
    <div className={styles.balanceContainer}>
    <div className={styles.balanceHeader}>
      <span>Total Balance</span>
    </div>
    <div className={styles.balanceContent}>
      <div className={styles.balance}>
        <p>{isBalanceVisible ? `${balance}` : "****"}</p>
      </div>
      <IoEyeOutline size={20} onClick={toggleBalanceVisibility} />
    </div>
    <button className={styles.transferButton}>Transfer</button>
  </div>
  );
};

export default BalanceContainer;
