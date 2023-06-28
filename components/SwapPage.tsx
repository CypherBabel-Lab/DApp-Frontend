import { Button, Select, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { LimitOrder, SignatureType } from '@0x/protocol-utils'
import { ethers } from 'ethers'
import { BigNumber } from '@0x/utils'
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
  console.log(newArray)
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
const SwapPage = () => {
  const [selectTokenList, setSelectTokenList] = useState([])
  const [sell, setSell] = useState('')
  const [buy, setBuy] = useState('')
  const [sellAddress, setSellAddress] = useState('')
  const [buyAddress, setBuyAddress] = useState('')
  const [sellAmount, setSellAmount] = useState(0)

  async function sign() {
    const contractAddresses = require('@0x/contract-addresses')
    const { MetamaskSubprovider } = require('@0x/subproviders')

    const CHAIN_ID = 1
    const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
    const addresses =
      contractAddresses.getContractAddressesForChainOrThrow(CHAIN_ID)

    const getFutureExpiryInSeconds = () =>
      Math.floor(Date.now() / 1000 + 300).toString() // 5 min expiry

    // Unlock metamask
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    // Use first selected Metamask account
    const maker = accounts[0]

    // Sign order
    const order = new LimitOrder({
      makerToken: addresses.etherToken,
      takerToken: addresses.zrxToken,
      makerAmount: new BigNumber('1'), // NOTE: This is 1 WEI, 1 ETH would be 1000000000000000000
      takerAmount: new BigNumber('1000000000000000'), // NOTE this is 0.001 ZRX. 1 ZRX would be 1000000000000000000
      maker: maker,
      sender: NULL_ADDRESS,
      expiry: new BigNumber(getFutureExpiryInSeconds()),
      salt: new BigNumber(Date.now().toString()),
      chainId: CHAIN_ID,
      verifyingContract: addresses.exchangeProxy,
    })
    console.log(order)

    const supportedProvider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(supportedProvider)

    const signature = await order.getSignatureWithProviderAsync(
      supportedProvider,
      SignatureType.EIP712 // Optional
    )
    console.log(signature)

    console.log(`Signature: ${JSON.stringify(signature, undefined, 2)}`)

    const signedOrder = { ...order, signature }
    const resp = await fetch('https://ropsten.api.0x.org/sra/v4/order', {
      method: 'POST',
      body: JSON.stringify(signedOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(resp)

    if (resp.status === 200) {
      alert('Successfully posted order to SRA')
    } else {
      const body = await resp.json()
      alert(
        `ERROR(status code ${resp.status}): ${JSON.stringify(
          body,
          undefined,
          2
        )}`
      )
    }
  }
  useEffect(() => {
    const fetchTokenList = async () => {
      const tokenList = await init()
      setSelectTokenList(tokenList)
    }
    fetchTokenList()
  }, [])
  const sellChangeEvt = (value: string) => {
    setSell(value)
  }
  const buyChangeEvt = (value: string) => {
    console.log(value)

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
