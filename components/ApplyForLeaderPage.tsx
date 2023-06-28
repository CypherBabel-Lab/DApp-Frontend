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
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const handleChange = (value: any) => {
    console.log(`selected ${value}`)
  }
  async function getSigner() {
    if (window.ethereum) {
      await window.ethereum.enable()
      provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      setSigner(signer)
      const contract = new ethers.Contract(
        '0x773f0ffB26185b3478857cE9732B8D480f0c37A7',
         
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
    const vaultName = name
    const vaultSymbol = symbol
    const denominationAsset = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
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
  }0x0261bf3a2ba3539cb8dd455957c00248e19fe3e2
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
          Name: <Input />
        </div>
        <div>
          Symbol: <Input />
        </div>
        <div>
          底层资产
          <Select
            // defaultValue={{ value: 'USDT', label: 'USDT' }}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'USDT', label: 'USDT' },
              { value: 'BTC', label: 'BTC' },
              { value: 'ETH', label: 'ETH' },
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
