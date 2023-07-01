import React, { useEffect, useState } from 'react'
import SwapPage from '~/components/SwapPage'
import PriceView from './Price'
import QuoteView from './Quote'
import type { PriceResponse } from './api/types'
import { useAccount } from 'wagmi'
const Swap = () => {
  const [tradeDirection, setTradeDirection] = useState('sell')
  const [finalize, setFinalize] = useState(false)
  const [price, setPrice] = useState<PriceResponse | undefined>()
  const [quote, setQuote] = useState()
  const { address } = useAccount()
  console.log(address)
  const [show, setShow] = useState(false)
  useEffect(function () {
    setShow(true)
  }, [])
  return (
    <>
      {show && (
        <div
          className={`flex min-h-screen flex-col items-center justify-between p-24`}
        >
          {finalize && price ? (
            <QuoteView
              takerAddress={address}
              price={price}
              quote={quote}
              setQuote={setQuote}
            />
          ) : (
            <PriceView
              takerAddress={address}
              price={price}
              setPrice={setPrice}
              setFinalize={setFinalize}
            />
          )}
        </div>
      )}
    </>
  )
}
export default Swap
