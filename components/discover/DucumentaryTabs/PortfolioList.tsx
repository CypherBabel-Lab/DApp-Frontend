import { Button, Card } from 'antd'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import RiseFallLabel from '~/components/Label/RiseFallLabel'
import InitMoney from '~/components/Label/IintMoney'
import { useRouter } from 'next/router'
import { vault_listApi } from '../../../data/api/AllApi'
import { ethers } from 'ethers'
import GuardianLogic from '../../../data/GuardianLogic.json'
const { Meta } = Card
function splitString(inputString: string): string {
  if (inputString.length <= 8) {
    return inputString
  }

  const firstFourChars: string = inputString.substring(0, 4)
  const lastFourChars: string = inputString.substring(inputString.length - 4)

  return `${firstFourChars}...${lastFourChars}`
}
let provider
let signer: any
let daiContract: any
const PortfolioList = (props: any) => {
  // const [signer, setSigner] = useState(undefined)
  // const [daiContract, setDaiContract] = useState(null)
  async function getSigner() {
    if (window.ethereum) {
      await window.ethereum.enable()
      provider = new ethers.providers.Web3Provider(window.ethereum)
      signer = provider.getSigner()
      // setSigner(signer)

      const contract = new ethers.Contract(
        '0xCf3C934AC369f72ac5F5e17E8da7206ad4705996',
        GuardianLogic.abi,
        provider
      )
      daiContract = contract
      // setDaiContract(contract)
    }
  }
  const router = useRouter()
  const { selectTabsKey } = props
  const [carLoading, setCarLoading] = useState<boolean>(true)
  const [carInfo, setCarInfo] = useState<any[]>([])
  function getTimeDifference(targetTime: any) {
    // 获取当前时间
    const currentTime = new Date()

    // 获取给定时间
    const givenTime = new Date(targetTime)

    // 计算时间差（以毫秒为单位）
    const timeDifference = Number(currentTime) - Number(givenTime)

    // 将时间差转换为秒、分钟、小时、天等单位
    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    // 构建时间差字符串
    const timeDiffString = `${days}天 ${hours % 24}小时 ${minutes % 60}分钟 ${
      seconds % 60
    }秒`

    return timeDiffString
  }
  useEffect(() => {
    if (selectTabsKey === '2') {
      setTimeout(() => {
        setCarLoading(false)
      }, 1500)
    } else {
      setCarLoading(true)
    }
  }, [selectTabsKey])
  useEffect(() => {
    // getSigner()
    vault_listApi().then((d) => {
      console.log(d)
      let temp = []
      for (let i = 0; i < d.data.list.length; i++) {
        let tempt: {
          name: string
          address: string
          detailAddress: string
          runtime: string // 或者使用适当的日期/时间类型
          roi: number
          pnl: number
          nav: string // 或者使用适当的数字类型
          peopleNum: number
          copyAddress: string
          detaiAddress: string
        } = {
          name: '',
          address: '',
          detailAddress: '',
          runtime: '',
          roi: 0,
          pnl: 0,
          nav: '',
          peopleNum: 0,
          copyAddress: '',
          detaiAddress: ''
        }
        tempt.name = d.data.list[i].name
        tempt.address = d.data.list[i].owner
        tempt.detaiAddress = d.data.list[i].address
        tempt.runtime = getTimeDifference(d.data.list[i].CreatedAt)
        tempt.roi = 10
        tempt.pnl = 10
        tempt.nav = '10'
        tempt.peopleNum = d.data.list[i].followers.length
        tempt.copyAddress = d.data.list[i].guardianAddress
        temp.push(tempt)
      }
      setCarInfo(temp)
    })
  }, [])
  const follow = async (address: string) => {
    let signer
    let contract
    if (window.ethereum) {
      await window.ethereum.enable()
      provider = new ethers.providers.Web3Provider(window.ethereum)
      signer = provider.getSigner()
      contract = new ethers.Contract(address, GuardianLogic.abi, provider)
    }
    try {
      if (signer && contract) {
        const transaction = await contract.connect(signer).Follow({
          gasLimit: 21000000,
        })
        const receipt = await transaction.wait()
      }
    } catch (error) {
      console.log('交互错误:', error)
    }
  }
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
            >
              <div
                onClick={() => {
                  router.push({
                    pathname: '/portfolio',
                    query: {
                      address: it.detaiAddress,
                    },
                  })
                  // router.push(')
                }}
              >
                <div className="flex">
                  <div> {it.headsculpture}</div>
                  <div className="ml-3  flex flex-col">
                    <span className="text-xl font-bold text-zinc-100">
                      {it.name}
                    </span>
                    <span className="font-semibold text-zinc-400">
                      {splitString(it.address)}
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
                      <div className="font-semibold">{it.runtime}</div>
                      <div className="text-xs font-semibold text-neutral-400">
                        Runtime
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Meta
                description={
                  <Button
                    style={{ lineHeight: '16px', float: 'right' }}
                    className="rounded-md bg-gradient-to-r from-gray-800 to-black px-4 py-2 text-white hover:opacity-90"
                    onClick={() => follow(it.copyAddress)}
                  >
                    <span className="font-bold">Copy</span>
                  </Button>
                }
              />
            </Card>
          )
        })}
      </div>
    </>
  )
}
export default PortfolioList
