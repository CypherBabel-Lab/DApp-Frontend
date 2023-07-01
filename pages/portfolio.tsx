import React, { useEffect, useState } from 'react'
import { Card, Skeleton, Avatar, Button, Tabs, Input } from 'antd'
import Image from 'next/image'
import RiseFallLabel from '~/components/Label/RiseFallLabel'
import type { TabsProps } from 'antd'
import CurrentPositions from '~/components/protfolioTabs/CurrentPositions'
import TradeHistory from '~/components/protfolioTabs/TradeHistory'
import StatisticalData from '~/components/protfolioTabs/StatisticalData'
import DepositsAndWithdrawals from '~/components/protfolioTabs/DepositsAndWithdrawals'
import GuardianLogic from '../data/GuardianLogic.json'
import { ethers } from 'ethers'
import { vault_detailsApi } from '../data/api/AllApi'
import { useRouter } from 'next/router'
// import Input from 'antd/es/input/Input'
interface CarInfo {
  guardianAddress: string
  name: string
  age: number
  address: string
  tags: string[]
  owner: string
}
const { Meta } = Card
let provider

const mtAbi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  { payable: true, stateMutability: 'payable', type: 'fallback' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: true, name: 'guy', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: true, name: 'dst', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'dst', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' },
    ],
    name: 'Withdrawal',
    type: 'event',
  },
]
const PortfolioList = () => {
  const [signer, setSigner] = useState(undefined)
  const [daiContract, setDaiContract] = useState(null)
  const [carInfo, setCarInfo] = useState<CarInfo>({})
  const [userAddress, setUserAddress] = useState('')
  const [assetsList, setAssetsList] = useState([])
  const [TradeHistoryList, setTradeHistoryList] = useState([])
  const [followersList, setFollowersList] = useState([])
  const router = useRouter()
  const onChange = (key: string) => {
    console.log(key)
  }
  async function getSigner(address: string) {
    if (window.ethereum) {
      await window.ethereum.enable()
      provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      // console.log(provider._getAddress())
      // console.log(ethers.utils.getAddress(address))

      setSigner(signer)
      const contract = new ethers.Contract(address, GuardianLogic.abi, provider)
      console.log(contract)
      setDaiContract(contract)
    }
  }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    vault_detailsApi(router.asPath.split('=')[1]).then((d) => {
      setAssetsList(d.data.assets)
      setTradeHistoryList(d.data.activities)
      setCarInfo(d.data)
      getSigner(d.data.guardianAddress)
      setFollowersList(d.data.followers)
    })
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Current Positions`,
      children: <CurrentPositions assetsList={assetsList} />,
    },
    {
      key: '2',
      label: `Trade History`,
      children: <TradeHistory TradeHistoryList={TradeHistoryList} />,
    },
    {
      key: '3',
      label: `Statistical Data`,
      children: <StatisticalData followersList={followersList} />,
    },
    // {
    //   key: '4',
    //   label: `Deposits and Withdrawals`,
    //   children: <DepositsAndWithdrawals />,
    // },
  ]
  const DepositEvt = async () => {
    const wmaticContract = new ethers.Contract(
      '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', //mtAddress
      mtAbi, //mtABi
      signer
    )
    const allowanceAmount = await wmaticContract.allowance(
      localStorage.getItem('address'), // 授权者的地址
      carInfo.guardianAddress // 合约地址或被授权者的地址
    )
    // if
    console.log(allowanceAmount.toString())

    // if (allowanceAmount.toString() === '0') {
    const amountToApprove = ethers.constants.MaxUint256
    const approveTx = await wmaticContract.approve(
      carInfo.guardianAddress, //
      amountToApprove
    )
    await approveTx.wait()
    // }
    const investmentAmount = 0.00000001 * 10 ** 18
    const minSharesQuantity = 1
    try {
      if (signer && daiContract) {
        // empower wmt
        const transaction = await daiContract
          .connect(signer)
          .buyShares(investmentAmount, minSharesQuantity, {
            gasLimit: 21000000,
          })
        const receipt = await transaction.wait()
        console.log(receipt)
      }
    } catch (error) {
      console.log('交互错误:', error)
    }
  }
  const followEvt = async (address: string) => {
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
              title={carInfo.name}
              description={carInfo.owner}
            />
            <div className="float-right flex">
              <Input />
              <Button style={{ float: 'right' }} onClick={() => DepositEvt()}>
                Deposit
              </Button>
            </div>
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
            <Button
              onClick={() => followEvt(carInfo.guardianAddress)}
              className="bn-button bn-button__primary data-size-middle button-primary float-right mb-[10px] h-[40px] w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-white hover:opacity-75 md:mb-0 md:w-[180px] lg:w-[200px]"
            >
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
