export const IGasRelayPaymasterFactory = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_dispatcher",
        type: "address",
      },
      {
        internalType: "address",
        name: "_paymasterLib",
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
        indexed: false,
        internalType: "address",
        name: "nextCanonicalLib",
        type: "address",
      },
    ],
    name: "CanonicalLibSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "constructData",
        type: "bytes",
      },
    ],
    name: "ProxyDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_constructData",
        type: "bytes",
      },
    ],
    name: "deployProxy",
    outputs: [
      {
        internalType: "address",
        name: "proxy_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCanonicalLib",
    outputs: [
      {
        internalType: "address",
        name: "canonicalLib_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDispatcher",
    outputs: [
      {
        internalType: "address",
        name: "dispatcher_",
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
        name: "_nextCanonicalLib",
        type: "address",
      },
    ],
    name: "setCanonicalLib",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
