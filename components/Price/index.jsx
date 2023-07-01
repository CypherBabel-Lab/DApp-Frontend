import qs from 'qs'
import useSWR from 'swr'
import { ConnectKitButton } from 'connectkit'
import { useState, ChangeEvent, useEffect } from 'react'
import { ethers } from 'ethers'
import {
  erc20ABI,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  // type Address,
} from 'wagmi'
import {
  POLYGON_TOKENS,
  POLYGON_TOKENS_BY_SYMBOL,
  MAX_ALLOWANCE,
  exchangeProxy,
} from '../../lib/constants'

// interface PriceRequestParams {
//   sellToken: string
//   buyToken: string
//   buyAmount?: string
//   sellAmount?: string
//   takerAddress?: string
// }

export const fetcher = ([endpoint, params]) => {
  const { sellAmount, buyAmount } = params
  if (!sellAmount && !buyAmount) return
  const query = qs.stringify(params)

  return fetch(`${endpoint}?${query}`).then((res) => res.json())
}

export default function PriceView({ setPrice, setFinalize, takerAddress }) {
  // fetch price here
  const [sellAmount, setSellAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [tradeDirection, setTradeDirection] = useState('sell')
  const [sellToken, setSellToken] = useState('wmatic')
  const [buyToken, setBuyToken] = useState('dai')

  const handleSellTokenChange = (e) => {
    setSellToken(e.target.value)
  }

  function handleBuyTokenChange(e) {
    setBuyToken(e.target.value)
  }

  const sellTokenDecimals = POLYGON_TOKENS_BY_SYMBOL[sellToken].decimals

  const parsedSellAmount =
    sellAmount && tradeDirection === 'sell'
      ? ethers.utils.parseUnits(sellAmount, sellTokenDecimals).toString()
      : undefined

  const buyTokenDecimals = POLYGON_TOKENS_BY_SYMBOL[buyToken].decimals

  const parsedBuyAmount =
    buyAmount && tradeDirection === 'buy'
      ? ethers.utils.parseUnits(buyAmount, buyTokenDecimals).toString()
      : undefined

  const { isLoading: isLoadingPrice } = useSWR(
    [
      '/api/price',
      {
        sellToken: POLYGON_TOKENS_BY_SYMBOL[sellToken].address,
        buyToken: POLYGON_TOKENS_BY_SYMBOL[buyToken].address,
        sellAmount: parsedSellAmount,
        buyAmount: parsedBuyAmount,
        takerAddress,
      },
    ],
    fetcher,
    {
      onSuccess: (data) => {
        setPrice(data)
        if (tradeDirection === 'sell') {
          setBuyAmount(
            ethers.utils.formatUnits(data.buyAmount, buyTokenDecimals)
          )
        } else {
          setSellAmount(
            ethers.utils.formatUnits(data.sellAmount, sellTokenDecimals)
          )
        }
      },
    }
  )

  return (
    <form>
      {/* <h1 className="mb-4 text-3xl font-bold">0x Swap API Demo</h1> */}
      <p className="text-md mb-2">
        Check out the <a href="https://0x.org/docs/">0x Docs</a> and{' '}
        <a href="https://0x.org/docs/">Code</a> to build your own
      </p>
      <p className="text-md mb-2 font-bold">Polygon Network</p>

      <div className="mb-3 rounded-md bg-slate-200 p-4 dark:bg-slate-800">
        <section className="mt-4 flex items-start justify-center">
          <label htmlFor="sell-select" className="sr-only"></label>
          <img
            alt={sellToken}
            className="mr-2 h-9 w-9 rounded-md"
            src={POLYGON_TOKENS_BY_SYMBOL[sellToken].logoURI}
          />
          <div className="h-14 sm:mr-2 sm:w-full">
            <select
              value={sellToken}
              name="sell-token-select"
              id="sell-token-select"
              className="w-50 mr-2 h-9 rounded-md sm:w-full"
              onChange={handleSellTokenChange}
            >
              {/* <option value="">--Choose a token--</option> */}
              {POLYGON_TOKENS.map((token) => {
                return (
                  <option
                    key={token.address}
                    value={token.symbol.toLowerCase()}
                  >
                    {token.symbol}
                  </option>
                )
              })}
            </select>
          </div>
          <label htmlFor="sell-amount" className="sr-only"></label>
          <input
            id="sell-amount"
            value={sellAmount}
            className="h-9 rounded-md"
            style={{ border: '1px solid black' }}
            onChange={(e) => {
              setTradeDirection('sell')
              setSellAmount(e.target.value)
            }}
          />
        </section>
        <section className="mb-6 mt-4 flex items-start justify-center">
          <label htmlFor="buy-token" className="sr-only"></label>
          <img
            alt={buyToken}
            className="mr-2 h-9 w-9 rounded-md"
            src={POLYGON_TOKENS_BY_SYMBOL[buyToken].logoURI}
          />
          <select
            name="buy-token-select"
            id="buy-token-select"
            value={buyToken}
            className="w-50 mr-2 h-9 rounded-md sm:w-full"
            onChange={(e) => handleBuyTokenChange(e)}
          >
            {/* <option value="">--Choose a token--</option> */}
            {POLYGON_TOKENS.map((token) => {
              return (
                <option key={token.address} value={token.symbol.toLowerCase()}>
                  {token.symbol}
                </option>
              )
            })}
          </select>
          <label htmlFor="buy-amount" className="sr-only"></label>
          <input
            id="buy-amount"
            value={buyAmount}
            className="h-9 cursor-not-allowed rounded-md bg-white"
            style={{ border: '1px solid black' }}
            disabled
            onChange={(e) => {
              setTradeDirection('buy')
              setBuyAmount(e.target.value)
            }}
          />
        </section>
      </div>

      {takerAddress ? (
        <ApproveOrReviewButton
          sellTokenAddress={POLYGON_TOKENS_BY_SYMBOL[sellToken].address}
          takerAddress={takerAddress}
          onClick={() => {
            setFinalize(true)
          }}
        />
      ) : (
        // <></>
        <ConnectKitButton.Custom>
          {({
            isConnected,
            isConnecting,
            show,
            hide,
            address,
            ensName,
            chain,
          }) => {
            return (
              <button
                onClick={show}
                type="button"
                className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                {isConnected ? address : 'Connect Wallet'}
              </button>
            )
          }}
        </ConnectKitButton.Custom>
      )}

      {isLoadingPrice && (
        <div className="mt-2 text-center">Fetching the best price...</div>
      )}
    </form>
  )
}

function ApproveOrReviewButton({ takerAddress, onClick, sellTokenAddress }) {
  // 1. Read from erc20, does spender (0x Exchange Proxy) have allowance?
  const { data: allowance, refetch } = useContractRead({
    address: sellTokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [takerAddress, exchangeProxy],
  })

  // 2. (only if no allowance): write to erc20, approve 0x Exchange Proxy to spend max integer
  const { config } = usePrepareContractWrite({
    address: sellTokenAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [exchangeProxy, MAX_ALLOWANCE],
  })

  const {
    data: writeContractResult,
    writeAsync: approveAsync,
    error,
  } = useContractWrite(config)

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: writeContractResult ? writeContractResult.hash : undefined,
    onSuccess(data) {
      refetch()
    },
  })

  if (error) {
    return <div>Something went wrong: {error.message}</div>
  }

  if (allowance === BigInt(0) && approveAsync) {
    return (
      <>
        <button
          type="button"
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={async () => {
            const writtenValue = await approveAsync()
          }}
        >
          {isApproving ? 'Approving...' : 'Approve'}
        </button>
      </>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Review Trade
    </button>
  )
}
