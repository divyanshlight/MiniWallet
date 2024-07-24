export const INFURA_PROJECT_ID = "4fe361c48684491d84c8a889c1042a5c";
export const INFURA_PROJECT_SECRET =
  "E96kMHM54T6xUNVTXxKpJ/ewdFN1fkNLGOB7m8NjCcariWeYU8+utg";
export const THIRDWEB_CLIENT_ID = "d6ef10249a89a4eb7e73297feaaafbcb";
export const THIRDWEB_SECRET_KEY =
  "RPovIC7M9BPHDTB_6MS2oHyf-PuX2XNVBhKNOFH9F0r4Lj8WlU8WEOlNRFVokw_5o5yTN-IsCKrAOtycS3GM2A";
export const CHAINS = [
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
export const TOKENS_PAIR_FOR_SWAP = [
  {
    symbol: "KIM",
    contractAddress: "0x6863fb62Ed27A9DdF458105B507C15b5d741d62e",
    decimals: 18,
    logoUri: "",
    name: "KIM",
  },
  {
    symbol: "MODE",
    contractAddress: "0xDfc7C877a950e49D2610114102175A06C2e3167a",
    decimals: 18,
    logoUri: "",
    name: "MODE",
  },
  {
    symbol: "ETH",
    contractAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
    logoUri: "",
    name: "ETH",
  },
  {
    symbol: "USDC",
    contractAddress: "0xd988097fb8612cc24eeC14542bC03424c656005f",
    decimals: 6,
    logoUri: "",
    name: "USDC",
  },
  {
    symbol: "ezETH",
    contractAddress: "0x2416092f143378750bb29b79eD961ab195CcEea5",
    decimals: 18,
    logoUri: "",
    name: "Renzo Staked ETH",
  },
  {
    symbol: "(NEW) weETH.mode",
    contractAddress: "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A",
    decimals: 18,
    logoUri: "",
    name: "Wrapped eETH",
  },
  {
    symbol: "WBTC",
    contractAddress: "0xcdd475325d6f564d27247d1dddbb0dac6fa0a5cf",
    decimals: 8,
    logoUri: "",
    name: "WBTC",
  },
  {
    symbol: "wrsETH",
    contractAddress: "0xe7903B1F75C534Dd8159b313d92cDCfbC62cB3Cd",
    decimals: 18,
    logoUri: "",
    name: "wrsETH",
  },
  {
    symbol: "M-BTC",
    contractAddress: "0x59889b7021243dB5B1e065385F918316cD90D46c",
    decimals: 18,
    logoUri: "",
    name: "Merlin BTC",
  },
  {
    symbol: "USDT",
    contractAddress: "0xf0F161fDA2712DB8b566946122a5af183995e2eD",
    decimals: 6,
    logoUri: "",
    name: "USDT",
  },
  {
    symbol: "pxETH",
    contractAddress: "0x9E0d7D79735e1c63333128149c7b616a0dC0bBDb",
    decimals: 18,
    logoUri: "",
    name: "Pirex Ether OFT",
  },
  {
    symbol: "Stone",
    contractAddress: "0x80137510979822322193FC997d400D5A6C747bf7",
    decimals: 18,
    logoUri: "",
    name: "StakeStone Ether",
  },
  {
    symbol: "WETH",
    contractAddress: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    logoUri: "",
    name: "WETH",
  },
  {
    symbol: "MOCHAD",
    contractAddress: "0xcDa802a5BFFaa02b842651266969A5Bba0c66D3e",
    decimals: 18,
    logoUri: "",
    name: "MoChadCoin",
    isMeme: true,
  },
  {
    symbol: "DJUMP",
    contractAddress: "0xb9dF4BD9d3103cF1FB184BF5e6b54Cf55de81747",
    decimals: 18,
    logoUri: "",
    name: "Degen Jump",
    isMeme: true,
  },
  {
    symbol: "ankrETH",
    contractAddress: "0x12D8CE035c5DE3Ce39B1fDD4C1d5a745EAbA3b8C",
    decimals: 18,
    logoUri: "",
    name: "Ankr Staked ETH",
  },
  {
    symbol: "gVEC",
    contractAddress: "0x1BB9b64927e0C5e207C9DB4093b3738Eef5D8447",
    decimals: 18,
    logoUri: "",
    name: "Governance VEC",
  },
  {
    symbol: "vETH",
    contractAddress: "0xa26df9D7342Ae8b3855B347C043C05EED269e0A9",
    decimals: 18,
    logoUri: "",
    name: "Vector ETH",
  },
  {
    symbol: "(OLD) weETH",
    contractAddress: "0x028227c4dd1e5419d11Bb6fa6e661920c519D4F5",
    decimals: 18,
    logoUri: "",
    name: "(OLD) Wrapped eETH",
  },
  {
    symbol: "ION",
    contractAddress: "0x18470019bF0E94611f15852F7e93cf5D65BC34CA",
    decimals: 18,
    logoUri: "",
    name: "Ionic",
  },
  {
    symbol: "inETH",
    contractAddress: "0x5A7a183B6B44Dc4EC2E3d2eF43F98C5152b1d76d",
    decimals: 18,
    logoUri: "",
    name: "InceptionLRT restaked ETH",
  },
  {
    symbol: "pMODE",
    contractAddress: "0x7E0ddf49F70a1916849523d3F43DD5AFf27C6587",
    decimals: 18,
    logoUri: "",
    name: "MODE POD",
  },
  {
    symbol: "PEAS",
    contractAddress: "0x02f92800F57BCD74066F5709F1Daa1A4302Df875",
    decimals: 18,
    logoUri: "",
    name: "Peapods",
  },
];
export const CONTRACT_FOR_SWAP = [
  {
    contractAddress: "0x8cfe2a02dfbabc56ae7e573170e35f88a38bea55",
    boost: true,
    points: false,
    new: true,
    event: false,
    pair: "ETH-MODE",
    tooltips: { boost: ["5x Mode points"], event: ["1 million in May"] },
  },
  {
    contractAddress: "0x3c3a173984e3152fed868345904ec0c9325fa516",
    boost: true,
    points: false,
    new: true,
    event: false,
    pair: "ETH-KIM",
    tooltips: { boost: ["5x Mode points"], event: ["1 million in May"] },
  },
  {
    contractAddress: "0x86d9d9dd7a2c3146c6fad51646f210cb2e5fc12f",
    boost: true,
    points: false,
    new: true,
    event: false,
    pair: "KIM-MODE",
    tooltips: { boost: ["5x Mode points"], event: ["1 million in May"] },
  },
  {
    contractAddress: "0x79bcc8cf4b017e445293b28d256f40558797a876",
    boost: true,
    points: false,
    event: false,
    pair: "ETH-M-BTC",
    tooltips: { boost: ["4x Mode points"] },
  },
  {
    contractAddress: "0xffa2f1a8d17c7ba314bde272ad8e072c81aef331",
    boost: true,
    points: false,
    new: false,
    pair: "ETH-pxETH",
    tooltips: { boost: ["4x Mode points"] },
  },
  {
    contractAddress: "0xbed8709745125b87f2f9cb74b1bf43188e60aa05",
    boost: true,
    points: false,
    new: true,
    pair: "ETH-inETH",
    tooltips: { boost: ["ETH staking APR", "3x Mode Points", "15x Totems"] },
  },
  {
    contractAddress: "0x468cc91df6f669cae6cdce766995bd7874052fbc",
    boost: true,
    points: false,
    new: false,
    event: false,
    pair: "ETH-USDC",
    tooltips: { boost: ["5x Mode points"], event: ["1 million in May"] },
  },
  {
    contractAddress: "0x27f0976b26194c448d987c275bb409eab6083964",
    boost: true,
    points: false,
    new: false,
    pair: "ETH-wrsETH",
    tooltips: { boost: ["3x Mode points", "2x Kelp Miles", "1x EL points"] },
  },
  {
    contractAddress: "0xd9a06f63e523757973ffd1a4606a1260252636d2",
    boost: true,
    points: false,
    pair: "ezETH-ETH",
    tooltips: {
      boost: [
        "4x Mode points",
        "ETH staking APR",
        "EL staking APR",
        "4x ezPoints",
        "1x EL points",
      ],
    },
  },
  {
    contractAddress: "0x4eb0e100da2732bdc79d03c8d33a15bd42fe59f9",
    boost: true,
    points: false,
    pair: "(OLD) weETH-ETH",
    tooltips: {
      boost: [
        "4x Mode points",
        "ETH staking APR",
        "EL staking APR",
        "1.2x Etherfi points",
        "1x EL points",
      ],
    },
  },
  {
    contractAddress: "0x2509aebb0ea268439bf7aaabe52e621277a76933",
    boost: true,
    points: false,
    pair: "ETH-Stone",
    tooltips: { boost: ["4x Mode points", "ETH Staking APR"] },
  },
  {
    contractAddress: "0xe24c8feb38ca2b18b542994bfba7e70880171035",
    boost: true,
    points: false,
    pair: "(NEW) weETH.mode-ETH",
    tooltips: {
      boost: [
        "4x Mode points",
        "ETH staking APR",
        "EL staking APR",
        "3x Etherfi points",
        "1x EL points",
      ],
    },
  },
  {
    contractAddress: "0xa9edc4fd8efc9bd281f3a9b2a414c80585bce866",
    boost: false,
    points: false,
    new: true,
    pair: "ETH-MoChad",
    verified_meme: true,
    event: false,
    tooltips: { event: ["Mochad"] },
  },
  {
    contractAddress: "0x3ac37f46500c5a0f9e37846f067a12bdb1370ff1",
    boost: false,
    points: false,
    new: false,
    pair: "ETH-DJUMP",
    verified_meme: true,
  },
];

export const TOKEN_OPTIONS = [
  { label: "USDC", value: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
  { label: "DAI", value: "0x6b175474e89094c44da98b954eedeac495271d0f" },
  { label: "LINK", value: "0x514910771af9ca656af840dff83e8264ecf986ca" },
];
export function numberToBigNumberFixed(n, decimals) {
  return BigInt(Math.round(n * Math.pow(10, decimals))).toString();
}

export const KIM_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_WETH",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountADesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountTokenDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feeSharingContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "assign",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
    ],
    name: "getAmountsOut",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "token2",
        type: "address",
      },
    ],
    name: "getPair",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveB",
        type: "uint256",
      },
    ],
    name: "quote",
    outputs: [
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feeSharingContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "register",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
