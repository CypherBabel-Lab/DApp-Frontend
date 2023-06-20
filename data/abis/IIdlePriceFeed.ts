export const IIdlePriceFeed = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundDeployer",
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
        name: "derivative",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "underlying",
        type: "address",
      },
    ],
    name: "DerivativeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "derivative",
        type: "address",
      },
    ],
    name: "DerivativeRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_derivatives",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_underlyings",
        type: "address[]",
      },
    ],
    name: "addDerivatives",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_derivative",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_derivativeAmount",
        type: "uint256",
      },
    ],
    name: "calcUnderlyingValues",
    outputs: [
      {
        internalType: "address[]",
        name: "underlyings_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "underlyingAmounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFundDeployer",
    outputs: [
      {
        internalType: "address",
        name: "fundDeployer_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "owner_",
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
        name: "_derivative",
        type: "address",
      },
    ],
    name: "getUnderlyingForDerivative",
    outputs: [
      {
        internalType: "address",
        name: "underlying_",
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
        name: "_asset",
        type: "address",
      },
    ],
    name: "isSupportedAsset",
    outputs: [
      {
        internalType: "bool",
        name: "isSupported_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_derivatives",
        type: "address[]",
      },
    ],
    name: "removeDerivatives",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
