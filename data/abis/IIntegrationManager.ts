export const IIntegrationManager = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundDeployer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_policyManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_valueInterpreter",
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
        name: "comptrollerProxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "integrationData",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "incomingAssets",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "incomingAssetAmounts",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "spendAssets",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "spendAssetAmounts",
        type: "uint256[]",
      },
    ],
    name: "CallOnIntegrationExecutedForFund",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "comptrollerProxy",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "vaultProxy",
        type: "address",
      },
    ],
    name: "ValidatedVaultProxySetForFund",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "activateForFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deactivateForFund",
    outputs: [],
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
    inputs: [],
    name: "getPolicyManager",
    outputs: [
      {
        internalType: "address",
        name: "policyManager_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValueInterpreter",
    outputs: [
      {
        internalType: "address",
        name: "valueInterpreter_",
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
    ],
    name: "getVaultProxyForFund",
    outputs: [
      {
        internalType: "address",
        name: "vaultProxy_",
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
        name: "_caller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_actionId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_callArgs",
        type: "bytes",
      },
    ],
    name: "receiveCallFromComptroller",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "setConfigForFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
