import React, { useEffect, useState } from "react";
import styles from "./TransactionHistory.module.css";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { IoChevronBackOutline, IoSwapVerticalOutline } from "react-icons/io5";
import { GrDocumentVerified } from "react-icons/gr";

function truncateAddress(address) {
  if (!address) return "";
  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4);
  return `${start}....${end}`;
}

function TransactionHistory({ handleCloseHistory }) {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("Transaction History");

  useEffect(() => {
    const fetchTransactions = async () => {
      const address = localStorage.getItem("walletAddress");
      if (!address) {
        console.error("No wallet address found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `https://explorer.mode.network/api/v2/addresses/${address}/transactions?filter=to%20%7C%20from`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transaction data");
        }

        const data = await response.json();
        setTransactions(data.items || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const backToDashboard = () => {
    handleCloseHistory();
  };

  const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((groups, tx) => {
      const date = new Date(tx.timestamp).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(tx);
      return groups;
    }, {});
  };

  const groupedTransactions = groupTransactionsByDate(transactions);
  console.log(groupedTransactions);

  return (
    <div className={styles.transactionHistory}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={backToDashboard}>
          <div className={styles.backButtonContainer}>
            <IoChevronBackOutline color="#fff" /> <p>Back</p>
          </div>
        </div>
        <h2 className={styles.title}>HISTORY</h2>
      </div>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {["Announcements", "System Messages", "Campaigns", "Transaction History"].map(tab => (
            <div
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      {activeTab === "Transaction History" && Object.keys(groupedTransactions).map((date) => (
        <div key={date}>
          <div className={styles.transactionDate}>{date}</div>
          <div className={styles.listContnainer}>
            {groupedTransactions[date].map((tx, index) => (
              <li key={index} className={styles.transactionItem}>
                <div className={styles.transactionDetails}>
                  <div className={styles.transactionTypeIcon}>
                    {tx.to.hash === localStorage.getItem("walletAddress") ? (
                      <IoIosArrowRoundDown
                        className={styles.transactionIcon}
                        style={{ color: "#2B73FF" }}
                      />
                    ) : tx.type === "token_transfer" ? (
                      <IoIosArrowRoundUp
                        className={styles.transactionIcon}
                        style={{ color: "#2B73FF" }}
                      />
                    ) : tx.method.toLowerCase().includes("swap") ? (
                      <IoSwapVerticalOutline
                        className={styles.transactionIcon}
                        style={{ color: "#2B73FF" }}
                      />
                    ) : (
                      <GrDocumentVerified
                        className={styles.transactionIcon}
                        style={{ color: "#2B73FF" }}
                      />
                    )}
                  </div>
                  <div>
                    <div className={styles.transactionMethod}>
                      {tx.method.toLowerCase().includes("swap")
                        ? "Swap"
                        : tx.method}
                    </div>
                    <div className={styles.transactionAddress}>
                      {tx.type === "token_transfer"
                        ? `To: ${truncateAddress(tx.to.hash)}`
                        : `From: ${truncateAddress(tx.from.hash)}`}
                    </div>
                  </div>
                </div>
                <div className={styles.transactionValue}>{tx.value}</div>
              </li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;
