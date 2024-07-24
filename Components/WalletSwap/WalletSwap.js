import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import styles from "./WalletSwap.module.css";
import Toast from "../Toast/Toast";
import { WalletContext } from "../../Context/WalletContext";
import { KIM_ABI, WETH_ADDRESS } from "../Constants";
import { FaGear } from "react-icons/fa6";
import { IoSwapVertical } from "react-icons/io5";
import TokenModal from "./TokenModal";
import SwapBox from "./SwapBox";
import IUniswapV2Pair from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";

const ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

function WalletSwap() {
  const { tokenList } = useContext(WalletContext);
  const [tokenInfoA, setTokenInfoA] = useState(null);
  const [tokenInfoB, setTokenInfoB] = useState(null);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: null, type: null });
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isTokenAModalOpen, setIsTokenAModalOpen] = useState(false);
  const [isTokenBModalOpen, setIsTokenBModalOpen] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(null);
  const [lpFee, setLpFee] = useState(null);
  const [priceImpact, setPriceImpact] = useState(null);
  const [swapDisabled, setSwapDisabled] = useState(true);
  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  const [signer, setSigner] = useState();
  
  const rpcBaseUrl = activeChain?.rpc.split('${')[0];
  const provider = new ethers.providers.JsonRpcProvider(
    rpcBaseUrl
  );
  useEffect(() => {
    if (activeAccount) {
      const activeSigner = provider.getSigner(activeAccount.address);
      setSigner(activeSigner);
      setIsWalletConnected(true);
    }
  }, [activeAccount]);

  const checkBalance = async () => {
    if (signer) {
      const balance = await signer.getBalance();
      console.log("Account Balance:", ethers.utils.formatEther(balance));
    }
  };

  useEffect(() => {
    checkBalance();
  }, [signer]);

  useEffect(() => {
    const defaultTokenA = tokenList.find((token) => token.symbol === "USDC");
    const defaultTokenB = tokenList.find((token) => token.symbol === "ETH");
    setTokenInfoA(defaultTokenA);
    setTokenInfoB(defaultTokenB);
  }, [tokenList]);

  useEffect(() => {
    if (tokenInfoA && tokenInfoB && amountA) {
      calculateSwapDetails();
    }
    updateSwapDisabledState();
  }, [tokenInfoA, tokenInfoB, amountA]);

  const handleCloseToast = () => {
      setMessage({ text: null, type: null });
  };

  const handleSelectTokenA = (token) => {
    if (token.contractAddress === tokenInfoB?.contractAddress) {
      setTokenInfoB(tokenList.find((token) => token.symbol === "ETH"));
    }
    setTokenInfoA(token);
    setIsTokenAModalOpen(false);
  };

  const handleSelectTokenB = (token) => {
    if (token.contractAddress === tokenInfoA?.contractAddress) {
      setTokenInfoB(tokenList.find((token) => token.symbol === "ETH"));
    }
    setTokenInfoB(token);
    setIsTokenBModalOpen(false);
  };

  const handleSwapTokens = () => {
    const tempTokenInfo = tokenInfoA;
    const tempAmount = amountA;
    setTokenInfoA(tokenInfoB);
    setTokenInfoB(tempTokenInfo);
    setAmountA(amountB);
    setAmountB(tempAmount);
  };

  const checkReserves = async (routerContract, tokenFromAddress, tokenToAddress) => {
    try {
      console.log(tokenFromAddress, tokenToAddress);
      const pair = await routerContract.getPair(tokenFromAddress, tokenToAddress);
      if (pair === ethers.constants.AddressZero) {
        console.error("Pair contract address is zero");
        throw new Error("Pair contract address is zero");
      }
      const pairContract = new ethers.Contract(pair, IUniswapV2Pair.abi, signer);
      console.log(pairContract);
      const reserves = await pairContract.getReserves();
      console.log(`Reserves for pair ${tokenFromAddress} - ${tokenToAddress}:`, reserves);
      return reserves;
    } catch (error) {
      console.error(`Error fetching reserves for pair ${tokenFromAddress} - ${tokenToAddress}:`, error);
      throw error;
    }
  };

  const approveToken = async (tokenContract, spender, amount) => {
    const approveTx = await tokenContract.approve(spender, amount);
    await approveTx.wait();
  };

  const swapTokens = async () => {
    try {
      setLoading(true);
      setMessage({ text: null, type: null });
  
      if (!tokenInfoA || !tokenInfoB || !amountA) {
        throw new Error("Please fill all fields.");
      }
  
      const routerAddress = "0x5D61c537393cf21893BE619E36fC94cd73C77DD3";
      const routerContract = new ethers.Contract(
        routerAddress,
        KIM_ABI,
        signer
      );
      let tokenFromAddress = tokenInfoA.contractAddress;
      let tokenToAddress = tokenInfoB.contractAddress;
  
      // Check if tokenFromAddress or tokenToAddress is ETH and replace with WETH address
      if (tokenFromAddress === ETH_ADDRESS) {
        tokenFromAddress = WETH_ADDRESS;
      }
      if (tokenToAddress === ETH_ADDRESS) {
        tokenToAddress = WETH_ADDRESS;
      }
  
      const decimalsA = tokenInfoA.decimals;
      const tokenAmountIn = ethers.utils.parseUnits(amountA, decimalsA);
  
      const reserves = await checkReserves(
        routerContract,
        tokenFromAddress,
        tokenToAddress
      );
      const directSwapPossible = reserves[0].gt(0) && reserves[1].gt(0);
  
      let tx;
  
      if (!directSwapPossible) {
        // Swap through WETH
        const tokenAContract = new ethers.Contract(
          tokenFromAddress,
          ["function approve(address spender, uint256 amount) returns (bool)"],
          signer
        );
        await approveToken(tokenAContract, routerAddress, tokenAmountIn);
  
        // Convert tokenA to WETH
        await executeSwap(
          routerContract,
          tokenFromAddress,
          WETH_ADDRESS,
          tokenAmountIn
        );
  
        // Swap WETH to tokenB
        const wethAmount = await routerContract.getAmountsOut(tokenAmountIn, [
          tokenFromAddress,
          WETH_ADDRESS,
        ]);
        await executeSwap(
          routerContract,
          WETH_ADDRESS,
          tokenToAddress,
          wethAmount[1]
        );
      } else {
        // Direct swap possible
        const tokenAContract = new ethers.Contract(
          tokenFromAddress,
          ["function approve(address spender, uint256 amount) returns (bool)"],
          signer
        );
        await approveToken(tokenAContract, routerAddress, tokenAmountIn);
  
        tx = await executeSwap(
          routerContract,
          tokenFromAddress,
          tokenToAddress,
          tokenAmountIn
        );
      }
  
      const transactionHash = tx?.transactionHash;
      setMessage({
        text: `Swap successful. Click the below to see the transaction details.`,
        type: "success",
        transactionHash: transactionHash,
      });
    } catch (error) {
      console.error("Error while swapping:", error);
      let errorMsg =
        "Transaction failed. Please check your transaction details and try again.";
      if (error.message.includes("insufficient funds")) {
        errorMsg = "Insufficient funds to complete the transaction.";
      } else if (
        error.message.includes("Token pair is not available in the pool.")
      ) {
        errorMsg = "The selected token pair is not available in the pool.";
      }
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };
  

  const executeSwap = async (
    routerContract,
    tokenFromAddress,
    tokenToAddress,
    tokenAmountIn
  ) => {
    const amountsOut = await routerContract.getAmountsOut(tokenAmountIn, [
      tokenFromAddress,
      tokenToAddress,
    ]);
    const tokenAmountOutMin = amountsOut[1];
    const gasPrice = await provider.getGasPrice();
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    let tx;

    if (tokenFromAddress === WETH_ADDRESS) {
      tx =
        await routerContract.swapExactETHForTokensSupportingFeeOnTransferTokens(
          tokenAmountOutMin,
          [WETH_ADDRESS, tokenToAddress],
          signer.address,
          ethers.constants.AddressZero,
          deadline,
          {
            gasLimit: ethers.utils.hexlify(800000),
            gasPrice: gasPrice.toString(),
          }
        );
    } else if (tokenToAddress === WETH_ADDRESS) {
      tx =
        await routerContract.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tokenAmountIn,
          tokenAmountOutMin,
          [tokenFromAddress, WETH_ADDRESS],
          signer.address,
          ethers.constants.AddressZero,
            deadline,
          {
            gasLimit: ethers.utils.hexlify(800000),
            gasPrice: gasPrice.toString(),
          }
        );
    } else {
      tx =
        await routerContract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
          tokenAmountIn,
          tokenAmountOutMin,
          [tokenFromAddress, tokenToAddress],
          signer.address,
          ethers.constants.AddressZero,
          deadline,
          {
            gasLimit: ethers.utils.hexlify(800000),
            gasPrice: gasPrice.toString(),
          }
        );
    }

    const receipt = await tx.wait();
    console.log("Transaction receipt:", receipt);
    return receipt;
  };

  const calculateSwapDetails = async () => {
    try {
      if (!tokenInfoA || !tokenInfoB || !amountA) {
        throw new Error("Please select tokens and enter amount.");
      }

      const routerAddress = "0x5D61c537393cf21893BE619E36fC94cd73C77DD3";
      const routerContract = new ethers.Contract(
        routerAddress,
        KIM_ABI,
        signer
      );
      console.log(routerContract);
      let tokenFromAddress = tokenInfoA.contractAddress;
      let tokenToAddress = tokenInfoB.contractAddress;
      // Check if tokenFromAddress or tokenToAddress is ETH and replace with WETH address
      if (tokenFromAddress === ETH_ADDRESS) {
        tokenFromAddress = WETH_ADDRESS;
      }
      if (tokenToAddress === ETH_ADDRESS) {
        tokenToAddress = WETH_ADDRESS;
      }

      const decimalsA = tokenInfoA.decimals;
      const tokenAmountIn = ethers.utils.parseUnits(amountA, decimalsA);

      const reserves = await checkReserves(
        routerContract,
        tokenFromAddress,
        tokenToAddress
      );
      const directSwapPossible = reserves[0].gt(0) && reserves[1].gt(0);

      let amountsOut, tokenAmountOutMin;

      if (directSwapPossible) {
        amountsOut = await routerContract.getAmountsOut(tokenAmountIn, [
          tokenFromAddress,
          tokenToAddress,
        ]);
        tokenAmountOutMin = amountsOut[1];
      } else {
          // Swap through WETH
        const amountsOutToWETH = await routerContract.getAmountsOut(
          tokenAmountIn,
          [tokenFromAddress, WETH_ADDRESS]
        );
        const tokenAmountInWETH = amountsOutToWETH[1];

        const amountsOutFromWETH = await routerContract.getAmountsOut(
          tokenAmountInWETH,
          [WETH_ADDRESS, tokenToAddress]
        );
        tokenAmountOutMin = amountsOutFromWETH[1];
      }

      const tokenAmountOutMinFormatted = ethers.utils.formatUnits(
        tokenAmountOutMin,
        tokenInfoB.decimals
      );

      const priceImpactValue = calculatePriceImpact(
        reserves,
        tokenAmountIn,
        tokenAmountOutMin
      );
      const lpFeeValue = calculateLpFee(tokenAmountIn);

      setAmountB(tokenAmountOutMinFormatted);
      setMinimumReceived(tokenAmountOutMinFormatted);
      setPriceImpact(priceImpactValue);
      setLpFee(lpFeeValue);
    } catch (error) {
      console.error("Error while calculating swap details:", error);
    }
  };

  const handleAmountAChange = (e) => {
    const value = e.target.value;
    setAmountA(value);
    if (!value) {
      setAmountB("");
      setMinimumReceived(null);
      setLpFee(null);
      setPriceImpact(null);
    }
  };

  const calculatePriceImpact = (reserves, tokenAmountIn, tokenAmountOutMin) => {
    const reserveIn = reserves[0];
    const reserveOut = reserves[1];

    const amountInWithFee = tokenAmountIn.mul(997);
    const numerator = amountInWithFee.mul(reserveOut);
    const denominator = reserveIn.mul(1000).add(amountInWithFee);
    const amountOut = numerator.div(denominator);

    const priceImpact = tokenAmountOutMin.sub(amountOut);
    return ethers.utils.formatUnits(priceImpact, tokenInfoB.decimals);
  };

  const calculateLpFee = (tokenAmountIn) => {
    return ethers.utils.formatUnits(
      tokenAmountIn.mul(3).div(1000),
      tokenInfoA.decimals
    );
  };

  const isTokenPairAvailable = async () => {
    try {
      if (!tokenInfoA || !tokenInfoB) return false;
  
      const routerAddress = "0x5D61c537393cf21893BE619E36fC94cd73C77DD3";
      const routerContract = new ethers.Contract(routerAddress, KIM_ABI, signer);
      let tokenFromAddress = tokenInfoA.contractAddress;
      let tokenToAddress = tokenInfoB.contractAddress;
      if (tokenFromAddress === ETH_ADDRESS) {
        tokenFromAddress = WETH_ADDRESS;
      }
      if (tokenToAddress === ETH_ADDRESS) {
        tokenToAddress = WETH_ADDRESS;
      }
  
      const pair = await routerContract.getPair(tokenFromAddress, tokenToAddress);
      console.log(pair);
      const pairAvailable = pair !== ethers.constants.AddressZero;
  
      console.log(`Pair available for ${tokenFromAddress} - ${tokenToAddress}: ${pairAvailable}`);
      return pairAvailable;
    } catch (error) {
      console.error("Error checking token pair availability:", error);
      return false;
    }
  };

  const updateSwapDisabledState = async () => {
    const pairAvailable = await isTokenPairAvailable();
    setSwapDisabled(!pairAvailable);
  };
  return (
    <div className={styles.swapContainer}>
      <Toast message={message} type={message.type} onClose={handleCloseToast} />
      <h2 className={styles.title}>SWAP</h2>
      {isWalletConnected ? (
        <>
          <div className={styles.swapHeader}>
            <div className={styles.versionTab}>
              <p className={styles.tab}>V4</p>
            </div>
            <FaGear size={20} color="#787878" />
          </div>
          <div className={styles.swappingContainers}>
            <SwapBox
              label="To"
              tokenInfo={tokenInfoB}
              amount={amountB}
              onAmountChange={() => {}}
              onTokenClick={() => setIsTokenBModalOpen(true)}
            />
            <div className={styles.circle} onClick={handleSwapTokens}>
              <IoSwapVertical size={16} color="#2B73FF" />
            </div>
            <SwapBox
              label="From"
              tokenInfo={tokenInfoA}
              amount={amountA}
              onAmountChange={handleAmountAChange}
              onTokenClick={() => setIsTokenAModalOpen(true)}
            />
          </div>

          {isTokenAModalOpen && (
            <TokenModal
              title="Select Token A"
              tokenList={tokenList}
              onSelectToken={handleSelectTokenA}
              onClose={() => setIsTokenAModalOpen(false)}
            />
          )}

          {isTokenBModalOpen && (
            <TokenModal
              title="Select Token B"
              tokenList={tokenList}
              onSelectToken={handleSelectTokenB}
              onClose={() => setIsTokenBModalOpen(false)}
            />
          )}

          {tokenInfoA && tokenInfoB && (
            <div className={styles.detailsContainer}>
              <p>Minimum Received: {minimumReceived}</p>
              <p>LP Fee: {lpFee}</p>
              <p>Price Impact: {priceImpact}</p>
              <p>Slippage tolerance: 0.5%</p>
              {/* <p>
                Route:{" "}
                {directSwapPossible
                  ? `${tokenInfoA.symbol} -> ${tokenInfoB.symbol}`
                  : `${tokenInfoA.symbol} -> WETH -> ${tokenInfoB.symbol}`}
              </p> */}
            </div>
          )}

          <button
            className={styles.button}
            onClick={swapTokens}
            disabled={loading || swapDisabled}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </>
      ) : (
        <p>Please connect your wallet to proceed.</p>
      )}
    </div>
  );
}

export default WalletSwap;
