import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  THIRDWEB_CLIENT_ID,
  THIRDWEB_SECRET_KEY,
  TOKENS_PAIR_FOR_SWAP,
} from "../Components/Constants";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { createThirdwebClient } from "thirdweb";
import { TOKEN_ICONS } from "../Components/TokensList";
const icons = require("base64-cryptocurrency-icons");

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletInfo, setWalletInfo] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [tokenList, setTokenList] = useState([]);
  const [showStakingModal, setShowStakingModal] = useState(false);
  const [balance, setBalance] = useState("0.0");
  const [sdk, setSdk] = useState(null);
  const [signer, setSigner] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.mode.network"
  );
  const client = createThirdwebClient({
    clientId: THIRDWEB_CLIENT_ID,
    secretKey: THIRDWEB_SECRET_KEY,
  });

  useEffect(() => {
    const loadWallet = () => {
      const mnemonic = localStorage.getItem("walletMnemonic");
      if (mnemonic) {
        try {
          const wallet = ethers.Wallet.fromMnemonic(mnemonic);
          setWalletInfo({
            address: wallet.address,
            mnemonic: mnemonic,
            privateKey: wallet.privateKey,
          });
        } catch (error) {
          console.error("Failed to create wallet from mnemonic:", error);
        }
      }
    };

    window.addEventListener("storage", loadWallet);
    loadWallet();

    return () => {
      window.removeEventListener("storage", loadWallet);
    };
  }, []);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(
          `https://explorer.mode.network/api/v2/addresses/${walletInfo?.address}/tokens?type=ERC-20%2CERC-721%2CERC-1155`
        );
        const updatedTokens = response.data.items.map((item) => {
          const parsedValue = parseFloat(item?.value);
          const trimmedValue = parsedValue.toFixed(5);

          return {
            name: item?.token?.name,
            address: item?.token?.address,
            symbol: item?.token?.symbol,
            icon:
              icons[item?.token?.symbol]?.icon ||
              TOKEN_ICONS[item?.token?.symbol.toLowerCase()] ||
              icons["GENERIC"]?.icon,
            value: trimmedValue,
            type: item?.token?.type,
            decimals: item?.token?.decimals,
          };
        });

        setTokens(updatedTokens);
        localStorage.setItem("tokensData", JSON.stringify(updatedTokens));
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    if (walletInfo?.address) {
      fetchTokens();
    }
  }, [walletInfo?.address]);

  useEffect(() => {
    const fetchTokenAPR = async () => {
      try {
        let storedTokenAPR = localStorage.getItem("tokenAPRData");
        if (storedTokenAPR) {
          storedTokenAPR = JSON.parse(storedTokenAPR);
          setTokens(storedTokenAPR);
        }

        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: tokens.map((token) => token.symbol.toLowerCase()).join(","),
              order: "market_cap_desc",
              per_page: 6,
              sparkline: false,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          const updatedTokens = tokens.map((token) => {
            const foundToken = response.data.find(
              (dataToken) => dataToken.symbol.toUpperCase() === token.symbol
            );
            if (foundToken) {
              return {
                ...token,
                aprChange: foundToken.price_change_percentage_24h,
              };
            }
            return token;
          });

          setTokens(updatedTokens);
          localStorage.setItem("tokenAPRData", JSON.stringify(updatedTokens));
        }
      } catch (error) {
        console.error("Error fetching APR data:", error);
      }
    };

    if (walletInfo?.address) {
      fetchTokenAPR();
    }
  }, [walletInfo?.address]);

  useEffect(() => {
    const updateTokenListWithIcons = () => {
      const updatedTokenList = TOKENS_PAIR_FOR_SWAP.map((token) => ({
        ...token,
        logoUri:
          icons[token?.symbol]?.icon ||
          TOKEN_ICONS[token?.symbol.toLowerCase()] ||
          icons["GENERIC"]?.icon,
      }));
      setTokenList(updatedTokenList);
    };
    updateTokenListWithIcons();
  }, []);

  useEffect(() => {
    const initializeSdk = async () => {
      if (walletInfo?.privateKey) {
        try {
          const sdkInstance = ThirdwebSDK.fromPrivateKey(
            walletInfo.privateKey,
            "https://mainnet.mode.network",
            { clientId: THIRDWEB_CLIENT_ID, secretKey: THIRDWEB_SECRET_KEY }
          );
          setSdk(sdkInstance);
          const activeSigner = sdkInstance.getSigner();
          if (activeSigner) {
            setSigner(activeSigner);
            await getBalance(walletInfo?.address, sdk);
          } else {
            console.error("No active signer found.");
          }
        } catch (error) {
          console.error("Failed to initialize SDK:", error);
        }
      }
    };
    if (walletInfo) initializeSdk();
  }, [walletInfo]);

  const getBalance = async (address, sdk) => {
    try {
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatUnits(balance, 18);
      setBalance(parseFloat(formattedBalance).toFixed(5));
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletInfo,
        setWalletInfo,
        tokens,
        setTokens,
        tokenList,
        showStakingModal,
        setShowStakingModal,
        signer,
        setBalance,
        balance,
        sdk,
        setSdk,
        getBalance,
        provider,
        client,
        toastMessage,
        setToastMessage,
        toastType,
        setToastType,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
