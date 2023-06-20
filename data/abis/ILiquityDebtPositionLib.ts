export const ILiquityDebtPositionLib = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_liquityBorrowerOperations",
        type: "address",
      },
      {
        internalType: "address",
        name: "_liquityTroveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lusd",
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
