export const IUnpermissionedActionsWrapper = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_comptrollerProxy",
        type: "address",
      },
    ],
    name: "getContinuousFeesForFund",
    outputs: [
      {
        internalType: "address[]",
        name: "continuousFees_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeeManager",
    outputs: [
      {
        internalType: "address",
        name: "feeManager_",
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
        name: "_comptrollerProxy",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_fees",
        type: "address[]",
      },
    ],
    name: "invokeContinuousFeeHookAndPayoutSharesOutstandingForFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
