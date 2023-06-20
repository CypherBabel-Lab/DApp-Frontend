import React, { useEffect, useState } from 'react'
import { Card, Skeleton, Avatar, Button, Tabs } from 'antd'
import Image from 'next/image'
import RiseFallLabel from '~/components/Label/RiseFallLabel'
import type { TabsProps } from 'antd'
import CurrentPositions from '~/components/protfolioTabs/CurrentPositions'
import TradeHistory from '~/components/protfolioTabs/TradeHistory'
import StatisticalData from '~/components/protfolioTabs/StatisticalData'
import DepositsAndWithdrawals from '~/components/protfolioTabs/DepositsAndWithdrawals'
const { Meta } = Card

const PortfolioList = () => {
  const onChange = (key: string) => {
    console.log(key)
  }
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Current Positions`,
      children: <CurrentPositions />,
    },
    {
      key: '2',
      label: `Trade History`,
      children: <TradeHistory />,
    },
    {
      key: '3',
      label: `Statistical Data`,
      children: <StatisticalData />,
    },
    {
      key: '4',
      label: `Deposits and Withdrawals`,
      children: <DepositsAndWithdrawals />,
    },
  ]
  return (
    <div>
      <div className="pt-6">
        <Card style={{ width: '70%', margin: 'auto', padding: '10px' }}>
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Image
                  src="/images/123.jpg"
                  width={80}
                  height={80}
                  style={{ borderRadius: '50%' }}
                  alt="touxiang"
                />
              }
              title="Audi"
              description="0x26...AAfA"
            />
            <div>跟单者，请耐心 Twitter搜索：@dingfengbo2026</div>
            <div className="mb-[12px] mt-[12px] grid grid-cols-2 items-end gap-[16px] md:mb-[24px] md:mt-[24px] md:grid-cols-3 lg:grid-cols-4">
              <div>
                <div className="text-t-sell text-[20px] font-medium">
                  <RiseFallLabel num={10} after={'%'} />
                </div>
                <div className="text-t-third flex h-[24px] w-fit items-center justify-center text-[12px] text-zinc-400">
                  7D ROI
                </div>
              </div>
              <div>
                <div className="text-t-sell text-[20px] font-medium">
                  <RiseFallLabel num={101.11} />
                </div>
                <div className="text-t-third flex h-[24px] w-fit items-center justify-center text-[12px] text-zinc-400">
                  7D PNL
                </div>
              </div>
              <div>
                <div className="text-t-sell text-[20px] font-medium">0.00</div>
                <div className="text-t-third flex h-[24px] w-fit items-center justify-center text-[12px] text-zinc-400">
                  7D Total Orders
                </div>
              </div>
              <div>
                <div className="text-t-sell text-[20px] font-medium">
                  577,954.19
                </div>
                <div className="text-t-third flex h-[24px] w-fit items-center justify-center text-[12px] text-zinc-400">
                  Portfolio Margin Balance (USDT)
                </div>
              </div>
            </div>
            <Button className="bn-button bn-button__primary data-size-middle button-primary float-right mb-[10px] h-[40px] w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-white hover:opacity-75 md:mb-0 md:w-[180px] lg:w-[200px]">
              Copy
            </Button>
          </Skeleton>
        </Card>
        <Tabs
          defaultActiveKey="1"
          style={{ width: '70%', margin: 'auto', marginTop: '20px' }}
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
export default PortfolioList
