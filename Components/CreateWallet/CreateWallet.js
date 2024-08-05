import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { MutatingDots } from "react-loader-spinner";
import styles from "./CreateWallet.module.css";
import WalletInfo from "../WalletInfo/WalletInfo";
import WalletLogin from "../WalletLogin/WalletLogin";
import Spinner from "../Spinner/Spinner";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ImportWallet from "../ImportWallet/ImportWallet";

const CreateWallet = () => {
  const [walletCreated, setWalletCreated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showImportWallet, setShowImportWallet] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (walletAddress) {
      setLoading(true);
      router.push("/dashboard");
    }
  }, [router]);

  const createWallet = async () => {
    try {
      const wallet = ethers.Wallet.createRandom();
      const address = wallet.address;
      const mnemonic = wallet.mnemonic.phrase;
      const publicKey = wallet.publicKey;

      localStorage.setItem("walletAddress", address);
      localStorage.setItem("walletMnemonic", mnemonic);
      localStorage.setItem("walletPublicKey", publicKey);
      window.dispatchEvent(new Event("storage"));

      setLoading(true);
      setWalletCreated(true);
    } catch (error) {
      console.error("Error creating wallet:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBackToCreateWallet = () => {
    setShowLogin(!showLogin);
  };
  return (
    <>
      {!walletCreated ? (
        <>
          {!loading ? (
            <div>
              <Head>
                <title>Create Wallet</title>
                <meta
                  name="description"
                  content="Create a new Ethereum wallet"
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <main className={styles.main}>
                {showLogin ? (
                  <WalletLogin
                    handleBackToCreateWallet={handleBackToCreateWallet}
                  />
                ) : showImportWallet ? (
                  <ImportWallet
                    showImportWallet={showImportWallet}
                    setShowImportWallet={setShowImportWallet}
                  />
                ) : (
                  <div className={styles.container}>
                    <div className={styles.logoContainer}>
                      <Image
                        src="/logo.svg"
                        alt="Wallet Icon"
                        width={300}
                        height={50}
                        className={styles.image}
                      />
                      <p className={styles.description}>
                        The next generation of Telegram wallets: Secure, Fast.
                        and seamlessly integrated with the Mode Network for an
                        unparalleled user experience
                      </p>
                      <button
                        className={styles.button}
                        onClick={createWallet}
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "Create"}
                      </button>

                      <button
                        className={styles.loginButton}
                        onClick={() => setShowLogin(true)}
                      >
                        Log in
                      </button>
                      <button
                        className={styles.loginButton}
                        onClick={() => setShowImportWallet(true)}
                      >
                        Import Wallet{" "}
                      </button>
                    </div>
                    <div className={styles.imageContainer}>
                      <span className={styles.blur_bg}></span>
                      <Image
                        src="/logo-icon-texture-top.svg"
                        alt="logo-icon-texture-top"
                        width={147}
                        height={190}
                        className={styles.logo_icon_texture_top}
                      />
                      <Image
                        src="/logo-icon-texture-bottom.svg"
                        alt="logo-icon-texture-top"
                        width={147}
                        height={190}
                        className={styles.logo_icon_texture_bottom}
                      />
                    </div>
                  </div>
                )}
              </main>
            </div>
          ) : (
            <LoadingScreen />
          )}
        </>
      ) : (
        <WalletInfo />
      )}
    </>
  );
};

export default CreateWallet;
