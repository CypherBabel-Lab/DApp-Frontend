import { Button, Select, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import qs from 'qs'

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
      //   address:,
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
async function getQuote(
  sell: string,
  buy: string,
  sellAmount: number,
  account: string
) {
  console.log('Getting Quote')

  const params = {
    sellToken: sell,
    buyToken: buy,
    sellAmount: sellAmount,
    // Set takerAddress to account
    takerAddress: account,
  }

  const headers = { '0x-api-key': '[2553fb72-59f8-423d-b067-a0e07e6ccbf3]' } // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)

  // Fetch the swap quote.
  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
    { headers }
  )

  let swapQuoteJSON = await response.json()
  console.log('Quote: ', swapQuoteJSON)

  return swapQuoteJSON
}
async function trySwap(sell: string, buy: string, sellAmount: number) {
  // The address, if any, of the most recently used account that the caller is permitted to access
  let accounts = await window.ethereum.request({ method: 'eth_accounts' })
  let takerAddress = accounts[0]
  // Log the the most recently used address in our MetaMask wallet
  console.log('takerAddress: ', takerAddress)
  // Pass this as the account param into getQuote() we built out earlier. This will return a JSON object trade order.
  const swapQuoteJSON = await getQuote(sell, buy, sellAmount, takerAddress)
}
const SwapPage = () => {
  const [selectTokenList, setSelectTokenList] = useState([])
  const [sell, setSell] = useState('')
  const [buy, setBuy] = useState('')
  const [sellAddress, setSellAddress] = useState('')
  const [buyAddress, setBuyAddress] = useState('')
  const [sellAmount, setSellAmount] = useState(0)
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
      </div>
    </>
  )
}

export default SwapPage
