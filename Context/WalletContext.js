import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { createThirdwebClient } from "thirdweb";
import { TOKEN_ICONS } from "../Components/TokensList";
import {
  THIRDWEB_CLIENT_ID,
  THIRDWEB_SECRET_KEY,
  TOKENS_PAIR_FOR_SWAP,
} from "../Components/Constants";
const icons = require("base64-cryptocurrency-icons");
import { useActiveAccount, useActiveWallet, useConnect } from "thirdweb/react";
import { EmbeddedWalletSdk } from "@thirdweb-dev/wallets";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState();
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
  const chains = {
    id: 34443,
    name: "Mode Network",
    testnet: true,
  };
  const { connect } = useConnect({
    client,
    accountAbstraction: {
      chain: chains,
      sponsorGas: true,
    },
  });

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const thirdwebEmbeddedWallet = new EmbeddedWalletSdk({
          clientId: THIRDWEB_CLIENT_ID,
          chain: chains,
        });

        setSdk(thirdwebEmbeddedWallet);
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("storage", loadWallet);
    loadWallet();

    return () => {
      window.removeEventListener("storage", loadWallet);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (provider && account) {
          const signer = provider.getSigner(account.address);
          setSigner(signer);
        } else {
          console.error("Provider or account not available.");
        }
      } catch (error) {
        console.error("Error setting up signer:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (!account?.address) return;

        const response = await axios.get(
          `https://explorer.mode.network/api/v2/addresses/${walletInfo.address}/tokens?type=ERC-20%2CERC-721%2CERC-1155`
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

    fetchTokens();
  }, [walletInfo?.address]);

  useEffect(() => {
    const fetchTokenAPR = async () => {
      try {
        if (!walletInfo?.address) return;

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

    fetchTokenAPR();
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

  const getBalance = async (address) => {
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
        account,
        setAccount,
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
        setSigner,
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
