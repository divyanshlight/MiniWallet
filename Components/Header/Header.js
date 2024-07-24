import React, { useContext, useState } from "react";
import styles from "./Header.module.css";
import { FaGear, FaQrcode, FaSortDown } from "react-icons/fa6";
import { BiSolidBell, BiSolidCopy, BiCheck } from "react-icons/bi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { WalletContext } from "../../Context/WalletContext";
import copy from "copy-to-clipboard";
import { ConnectButton, ConnectEmbed } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { useRouter } from "next/router";
const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];
const Header = ({
  balance,
  isBalanceVisible,
  toggleBalanceVisibility,
  // handleShowUserProfile,
  setShowPortfolio,
  setShowQRCode,
}) => {
  const [copied, setCopied] = useState(false);
  const { walletInfo, client } = useContext(WalletContext);
  const router = useRouter()
  const chains = [
    {
      id: 919,
      name: "Mode TestNet",
      testnet: true,
    },
    {
      id: 34443,
      name: "Mode Network",
      testnet: false,
    },
    {
      id: 167009,
      name: "Taiko",
      testnet: true,
    },
    {
      id: 167000,
      name: "Taiko (Mainnet)",
      testnet: false
    }
  ];
  const address = localStorage.getItem("walletAddress");

  const handleCopy = (text) => {
    copy(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const onDisconnect = async () => {
    localStorage.removeItem('walletAddress')
    router.push("/");
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
              <p>Wallets</p> <FaSortDown />
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
                onClick={() => handleCopy(address)}
              />
            )}
            {copied && <span className={styles.copiedTooltip}>Copied</span>}
          </div>
          <FaQrcode
            className={styles.icon}
            onClick={() => {
              setShowQRCode(true);
            }}
          />

          {/* <BiSolidBell className={styles.icon} /> */}
          <ConnectButton
            client={client}
            wallets={wallets}
            chains={chains}
            onDisconnect={onDisconnect}
            detailsButton={
              {
                style: {
                  width: '10%'
                }
              }
            }
            sho wAllWallets = {true}
          />
          {/* <FaGear className={styles.icon} onClick={handleShowUserProfile} /> */}
        </div>
      </div>
    </>
  );
};

export default Header;
