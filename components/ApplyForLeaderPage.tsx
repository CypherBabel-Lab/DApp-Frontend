import React, { useState, useEffect } from 'react'
import Sidbar from './Sidbar'

import { Button, Modal, Upload, Input, Select } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import 'react-quill/dist/quill.snow.css'
import VaultFactory from '../data/VaultFactory.json'
import { ethers } from 'ethers'
let provider
declare global {
  interface Window {
    ethereum?: any
  }
}
const ApplyForLeaderPage = () => {
  const [signer, setSigner] = useState(undefined)
  const [daiContract, setDaiContract] = useState(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [describeValue, setDescribeValue] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [selectAsset, setSelectAsset] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const handleChange = (value: any) => {
    setSelectAsset(value)
  }
  async function getSigner() {
    if (window.ethereum) {
      await window.ethereum.enable()
      provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      setSigner(signer)
      const contract = new ethers.Contract(
        '0xD3F1d851Df6974b3683a84947C3D55bCb375cc19',
        VaultFactory.abi,
        provider
      )
      setDaiContract(contract)
    }
  }
  useEffect(() => {
    getSigner()
  }, [])
  async function createValut() {
    console.log(selectAsset)
    const vaultName = name
    const vaultSymbol = symbol
    const denominationAsset = selectAsset
    const sharesActionTimelock = new Date().getTime()

    try {
      if (signer && daiContract) {
        const transaction = await daiContract
          .connect(signer)
          .createNewVault(
            vaultName,
            vaultSymbol,
            denominationAsset,
            sharesActionTimelock,
            { gasLimit: 21000000 }
          )
        const receipt = await transaction.wait()
        console.log(receipt)
      }
    } catch (error) {
      console.log('交互错误:', error)
    }
  }
  return (
    <Sidbar>
      <div
        style={{
          color: 'white',
          width: '70%',
          margin: 'auto',
          height: '70%',
          padding: '20px',
        }}
        className="rounded-2xl bg-zinc-800"
      >
        <div>
          Name:{' '}
          <Input
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div>
          Symbol:{' '}
          <Input
            onChange={(e) => {
              setSymbol(e.target.value)
            }}
          />
        </div>
        <div>
          底层资产
          <Select
            // defaultValue={{ value: 'USDT', label: 'USDT' }}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
                label: 'USDC',
              },
              {
                value: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
                label: 'Link',
              },
              {
                value: '0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253',
                label: 'Dai',
              },
              {
                value: '0xE03489D4E90b22c59c5e23d45DFd59Fc0dB8a025',
                label: 'Sand',
              },
            ]}
          />
        </div>
        <div className="mt-14">
          <Button className="w-full" onClick={() => createValut()}>
            Create
          </Button>
        </div>
      </div>
    </Sidbar>
  )
}
export default ApplyForLeaderPage
