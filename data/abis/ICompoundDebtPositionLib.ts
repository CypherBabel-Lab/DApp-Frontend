export const ICompoundDebtPositionLib = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_compoundComptroller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_compToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
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
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AssetBorrowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BorrowedAssetRepaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CollateralAssetAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CollateralAssetRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "assetIsCollateral",
    outputs: [
      {
        internalType: "bool",
        name: "isCollateral",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrowedAsset",
        type: "address",
      },
    ],
    name: "getCTokenFromBorrowedAsset",
    outputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCompToken",
    outputs: [
      {
        internalType: "address",
        name: "compToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCompoundComptroller",
    outputs: [
      {
        internalType: "address",
        name: "compoundComptroller_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDebtAssets",
    outputs: [
      {
        internalType: "address[]",
        name: "assets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getManagedAssets",
    outputs: [
      {
        internalType: "address[]",
        name: "assets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getWethToken",
    outputs: [
      {
        internalType: "address",
        name: "wethToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_actionData",
        type: "bytes",
      },
    ],
    name: "receiveCallFromVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
