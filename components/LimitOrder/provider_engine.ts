import {
  GanacheSubprovider,
  MnemonicWalletSubprovider,
  RpcSubprovider, // 使用 RpcSubprovider 替代 RPCSubprovider
  Web3ProviderEngine,
} from '@0x/subproviders'
import { providerUtils } from '@0x/utils'
import { ethers } from 'ethers'
import {
  BASE_DERIVATION_PATH,
  GANACHE_CONFIGS,
  MNEMONIC,
  NETWORK_CONFIGS,
} from './configs'

export const mnemonicWallet = new MnemonicWalletSubprovider({
  mnemonic: MNEMONIC,
  baseDerivationPath: BASE_DERIVATION_PATH,
  chainId: NETWORK_CONFIGS.chainId,
})

const determineProvider = (ethersProvider) => {
  const pe = new Web3ProviderEngine()
  pe.addProvider(mnemonicWallet)
  if (NETWORK_CONFIGS === GANACHE_CONFIGS) {
    pe.addProvider(
      new GanacheSubprovider({
        vmErrorsOnRPCResponse: false,
        network_id: GANACHE_CONFIGS.networkId,
        _chainId: GANACHE_CONFIGS.chainId,
        mnemonic: MNEMONIC,
      })
    )
  } else {
    // 使用 RpcSubprovider 替代 RPCSubprovider
    pe.addProvider(new RpcSubprovider({ rpcUrl: NETWORK_CONFIGS.rpcUrl }))
  }
  providerUtils.startProviderEngine(pe)

  // Set ethers.js provider as the fallback provider for the Web3ProviderEngine
  pe.providers[pe.providers.length - 1].provider = ethersProvider

  return pe
}

// Create your ethers.js provider instance
const ethersProvider = new ethers.providers.Web3Provider(window.ethereum) // 使用 ethers.providers.Web3Provider

// Pass the ethers.js provider to the determineProvider function
export const providerEngine = determineProvider(ethersProvider)
