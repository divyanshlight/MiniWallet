import React, { useContext, useState } from "react";
import styles from "./Header.module.css";
import { FaGear, FaQrcode, FaSortDown } from "react-icons/fa6";
import { BiSolidBell, BiSolidCopy, BiCheck } from "react-icons/bi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { WalletContext } from "../../Context/WalletContext";
import copy from "copy-to-clipboard";

const Header = ({
  balance,
  isBalanceVisible,
  toggleBalanceVisibility,
  handleShowUserProfile,
  setShowPortfolio,
}) => {
  const [copied, setCopied] = useState(false);
  const { walletInfo } = useContext(WalletContext);

  const handleCopy = (text) => {
    copy(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.balanceContent}>
          <div className={styles.mainportfolioContainer}>
            <div>
              {isBalanceVisible ? (
                <IoEyeOutline
                  className={styles.eye_on}
                  size={20}
                  onClick={toggleBalanceVisibility}
                />
              ) : (
                <IoEyeOffOutline
                  className={styles.eye_off}
                  size={20}
                  onClick={toggleBalanceVisibility}
                />
              )}
            </div>
            <div
              onClick={() => {
                setShowPortfolio(true);
              }}
              className={styles.portfolioDropDown}
            >
              <p>Main Portfolio</p> <FaSortDown />
            </div>
          </div>
          <div className={styles.balance}>
            <p>{isBalanceVisible ? `${balance} ETH` : "****"}</p>
          </div>
        </div>
        <div className={styles.iconsContainer}>
          <div className={styles.copyIconContainer}>
            {copied ? (
              <BiCheck className={styles.icon} />
            ) : (
              <BiSolidCopy
                className={styles.icon}
                onClick={() => handleCopy(walletInfo && walletInfo.address)}
              />
            )}
            {copied && <span className={styles.copiedTooltip}>Copied</span>}
          </div>
          <FaQrcode className={styles.icon}/>

          <BiSolidBell className={styles.icon} />
          <FaGear className={styles.icon} onClick={handleShowUserProfile} />
        </div>
      </div>
    </>
  );
};

export default Header;
