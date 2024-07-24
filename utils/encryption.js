import axios from 'axios';
import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || 'default_secret_key';

export const encryptMnemonic = (mnemonic) => {
    console.log(mnemonic);
  return CryptoJS.AES.encrypt(mnemonic, secretKey).toString();
};

export const decryptMnemonic = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const fetchTokenBalances = async (address) => {
  try {
    const apiKey = "cqt_rQMtbhVK8JwfpbtcWmWqMT99W9fv";
    const apiUrl = `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${apiKey}`;
    const response = await axios.get(apiUrl);
    const data = response?.data;

    if (!data.error) {
      const tokensWithBalance = data?.data?.items
        .filter((token) => parseFloat(token?.balance) > 0)
        .map((token) => ({
          logo_url: token?.logo_url,
          contract_ticker_symbol: token?.contract_ticker_symbol,
          contract_name: token?.contract_name,
          balance: token?.balance,
          contract_decimals: token?.contract_decimals,
          pretty_quote: token?.pretty_quote
        }));
      return tokensWithBalance;
    } else {
      console.error("Error fetching token balances:", data.error_message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching token balances:", error);
    return [];
  }
};
