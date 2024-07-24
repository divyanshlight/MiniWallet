import React, { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./CreateWallet.module.css";
import WalletInfo from "../WalletInfo/WalletInfo";
import WalletLogin from "../WalletLogin/WalletLogin";
import ImportWallet from "../ImportWallet/ImportWallet";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { WalletContext } from "../../Context/WalletContext";
import { THIRDWEB_CLIENT_ID, THIRDWEB_SECRET_KEY } from "../Constants";
import BottomSheetIframe from "../BottomSheet/BottomSheetIframe";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const chains = [
  {
    id: 919,
    name: "Mode TestNet",
    testnet: true,
    rpc: `https://919.rpc.thirdweb.com/${THIRDWEB_SECRET_KEY}`,
  },
  {
    id: 34443,
    name: "Mode Network",
    testnet: false,
    rpc: `https://34443.rpc.thirdweb.com/${THIRDWEB_SECRET_KEY}`,
  },
];

const CreateWalletPage = () => {
  const [walletCreated, setWalletCreated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showImportWallet, setShowImportWallet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [iframeOpen, setIframeOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const originalWindowOpenRef = useRef(null);

  const router = useRouter();
  const { client, setAccount } = useContext(WalletContext);
  // useEffect(() => {
  //   const fetchOauthLink = async () => {
  //     try {
  //       const response = await fetch('https://embedded-wallet.thirdweb.com/api/trpc/authentication.getHeadlessOauthLoginLink?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22authProvider%22%3A%22Google%22%2C%22baseUrl%22%3A%22https%3A%2F%2Fembedded-wallet.thirdweb.com%22%2C%22platform%22%3A%22web%22%7D%7D%7D');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch OAuth link');
  //       }
  //       const data = await response.json();
  //       // Assuming the response structure gives you the OAuth link
  //       const oauthLink = data?.response?.oauthLink || '';
  //       setOauthLink(oauthLink);
  //     } catch (error) {
  //       console.error('Error fetching OAuth link:', error);
  //     }
  //   };

  //   fetchOauthLink();
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     originalWindowOpenRef.current = window.open;
  //     const walletAddress = localStorage.getItem("walletAddress");
  //     if (walletAddress) {
  //       setLoading(true);
  //       router.push("/dashboard");
  //     }

  //     window.open = (url, name, specs) => {
  //       console.log("window.open called with URL:", url);
  //       setIframeUrl(url);
  //       setIframeOpen(true);

  //       const newWindow = {
  //         closed: false,
  //         location: {
  //           href: url,
  //         },
  //         close: () => {
  //           setIframeOpen(false);
  //         },
  //         focus: () => {},
  //         postMessage: (message, targetOrigin) => {},
  //         document: {
  //           title: "",
  //           body: {
  //             innerHTML: "<h1>Signing In...</h1>",
  //             style: {
  //               background: "",
  //               color: "",
  //             },
  //           },
  //         },
  //       };

  //       return newWindow;
  //     };

  //     return () => {
  //       if (originalWindowOpenRef.current) {
  //         window.open = originalWindowOpenRef.current;
  //       }
  //     };
  //   }
  // }, [router]);

  const handleBackToCreateWallet = () => {
    setShowLogin(!showLogin);
  };

  const handleOnConnect = async (account) => {
    console.log(account);
    setAccount(account.getAccount());
    const options = {
      client: client,
    };
    const accountInfo = await account?.autoConnect(options);
    localStorage.setItem("walletAddress", accountInfo?.address);
    console.log(accountInfo);
    console.log(account);
    router.push("/dashboard");
  };

  return (
    <>
      {/* <BottomSheetIframe
        open={iframeOpen}
        url={iframeUrl}
        onClose={() => setIframeOpen(false)}
      /> */}
      {!walletCreated ? (
        <>
          <div>
            <Head>
              <title>Create Wallet</title>
              <meta name="description" content="Create a new Ethereum wallet" />
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
                      The next generation of Telegram wallets: Secure, Fast, and
                      seamlessly integrated with the Mode Network for an
                      unparalleled user experience
                    </p>
                    <ConnectButton
                      client={client}
                      connectModal={{
                        size: "compact",
                        title: "Dexpedia",
                        showThirdwebBranding: false,
                        titleIcon: "/flat-logo-1.png",
                        backgroundColor: "#2b73ff",
                        color: "#FFF",
                        marginTop: "10%",
                        width: "87vw",
                      }}
                      connectButton={{
                        style: {
                          backgroundColor: "#2B73FF",
                          color: "#FFF",
                          marginTop: "10%",
                          width: "87vw",
                        },
                      }}
                      chains={chains}
                      wallets={wallets}
                      walletConnect={THIRDWEB_CLIENT_ID}
                      onConnect={handleOnConnect}
                      showThirdwebBranding={false}
                      auth={{
                        isLoggedIn: async (address, uri) => {
                          console.log("checking if logged in!", { uri });
                          return await isLoggedIn();
                        },
                        doLogin: async (params) => {
                          console.log("logging in!");
                          await login(params);
                        },

                        doLogout: async () => {
                          console.log("logging out!");
                          await logout();
                        },
                      }}
                    />
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
        </>
      ) : (
        <WalletInfo />
      )}
    </>
  );
};

export default CreateWalletPage;
