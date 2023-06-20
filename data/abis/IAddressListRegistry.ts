export const IAddressListRegistry = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_dispatcher",
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
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "item",
        type: "address",
      },
    ],
    name: "ItemAddedToList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "item",
        type: "address",
      },
    ],
    name: "ItemRemovedFromList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "ListAttested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum AddressListRegistry.UpdateType",
        name: "updateType",
        type: "uint8",
      },
    ],
    name: "ListCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nextOwner",
        type: "address",
      },
    ],
    name: "ListOwnerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum AddressListRegistry.UpdateType",
        name: "prevUpdateType",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "enum AddressListRegistry.UpdateType",
        name: "nextUpdateType",
        type: "uint8",
      },
    ],
    name: "ListUpdateTypeSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_items",
        type: "address[]",
      },
    ],
    name: "addToList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "_items",
        type: "address[]",
      },
    ],
    name: "areAllInAllLists",
    outputs: [
      {
        internalType: "bool",
        name: "areAllInAllLists_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_items",
        type: "address[]",
      },
    ],
    name: "areAllInList",
    outputs: [
      {
        internalType: "bool",
        name: "areAllInList_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "_items",
        type: "address[]",
      },
    ],
    name: "areAllInSomeOfLists",
    outputs: [
      {
        internalType: "bool",
        name: "areAllInSomeOfLists_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "_items",
        type: "address[]",
      },
    ],
    name: "areAllNotInAnyOfLists",
    outputs: [
      {
        internalType: "bool",
        name: "areAllNotInAnyOfLists_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_items",
        type: "address[]",
      },
    ],
    name: "areAllNotInList",
    outputs: [
      {
        internalType: "bool",
        name: "areAllNotInList_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "_descriptions",
        type: "string[]",
      },
    ],
    name: "attestLists",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "enum AddressListRegistry.UpdateType",
        name: "_updateType",
        type: "uint8",
      },
      {
        internalType: "address[]",
        name: "_initialItems",
        type: "address[]",
      },
    ],
    name: "createList",
    outputs: [
      {
        internalType: "uint256",
        name: "id_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "getListCount",
    outputs: [
      {
        internalType: "uint256",
        name: "count_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getListOwner",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getListUpdateType",
    outputs: [
      {
        internalType: "enum AddressListRegistry.UpdateType",
        name: "updateType_",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "_item",
        type: "address",
      },
    ],
    name: "isInAllLists",
    outputs: [
      {
        internalType: "bool",
        name: "isInAllLists_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_item",
        type: "address",
      },
    ],
    name: "isInList",
    outputs: [
      {
        internalType: "bool",
        name: "isInList_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "_item",
        type: "address",
      },
    ],
    name: "isInSomeOfLists",
    outputs: [
      {
        internalType: "bool",
        name: "isInSomeOfLists_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_items",
        type: "address[]",
      },
    ],
    name: "removeFromList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_nextOwner",
        type: "address",
      },
    ],
    name: "setListOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "enum AddressListRegistry.UpdateType",
        name: "_nextUpdateType",
        type: "uint8",
      },
    ],
    name: "setListUpdateType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
