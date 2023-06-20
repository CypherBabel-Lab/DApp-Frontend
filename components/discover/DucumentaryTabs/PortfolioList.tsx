import { Button, Card } from 'antd'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import RiseFallLabel from '~/components/Label/RiseFallLabel'
import InitMoney from '~/components/Label/IintMoney'
import { useRouter } from 'next/router'
const carInfo = [
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
  {
    headsculpture: (
      <Image
        src="/images/123.jpg"
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
        alt="touxiang"
      />
    ),
    name: 'Audi',
    address: '0x26...AAfA',
    peopleNum: '10',
    roi: 10,
    pnl: 10,
    nav: '10',
    runtime: '10day',
  },
]
const { Meta } = Card
const PortfolioList = (props: any) => {
  const router = useRouter()
  const { selectTabsKey } = props
  const [carLoading, setCarLoading] = useState<boolean>(true)
  useEffect(() => {
    if (selectTabsKey === '2') {
      setTimeout(() => {
        setCarLoading(false)
      }, 1500)
    } else {
      setCarLoading(true)
    }
  }, [selectTabsKey])
  return (
    <>
      <div className="flex flex-wrap">
        {carInfo.map((it) => {
          return (
            <Card
              style={{
                width: 234,
                height: 274,
                marginTop: 36,
                marginLeft: 16,
                cursor: 'pointer',
                // backgroundColor: 'rbg(0,0,0,0.5)',
              }}
              hoverable={true}
              className="border bg-zinc-800 hover:border-emerald-400"
              loading={carLoading}
              key={it.name}
              // actions={[
              //   <Button
              //     style={{ lineHeight: '16px' }}
              //     className="rounded-md bg-gradient-to-r from-gray-800 to-black px-4 py-2 text-white hover:opacity-90"
              //   >
              //     <span className="font-bold">Copy</span>
              //   </Button>,
              // ]}
            >
              <div
                onClick={() => {
                  router.push('/portfolio')
                }}
              >
                <div className="flex">
                  <div> {it.headsculpture}</div>
                  <div className="ml-3  flex flex-col">
                    <span className="text-xl font-bold text-zinc-100">
                      {it.name}
                    </span>
                    <span className="font-semibold text-zinc-400">
                      {it.address}
                    </span>
                    <div className="flex">
                      <Image
                        src="/images/people.png"
                        width={20}
                        height={20}
                        alt="img"
                      />
                      <span className="font-semibold">{it.peopleNum}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-around">
                    <div>
                      <div className="text-2xl font-semibold">
                        <RiseFallLabel num={it.roi} after={'%'} />
                      </div>
                      <div className="text-xs font-semibold text-neutral-400">
                        30D ROI
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">
                        <RiseFallLabel num={it.pnl} />
                      </div>
                      <div className="text-xs font-semibold text-neutral-400">
                        30D PNL
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-around">
                    <div>
                      <span className="text-2xl font-semibold">
                        <InitMoney num={it.nav} />
                      </span>
                      <div className="text-xs font-semibold text-neutral-400">
                        Nav
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold">{it.runtime}</div>
                      <div className="text-xs font-semibold text-neutral-400">
                        Runtime
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Meta
                description={
                  <Button
                    style={{ lineHeight: '16px' }}
                    className="rounded-md bg-gradient-to-r from-gray-800 to-black px-4 py-2 text-white hover:opacity-90"
                  >
                    <span className="font-bold">Copy</span>
                  </Button>
                }
              /> */}
            </Card>
          )
        })}
      </div>
    </>
  )
}
export default PortfolioList
