import { Button, Select, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { LimitOrder, SignatureType } from '@0x/protocol-utils'
import { ethers } from 'ethers'
import { BigNumber } from '@0x/utils'
import { getContractAddressesForChainOrThrow } from '@0x/contract-addresses'
import { Web3Wrapper } from '@0x/web3-wrapper'
import { providerEngine } from '../components/LimitOrder/provider_engine'
import GuardianLogic from '../data/GuardianLogic.json'
function formatSelector(str: string) {
  const bytes4 = ethers.utils.id(str)
  return bytes4
}

async function init() {
  let response = await fetch('https://tokens.coingecko.com/uniswap/all.json')
  let tokenListJSON = await response.json()
  let nowarr = tokenListJSON.tokens.slice(0, 100)
  const newArray = nowarr.map((obj: any) => {
    return {
      label: (
        <div className="flex text-white">
          <img src={obj.logoURI} /> {obj.name}
        </div>
      ),
      value: obj.address,
    }
  })
  return newArray
}
async function getSellSwapPrice(sell: string, buy: string, sellAmount: number) {
  console.log(sellAmount)
  const params = {
    sellToken: sell,
    buyToken: buy,
    sellAmount: sellAmount * 10 ** 18,
  }
  const headers = { '0x-api-key': '[2553fb72-59f8-423d-b067-a0e07e6ccbf3]' }
  try {
    let response = await fetch(
      `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`,
      { headers }
    )
    // let price = await fetch(
    //   `https://api.0x.org/swap/v1/price?sellToken=${sell}&buyToken=${buy}&sellAmount=${sellAmount}`
    // )
    console.log(response.json())
    // 处理接口返回的数据
  } catch (error) {
    console.error(error)
    // 处理接口请求错误
  }
}
let provider: any
const SwapPage = () => {
  const [selectTokenList, setSelectTokenList] = useState([])
  const [sell, setSell] = useState('')
  const [buy, setBuy] = useState('')
  const [sellAddress, setSellAddress] = useState('')
  const [buyAddress, setBuyAddress] = useState('')
  const [sellAmount, setSellAmount] = useState(0)
  const [signer, setSigner] = useState('')
  const [daiContract, setDaiContract] = useState('')

  async function getSigner() {
    if (window.ethereum) {
      await window.ethereum.enable()
      provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      setSigner(signer)
      const contract = new ethers.Contract(
        '0xfdfa52c120095993bce91cac1da2443765c0c239',
        GuardianLogic.abi,
        provider
      )
      console.log(contract)

      setDaiContract(contract)
    }
  }
  async function sign() {
    const CHAIN_ID = 80001
    const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
    const addresses = getContractAddressesForChainOrThrow(CHAIN_ID)
    const getFutureExpiryInSeconds = () => Math.floor(Date.now() / 1000 + 300) // 5 min expiry

    const web3Wrapper = new Web3Wrapper(providerEngine)
    // Unlock metamask
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    // Use first selected Metamask account
    const [maker, taker] = await web3Wrapper.getAvailableAddressesAsync()
    // const maker = accounts[0]
    console.log(maker)
    const data: LimitOrder = new LimitOrder({
      makerToken: addresses.etherToken,
      takerToken: addresses.zrxToken,
      makerAmount: '1000000000000000000', // 1 ETH
      takerAmount: '2000000000000000000', // 1 ZRX
      maker: maker,
      sender: NULL_ADDRESS,
      expiry: getFutureExpiryInSeconds().toString(),
      salt: Date.now().toString().toString(),
      chainId: CHAIN_ID,
      verifyingContract: addresses.exchangeProxy,
    })
    const bytes4Signature = formatSelector('takeOrder(address,bytes,bytes)')
    console.log(bytes4Signature)

    const signature = await data.getSignatureWithProviderAsync(
      web3Wrapper.getProvider(),
      SignatureType.EthSign,
      maker
    )
    // console.log(ethers.utils.parseUnits('1').toNumber())

    const limitOrder = {
      makerToken: addresses.etherToken,
      takerToken: addresses.zrxToken,
      makerAmount: ethers.utils.parseUnits('1'), // 1 ETH
      takerAmount: ethers.utils.parseUnits('1'), // 1 ZRX
      maker: maker,
      taker: NULL_ADDRESS,
      txOrigin: NULL_ADDRESS,
      // pool: ethers.utis.
      pool: ethers.utils.formatBytes32String(''),
      expiry: getFutureExpiryInSeconds(),
      salt: Date.now(),
    }
    console.log(signature)

    const encodedData = ethers.utils.defaultAbiCoder.encode(
      [
        'tuple(address makerToken,address takerToken,uint128 makerAmount ,uint128 takerAmount,address maker,address taker, address txOrigin,bytes32 pool, uint64 expiry ,uint256 salt) d',
        'tuple(uint8 signatureType,uint8 v,bytes32 r, bytes32 s) d',
      ],
      [
        {
          makerToken: limitOrder.makerToken,
          takerToken: limitOrder.takerToken,
          makerAmount: limitOrder.makerAmount,
          takerAmount: limitOrder.takerAmount,
          maker: limitOrder.maker,
          taker: limitOrder.taker,
          txOrigin: limitOrder.txOrigin,
          pool: limitOrder.pool,
          expiry: limitOrder.expiry,
          salt: limitOrder.salt,
        },
        {
          signatureType: signature.signatureType,
          v: signature.v,
          r: signature.r,
          s: signature.s,
        },
      ]
    )
    console.log(encodedData)

    // const limitOrder = {
    //   makerToken: addresses.etherToken,
    //   takerToken: addresses.zrxToken,
    //   makerAmount: '1000000000000000000', // 1 ETH
    //   takerAmount: '2000000000000000000', // 1 ZRX
    //   maker: maker,
    //   sender: NULL_ADDRESS,
    //   expiry: getFutureExpiryInSeconds().toString(),
    //   salt: Date.now().toString(),
    //   chainId: CHAIN_ID,
    //   verifyingContract: addresses.exchangeProxy,
    // }
    // console.log(signature)

    // const encodedData = ethers.utils.defaultAbiCoder.encode(
    //   [
    //     'tuple(address makerToken,address takerToken,uint128 makerAmount ,unit128 takerAmount,address maker,address sender,string expiry ,string salt ,address verifyingContract) d',
    //     'tuple(string r,string s, uint256 signatureType,uint256 v) d',
    //   ],
    //   [
    //     {
    //       makerToken: limitOrder.makerToken,
    //       takerToken: limitOrder.takerToken,
    //       makerAmount: limitOrder.makerAmount,
    //       takerAmount: limitOrder.takerAmount,
    //       maker: limitOrder.maker,
    //       sender: limitOrder.sender,
    //       expiry: limitOrder.expiry,
    //       salt: limitOrder.salt,
    //       // chainId: limitOrder.chainId,
    //       verifyingContract: limitOrder.verifyingContract,
    //     },
    //     {
    //       r: signature.r,
    //       s: signature.s,
    //       signatureType: signature.signatureType,
    //       v: signature.v,
    //     },
    //   ]
    // )

    let integrationDataencode = ethers.utils.defaultAbiCoder.encode(
      ['string', 'uint256', 'uint256'],
      [encodedData, 0, 1]
    )
    let calldata = ethers.utils.defaultAbiCoder.encode(
      ['address', 'bytes', 'bytes'],
      [
        '0xae9af6f44848f25ed88facd3de67b647c114af18',
        bytes4Signature,
        integrationDataencode,
      ]
    )

    try {
      if (signer && daiContract) {
        const transaction = await daiContract
          .connect(signer)
          .callOnExtension(
            '0xEfe7e3aa4ea617f7553b1D17B2112984A576602b',
            0,
            calldata,
            {
              gasLimit: 21000000,
            }
          )
        const receipt = await transaction.wait()
      }
    } catch (error) {
      console.log('交互错误:', error)
    }
  }
  useEffect(() => {
    const fetchTokenList = async () => {
      const tokenList = await init()
      setSelectTokenList(tokenList)
    }
    fetchTokenList()
    getSigner()
  }, [])
  const sellChangeEvt = (value: string) => {
    setSell(value)
  }
  const buyChangeEvt = (value: string) => {
    setBuy(value)
  }
  useEffect(() => {
    if (sell && buy && sellAmount) {
      getSellSwapPrice(sell, buy, sellAmount)
    }
  }, [sell, buy, sellAmount])
  return (
    <>
      <div className="w-full text-white">
        <div>
          Select Token:
          <Select onChange={sellChangeEvt} options={selectTokenList} />
          <InputNumber onChange={setSellAmount} />
        </div>
        <div>
          Select Token:
          <Select onChange={buyChangeEvt} options={selectTokenList} />
          <InputNumber />
        </div>
        <Button onClick={() => sign()}>Sign</Button>
      </div>
    </>
  )
}

export default SwapPage
