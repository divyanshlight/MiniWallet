import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import { ethers } from "ethers";
import {
  FaUser,
  FaStickyNote,
  FaArrowLeft,
  FaCopy,
  FaAddressBook,
} from "react-icons/fa";
import { useRouter } from "next/router";
import copy from "copy-to-clipboard";
import SeedPhraseInfo from "./SeedPhraseInfo.js";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BiSolidCopy } from "react-icons/bi";

function UserProfile({ handleCloseUserProfile }) {
  const [walletInfo, setWalletInfo] = useState(null);
  const [showSeedPhraseInfo, setShowSeedPhraseInfo] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [copiedText, setCopiedText] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const mnemonic = localStorage.getItem("walletMnemonic");
    if (mnemonic) {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      setWalletInfo({
        address: wallet.address,
        mnemonic: mnemonic,
        privateKey: wallet.privateKey,
      });
    } else {
      console.error("Mnemonic not found in local storage");
    }
  }, []);

  useEffect(() => {
    const tele = window.Telegram.WebApp;
    if (tele) {
      tele.ready();
      tele.expand();
      tele.viewportStableHeight;
      console.log(tele);
    }
  }, []);
  const handleCopy = (text) => {
    copy(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };
  const backToDashboard = () => {
    handleCloseUserProfile();
  };

  const toggleSeedPhraseInfo = () => {
    setShowSeedPhraseInfo(!showSeedPhraseInfo);
  };

  const toggleAddressDetails = () => {
    setShowAddressDetails(!showAddressDetails);
  };

  const logout = () => {
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletPublicKey");
    localStorage.removeItem("tokensData");
    localStorage.removeItem("tokenAPRData");
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.walletInfo}>
        {!showSeedPhraseInfo && !showAddressDetails && (
          <div className={styles.profileContainer}>
            <div className={styles.backButton} onClick={backToDashboard}>
              <IoChevronBackOutline /><p>Back</p>
            </div>{" "}
            <div>
              <h2 className={styles.heading}>Credentials</h2>
            </div>{" "}
            <div className={styles.toolTipContainer}>
            <IoIosInformationCircleOutline size={22} />

              <p>
                Do not share your passphrase or private key with anyone, even
                with us!
              </p>
            </div>
            <div className={styles.seedPhraseContainer}>
              <div className={styles.labelWithIcon}>
                <p>Address</p>
                <div
                  className={styles.copyIcon}
                  onClick={() => handleCopy(walletInfo && walletInfo.address)}
                >
                  <BiSolidCopy />
                </div>
              </div>
              <div className={styles.seedPhraseContent}>
                <p className={styles.seedPhraseText}>
                  {walletInfo && walletInfo.address}
                </p>
              </div>
              {copiedText === walletInfo?.address && (
                <span className={styles.copiedText}>Copied!</span>
              )}
            </div>
            <SeedPhraseInfo
              privateKey={walletInfo && walletInfo.privateKey}
              mnemonic={walletInfo && walletInfo.mnemonic}
              onBack={toggleSeedPhraseInfo}
              handleCopy={handleCopy}
              copiedText={copiedText}
            />
            <div className={styles.buttonContainer}>
              <button onClick={logout} className={styles.button}>
                Logout
              </button>
            </div>
          </div>
        )}

        <></>
      </div>
    </div>
  );
}

export default UserProfile;
