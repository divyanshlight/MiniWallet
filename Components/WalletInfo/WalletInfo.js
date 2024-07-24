import React, { useContext, useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import Image from "next/image";
import styles from "./WalletInfo.module.css";
import { useRouter } from "next/router";
import { BiSolidCopy } from "react-icons/bi";
import { ethers } from "ethers";
import { WalletContext } from "../../Context/WalletContext";
import Spinner from "../Spinner/Spinner";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
const WalletInfo = () => {
  const { walletInfo } = useContext(WalletContext);
  const [copied, setCopied] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCopy = (text) => {
    copy(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  const goToDashboard = async () => {
    if (!walletInfo) {
      console.error("Wallet info is not available");
      return;
    }
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.mode.network"
      );
      console.log(provider);
      const wallet = new ethers.Wallet(walletInfo.privateKey, provider);
      localStorage.setItem("walletAddress", wallet.address);
      setLoading(true);
      router.push("/dashboard", undefined, { shallow: true });
    } catch (error) {
      console.error("Error initializing wallet:", error);
    }
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      {!loading ? (
        <div className={styles.walletInfo}>
          <div className={styles.imageContainer}>
            <Image
              src="/logo-icon-texture-top.svg"
              alt="logo-icon-texture-top"
              width={147}
              height={190}
              className={styles.logo_icon_texture_top}
            />
          </div>
          <div className={styles.container}>
            <h2>Create Account</h2>
            <div className={styles.outerContainer}>
              <div className={styles.address}>
                <h3>Address</h3>
                <p>
                  We have created a unique address for you, which is similar to
                  your telegram nickname
                </p>
                <div className={styles.addressContainer}>
                  <label>Unique Address</label>
                  <p>{walletInfo?.address}</p>
                </div>
              </div>
              <div className={styles.seedPhrase}>
                <h3>Seed Phrase</h3>
                <p>
                  Copy your seed phrase right now to avoid losing your account!
                </p>
                <div className={styles.seedPhraseContainer}>
                  <div className={styles.labelWithIcon}>
                    <label>Unique Phrase</label>
                    <BiSolidCopy
                      className={styles.copyIcon}
                      onClick={() =>
                        handleCopy(walletInfo ? walletInfo.mnemonic : "")
                      }
                    />
                  </div>
                  <p
                    className={`${styles.seedPhraseText} ${
                      isBlurred ? styles.blurred : ""
                    }`}
                    onClick={toggleBlur}
                  >
                    {walletInfo ? walletInfo.mnemonic : "Loading..."}
                  </p>
                  {copied && <span className={styles.copiedText}>Copied!</span>}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={goToDashboard} className={styles.button}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default WalletInfo;
