export const IGasRelayPaymasterLib = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_wethToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_relayHub",
        type: "address",
      },
      {
        internalType: "address",
        name: "_trustedForwarder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_depositCooldown",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_depositMaxTotal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_relayFeeMaxBase",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_relayFeeMaxPercent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "authorizer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "invokedSelector",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "successful",
        type: "bool",
      },
    ],
    name: "TransactionRelayed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getGasAndDataLimits",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "acceptanceBudget",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preRelayedCallGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "postRelayedCallGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "calldataSizeLimit",
            type: "uint256",
          },
        ],
        internalType: "struct IGsnPaymaster.GasAndDataLimits",
        name: "limits_",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHubAddr",
    outputs: [
      {
        internalType: "address",
        name: "relayHub_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastDepositTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "lastDepositTimestamp_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getParentComptroller",
    outputs: [
      {
        internalType: "address",
        name: "parentComptroller_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getParentVault",
    outputs: [
      {
        internalType: "address",
        name: "parentVault_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRelayHubDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "depositBalance_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        internalType: "address",
        name: "_vault",
        type: "address",
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
        name: "_context",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "_success",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pctRelayFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseRelayFee",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "relayWorker",
            type: "address",
          },
          {
            internalType: "address",
            name: "paymaster",
            type: "address",
          },
          {
            internalType: "address",
            name: "forwarder",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "paymasterData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "clientId",
            type: "uint256",
          },
        ],
        internalType: "struct IGsnTypes.RelayData",
        name: "_relayData",
        type: "tuple",
      },
    ],
    name: "postRelayedCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "gas",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
              {
                internalType: "uint256",
                name: "validUntil",
                type: "uint256",
              },
            ],
            internalType: "struct IGsnForwarder.ForwardRequest",
            name: "request",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "gasPrice",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "pctRelayFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "baseRelayFee",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "relayWorker",
                type: "address",
              },
              {
                internalType: "address",
                name: "paymaster",
                type: "address",
              },
              {
                internalType: "address",
                name: "forwarder",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "paymasterData",
                type: "bytes",
              },
              {
                internalType: "uint256",
                name: "clientId",
                type: "uint256",
              },
            ],
            internalType: "struct IGsnTypes.RelayData",
            name: "relayData",
            type: "tuple",
          },
        ],
        internalType: "struct IGsnTypes.RelayRequest",
        name: "_relayRequest",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "preRelayedCall",
    outputs: [
      {
        internalType: "bytes",
        name: "context_",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "rejectOnRecipientRevert_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedForwarder",
    outputs: [
      {
        internalType: "address",
        name: "trustedForwarder_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "versionPaymaster",
    outputs: [
      {
        internalType: "string",
        name: "versionString_",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
