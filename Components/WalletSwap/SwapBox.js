import React from "react";
import styles from "./WalletSwap.module.css";
import TokenSelection from "../TokenSelection/TokenSelection";
import Image from "next/image";

const SwapBox = ({
  label,
  tokenInfo,
  amount,
  onAmountChange,
  onTokenClick,
}) => (
  <div
    className={`${label === "To" ? styles.swapBoxBottom : styles.swapBoxTop}`}
  >
    <p className={styles.network_label}>
      {label}:
      <span>
        <Image
          src="/Mode round primary.svg"
          layout="responsive"
          width={16}
          height={16}
          alt="mode"
          className={styles.com_logo}
        />
      </span>
      Mode Network
    </p>
    <div className={styles.coinInputContainer}>
      <div className={styles.coinSelectionTab} onClick={onTokenClick}>
        {tokenInfo && (
          <TokenSelection
            token={tokenInfo}
            onSelect={() => {}}
          />
        )}
      </div>
      <input
        className={styles.amountInput}
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={onAmountChange}
      />
    </div>
    <p className={styles.balance_value}>Balance: </p>
  </div>
);

export default SwapBox;
