import { ContractWrappers, ERC20TokenContract } from '@0x/contract-wrappers'
import { LimitOrder, OrderStatus, SignatureType } from '@0x/protocol-utils'
import { BigNumber, hexUtils } from '@0x/utils'
import { Web3Wrapper } from '@0x/web3-wrapper'

import { NETWORK_CONFIGS, TX_DEFAULTS } from './configs'
import {
  DECIMALS,
  NULL_ADDRESS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO,
} from './constants'
import { PrintUtils } from './print_utils'
import { providerEngine } from './provider_engine'
import {
  calculateProtocolFee,
  getRandomFutureDateInSeconds,
  runMigrationsOnceIfRequiredAsync,
} from './utils'

/**
 *在这种情况下，制造商创建并签署限价订单进行销售
 *湿的ZRX。
 *
 *接受者接受此订单，并通过0x Exchange代理合同进行填写。
 */
export async function scenarioAsync(): Promise<void> {
  await runMigrationsOnceIfRequiredAsync()
  PrintUtils.printScenario('Fill ERC20 Limit Order')
  // debugger
  //初始化ContractWrappers，这提供了有关调用的辅助函数
  //0x合约以及区块链上的ERC20/ERC721代币合约
  const contractWrappers = new ContractWrappers(providerEngine, {
    chainId: NETWORK_CONFIGS.chainId,
  })
  //初始化Web3Wrapper，这提供了有关获取的辅助功能
  //账户信息、余额、一般合同日志
  const web3Wrapper = new Web3Wrapper(providerEngine)
  const [maker, taker] = await web3Wrapper.getAvailableAddressesAsync()
  // const exchangeProxyAddress = contractWrappers.contractAddresses.exchangeProxy
  const zrxTokenAddress = '0x138c2f1123cf3f82e4596d097c118eac6684940b'
  const etherTokenAddress = '0x1dea979ae76f26071870f824088da78979eb91c8'
  const printUtils = new PrintUtils(
    web3Wrapper,
    contractWrappers,
    { maker, taker },
    { WETH: etherTokenAddress, ZRX: zrxTokenAddress }
  )
  printUtils.printAccounts()

  //制造商出售制造商资产的金额
  const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(
    new BigNumber(5),
    DECIMALS
  )
  //制造商想要的买方资产的金额
  const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(
    new BigNumber(0.1),
    DECIMALS
  )
  //允许0x Exchange代理代表制造商移动ZRX
  const zrxToken = new ERC20TokenContract(zrxTokenAddress, providerEngine)
  const makerZRXApprovalTxHash = await zrxToken
    .approve(
      contractWrappers.contractAddresses.exchangeProxy,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS
    )
    .sendTransactionAsync({ from: maker, ...TX_DEFAULTS })
  await printUtils.awaitTransactionMinedSpinnerAsync(
    'Maker ZRX Approval',
    makerZRXApprovalTxHash
  )

  //允许0x Exchange代理代表接受者移动WETH
  const etherToken = contractWrappers.weth9
  const takerWETHApprovalTxHash = await etherToken
    .approve(
      contractWrappers.contractAddresses.exchangeProxy,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS
    )
    .sendTransactionAsync({ from: taker, ...TX_DEFAULTS })
  await printUtils.awaitTransactionMinedSpinnerAsync(
    'Taker WETH Approval',
    takerWETHApprovalTxHash
  )

  //通过将ETH存入WETH合同，将ETH转换为WETH
  const takerWETHDepositTxHash = await etherToken
    .deposit()
    .sendTransactionAsync({
      from: taker,
      value: takerAssetAmount,
      ...TX_DEFAULTS,
    })
  await printUtils.awaitTransactionMinedSpinnerAsync(
    'Taker WETH Deposit',
    takerWETHDepositTxHash
  )

  PrintUtils.printData('Setup', [
    ['Maker ZRX Approval', makerZRXApprovalTxHash],
    ['Taker WETH Approval', takerWETHApprovalTxHash],
    ['Taker WETH Deposit', takerWETHDepositTxHash],
  ])

  //设置订单并填写
  const randomExpiration = getRandomFutureDateInSeconds()
  const pool = hexUtils.leftPad(1)

  //创建订单
  const limitOrder: LimitOrder = new LimitOrder({
    chainId: NETWORK_CONFIGS.chainId,
    verifyingContract: exchangeProxyAddress,
    maker,
    taker,
    makerToken: zrxTokenAddress,
    takerToken: etherTokenAddress,
    makerAmount: makerAssetAmount,
    takerAmount: takerAssetAmount,
    takerTokenFeeAmount: ZERO,
    sender: NULL_ADDRESS,
    feeRecipient: NULL_ADDRESS,
    expiry: randomExpiration,
    pool,
    salt: new BigNumber(Date.now()),
  })
  //打印订单
  printUtils.printOrder(limitOrder)

  //打印余额和津贴
  await printUtils.fetchAndPrintContractAllowancesAsync(
    contractWrappers.contractAddresses.exchangeProxy
  )
  await printUtils.fetchAndPrintContractBalancesAsync()

  //生成订单哈希并签名
  const signature = await limitOrder.getSignatureWithProviderAsync(
    web3Wrapper.getProvider(),
    SignatureType.EthSign,
    maker
  )

  const [{ orderHash, status }, remainingFillableAmount, isValidSignature] =
    await contractWrappers.exchangeProxy
      .getLimitOrderRelevantState(limitOrder, signature)
      .callAsync()
  if (
    status === OrderStatus.Fillable &&
    remainingFillableAmount.isGreaterThan(0) &&
    isValidSignature
  ) {
    //订单可以完成
  }

  //获取协议费用乘数
  //协议费=乘数*gasPrice*numOrders
  const protocolFeeMultiplier = new BigNumber(
    await contractWrappers.exchangeProxy.getProtocolFeeMultiplier().callAsync()
  )

  //通过0x Exchange代理合约填写订单
  const txHash = await contractWrappers.exchangeProxy
    .fillLimitOrder(limitOrder, signature, takerAssetAmount)
    .sendTransactionAsync({
      from: taker,
      value: calculateProtocolFee(1, protocolFeeMultiplier),
      ...TX_DEFAULTS,
    })
  const txReceipt = await printUtils.awaitTransactionMinedSpinnerAsync(
    'fillLimitOrder',
    txHash
  )
  printUtils.printTransaction('fillLimitOrder', txReceipt, [
    ['orderHash', orderHash],
  ])
  //打印余额
  await printUtils.fetchAndPrintContractBalancesAsync()
  //停止提供程序引擎
  providerEngine.stop()
}

// void (async () => {
//   try {
//     if (!module.parent) {
//       await scenarioAsync()
//     }
//   } catch (e) {
//     console.log(e)
//     providerEngine.stop()
//     process.exit(1)
//   }
// })()
